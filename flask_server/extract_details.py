import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import pytesseract
import google.generativeai as genai
import re
from datetime import datetime


def extract_name_string(image_path, images_folder_name, results, model, full_text, name_string=None):

    # Process results
    annotated_results = []
    for i, box in enumerate(results['boxes']):
        xyxy = results['boxes'][i]
        x1, y1, x2, y2 = xyxy
        annotated_results.append({
            'box': (x1, y1, x2, y2),
            'confidence': float(results['conf'][i]),
            'label': model.names[int(results['cls'][i])],
        })

    # Load the image using OpenCV
    image = cv2.imread(image_path)

    # Convert the image to RGB (OpenCV loads images in BGR by default)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image_rgb)

    # Find the "name" box in annotated results
    name_box = None

    for result in annotated_results:
        if result['label'] == 'Name':
            name_box = result['box']
            # Extract coordinates
            x1, y1, x2, y2 = map(int, name_box)

            # Crop the image to the "name" box
            cropped_image = pil_image.crop((x1, y1, x2, y2))

            # Convert the cropped image back to an array for display
            cropped_image_array = np.array(cropped_image)

            # Display the cropped image
            plt.figure(figsize=(10, 6))
            plt.imshow(cropped_image_array)
            plt.axis("off")
            plt.savefig(os.path.join(images_folder_name, 'name.png'))
            plt.show()

            img = cv2.imread(os.path.join(images_folder_name, 'name.png'))
            img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            # Use Tesseract to extract text from the cropped image
            name_string = pytesseract.image_to_string(img_gray).strip()
            #print("first try")
            #print(name_string)
            # Delete the cropped image
            os.remove(os.path.join(images_folder_name, 'name.png'))
            break

    if not name_box:
        name_string = None

    # If name_string is None, use Google Generative AI to extract the name
    if name_string is None or name_string == "":
        #print("second try")

        prompt_text = "Here is a resume text, detect the name of the candidate and return the name without any additional info: "
        prompt_text += full_text

        genai.configure(api_key="AIzaSyDezNfI535Kvv0TSDvZ_6PfF8yJF4sjM5A")
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        response = model.generate_content([prompt_text])
        name_string = response.text.strip()

        #print("Extracted Name using Generative AI:", name_string)

    return name_string.strip()


def find_email_and_phone(text):
    # Define the regular expression patterns for email and phone number
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    phone_pattern = r'\+?[0-9.\-()\s]{7,}'  # This is a simple pattern; you might want to customize it

    # Search for email and phone number in the text
    email_matches = re.findall(email_pattern, text)
    phone_matches = re.findall(phone_pattern, text)

    # Assuming we want the first match for simplicity
    email = email_matches[0] if email_matches else None
    phone = phone_matches[0] if phone_matches else None

    return email.strip(), phone.strip()

def calculate_experience(experience_text):

    global calculated_experience
    current_date = datetime.now().strftime("%d/%m/%Y")
    prompt_text = f""" Here is an experience section of a CV, calculate the sum of the experiences by months and consider the current date {current_date}. At the end, Respond with the number of total months like this :
    Calculated Experience : XX Months.
    here is the experience Section :

    """
    prompt_text += experience_text

    # Configure the API key
    genai.configure(api_key="AIzaSyDezNfI535Kvv0TSDvZ_6PfF8yJF4sjM5A")

    # Create the model instance
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    # Generate content using the model
    response = model.generate_content([prompt_text])
    # print("response: ",response.text)
    # Define the regex pattern to match the number of months without any prefixes or asterisks
    pattern = r'(\d+) Months'

    # Search for the pattern in the text
    match = re.search(pattern, response.text)

    # Extract and print the experience
    if match:
        # Extract the number of months
        number_of_months = int(match.group(1))
        print("Number of months:", number_of_months)
        return number_of_months
    else:
        print("Calculated experience not found.")
        return None


def calculate_CVrate(skills, experience, requiredSkills, requiredExperience):

    # Split the required skills by commas and strip any whitespace
    required_skills_list = [skill.strip() for skill in requiredSkills.split(',')]

    # Calculate the number of matching skills
    matching_skills_count = sum(1 for skill in required_skills_list if skill in skills)

    # Calculate the required experience in months
    required_experience_months = requiredExperience * 12

    # Calculate the experience score
    if required_experience_months > 0:
        experience_score = (experience / required_experience_months) * 34  # 33% of the experience ratio
    else:
        experience_score = 34

    # Calculate the total skills score
    total_skills = len(required_skills_list)
    if total_skills > 0:
        skills_score = (matching_skills_count / total_skills) * 66  # 64% of the skills ratio
    else:
        skills_score = 66

    # Calculate the total score
    total_score = (experience_score + skills_score)

    return total_score, experience_score, skills_score
