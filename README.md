# Flask Server for CV Processing

This Flask server provides an endpoint for processing CV files. When a CV is uploaded, the server receives the file's ID, the path of the CV, and the associated job offer ID. It then extracts relevant details from the CV, such as name, email, phone number, experience, education, skills, and languages, and stores this information in a MySQL database. Additionally, the server retrieves the required skills and experience for the associated job offer from the database, rates the CV based on these criteria, and updates the CV's rating in the database.

## Features

- Extract text and sections from CVs using image processing
- Store candidate details in a MySQL database
- Calculate rates based on experience and skills
- Handle errors and cleanup temporary files

## Requirements
1. flask_server 
- Python 3.12
- Flask 3.0.3
- Flask-MySQLdb 2.0.0
- jsonify
- request
- mysqlclient 2.2.4
- shutil
- datetime
- opencv-python 4.10.0.84
- numpy
- matplotlib
- PIL
- pytesseract 0.3.13
- google-generativeai  0.1.0rc1
- re
- requests
- pdf2image 1.17.0
- pdfplumber 0.11.4

2. trainYOLOcvs
- python 3.8
- flask 3.0.3
- request
- jsonify
- ultralytics 8.2.2
- torch 1.10.1+cu102
- torchvision 0.11.2+cu102
- tqdm 4.66.2

