from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from pdf_processing import pdf_to_images, extract_text_from_pdf, process_sections
from model_pred import load_model, predict_with_yolo
from extract_details import extract_name_string, find_email_and_phone, calculate_experience, calculate_CVrate
import shutil
from datetime import datetime
import os

app = Flask(__name__)

# Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cvs'

# Initialize MySQL
mysql = MySQL(app)
model = load_model('YOLO/best.pt')

@app.route('/test', methods=['POST'])
def receive_file_path():
    try:
        file_path = request.json['file_path']
        userId = request.json['userId']
        offerId = request.json['offerId']

        # Get the current date and time to create a unique folder name
        current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
        images_folder_name = f"CV_images_{current_time}"

        experience_text = ""
        education_text = ""
        skills_text = ""
        langues_text = ""

        pdf_to_images(file_path, images_folder_name)
        full_text = extract_text_from_pdf(file_path)

        image, results = predict_with_yolo(os.path.join(images_folder_name, 'page_1.jpeg'))
        sections_data = process_sections(os.path.join(images_folder_name, 'Sections'), results, image)

        name = extract_name_string(os.path.join(images_folder_name, 'page_1.jpeg'), images_folder_name, results, model, full_text)
        email, phone = find_email_and_phone(full_text)

        for section in sections_data:
            if 'experience' in section['path'].lower():  # Case insensitive comparison
                experience_text = section['text']
            elif 'competences' in section['path'].lower():
                skills_text = section['text'].lower()
            elif 'langues' in section['path'].lower():
                langues_text = section['text']
            elif 'education' in section['path'].lower():
                education_text = section['text']

        experience_in_months = calculate_experience(experience_text)

        # Start transaction
        cur = mysql.connection.cursor()

        # Retrieve data from another table (e.g., job_description)
        cur.execute("SELECT requiredSkills, experienceRequiredInYears FROM job_description WHERE id = %s", (offerId,))
        job_data = cur.fetchone()

        if job_data:
            required_skills = job_data[0].lower()
            experience_required = job_data[1]
        else:
            return {"error": "Job not found"}, 404

        # Insert into cv_details
        cur.execute("""
            INSERT INTO cv_details (
                candidateName, email, phoneNumber, numberOfMonthsExperience,
                experienceSection, educationSection, skillsSection, languagesSection, candidateId
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, [name, email, phone, experience_in_months, experience_text, education_text, skills_text, langues_text, userId])

        # Calculate rates
        rate, experience_rate, skills_rate = calculate_CVrate(skills_text, experience_in_months, required_skills, experience_required)

        # Update file table
        cur.execute("UPDATE file SET Rate = %s, SkillsRate = %s, ExpRate = %s WHERE id = %s", (rate, skills_rate, experience_rate, userId))

        # Commit the transaction
        mysql.connection.commit()


        return jsonify({"message": "File path uploaded successfully"})


    except Exception as e:

        # Rollback in case of error

        if cur is not None:
            mysql.connection.rollback()

        return jsonify({"error": str(e)}), 500


    finally:

        # Ensure the cursor is closed

        if cur is not None:
            cur.close()

        # Ensure the folder is deleted

        if images_folder_name and os.path.exists(images_folder_name):
            shutil.rmtree(images_folder_name)

if __name__ == '__main__':
    app.run(debug=True)