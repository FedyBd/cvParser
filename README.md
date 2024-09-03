# Flask Server for CV Processing

This Flask server provides an endpoint for processing CV files. It extracts various details from uploaded CVs, such as name, email, phone number, experience, education, skills, and languages. The extracted information is then stored in a MySQL database.

## Features

- Upload PDF CV files
- Extract text and sections from CVs using image processing
- Store candidate details in a MySQL database
- Calculate rates based on experience and skills
- Handle errors and cleanup temporary files

## Requirements

- Python 3.x
- Flask
- MySQL Connector for Python
- OpenCV (for image processing)
- Additional libraries for PDF and text extraction (e.g., PyPDF2, pytesseract)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/repo.git
   cd repo
