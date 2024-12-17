# Recruitment Platform with AI Integration

This project aims to facilitate the recruitment process by leveraging Artificial Intelligence (AI) technologies. It is divided into three main parts:

- **Frontend**: Built with Angular for the user interface.
- **Backend**: Developed using NestJS to handle server-side logic.
- **FlaskServer**: Implements AI features using YOLOv8 and Pytesseract for CV parsing and extracting relevant information.

The platform uses machine learning models and APIs to enhance the recruitment experience by automating the extraction of skills, experience, and other essential data from CVs, improving the precision of job matching. Additionally, it allows for the addition of job offers, application management, and tracking through a user-friendly web app.

---

## Project Structure

### 1. **Frontend** (Angular UI)
The **Frontend** directory contains the user interface built with Angular. This part of the project focuses on providing a seamless experience for both job seekers and recruiters. The UI includes features such as:
- User registration and login (with JWT-based authentication).
- Job offer listing and details view.
- Job application submission and tracking.
  
### 2. **Backend** (NestJS Server)
The **Backend** directory is built using NestJS, a progressive Node.js framework. It handles the business logic, user management, authentication, and communication with the Flask server for AI-related functionalities. Features include:
- RESTful API to manage user authentication (JWT).
- CRUD operations for job offers and applications.
- Secure routes for user management and job application tracking.

### 3. **FlaskServer** (AI Implementation & CV Parsing)
The **FlaskServer** directory contains the Python-based Flask server that powers the AI functionalities, including CV parsing and skill extraction. The AI components of the platform include:
- **YOLOv8**: Used for detecting and extracting relevant details from CVs, including images and text.
- **Pytesseract**: Integrated Optical Character Recognition (OCR) tool to read and extract text from scanned CVs.
- **Gemini 1.5flash API**: Used to improve the precision of information extraction, ensuring higher accuracy in matching skills and experience from CVs to job offers.

---

## Features

- **AI-Powered CV Parsing**: Automatically extracts skills, experiences, and other important information from CVs using YOLOv8 and Pytesseract.
- **Job Offer Management**: Employers can add, edit, and manage job offers through the web interface.
- **Application Tracking**: Applicants can track the status of their job applications and recruiters can view all incoming applications.
- **Authentication**: User authentication is handled using JWT for secure login and access.
- **Integration with Gemini 1.5flash API**: The platform calls the Gemini 1.5flash API to enhance precision in skill and experience matching.

---

## Technologies Used

- **Frontend**: Angular
- **Backend**: NestJS
- **AI/FlaskServer**: Flask, YOLOv8, Pytesseract, Gemini 1.5flash API
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: (Specify database, e.g., MongoDB, PostgreSQL, etc. if applicable)

---

## Getting Started

To set up the project locally, follow these steps:

### 1. **Clone the repository**:
```bash
git clone <repository_url>
cd <repository_name>
```
### 2. Frontend Setup:
Navigate to the frontend directory and install the required dependencies:

```bash
cd frontend
npm install
```  
Run the Angular application:
```bash
ng serve
```
### 3. Backend Setup:
Navigate to the backend directory and install the required dependencies:

```bash
cd backend
npm install
```
Run the NestJS application:
```bash
npm run start:dev
```
### 4. FlaskServer Setup:
Navigate to the flaskserver directory and install the required dependencies:

```bash
cd flaskserver
pip install -r requirements.txt
```
Run the Flask server:

```bash
python app.py
```
### 5. Environment Variables:
Make sure to configure any environment variables required for the project, such as JWT secret keys, database connection strings, and API keys for external services like Gemini 1.5flash.
