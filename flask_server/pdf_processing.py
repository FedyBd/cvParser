import os
from pdf2image import convert_from_path
import pdfplumber
import cv2
import pytesseract
def pdf_to_images(pdf_path, output_folder, dpi=300, image_format='jpeg'):
    """
    Converts each page of a PDF to an image and saves them in the specified folder.

    Args:
        pdf_path (str): Path to the input PDF file.
        output_folder (str): Path to the folder where the images will be saved.
        dpi (int, optional): Resolution of the output images. Default is 300.
        image_format (str, optional): Format of the output images ('jpeg', 'png', etc.). Default is 'jpeg'.

    Returns:
        None
    """
    # Ensure the output folder exists
    os.makedirs(output_folder, exist_ok=True)

    # Convert PDF to images
    images = convert_from_path(pdf_path, dpi=dpi)

    # Save each image in the output folder
    for i, image in enumerate(images):
        image_filename = f'page_{i+1}.{image_format}'
        image_path = os.path.join(output_folder, image_filename)
        image.save(image_path, image_format.upper())

    print(f"PDF pages saved as images in folder: {output_folder}")


def extract_text_from_pdf(pdf_path):
    # Initialize an empty list to store the text from each page
    all_text = []

    # Open the PDF file
    with pdfplumber.open(pdf_path) as pdf:
        # Iterate over all the pages in the PDF
        for page in pdf.pages:
            # Extract text from each page
            text = page.extract_text()
            # Append the text to the list
            all_text.append(text)

    # Join all the text into a single string
    full_text = "\n".join(all_text)

    return full_text


def process_sections(output_folder, results, image):

    """Processes image sections, extracts text, renames files, and returns a list of section data.

    Args:
        boxes: A list of bounding boxes.
        image: The original image.

    Returns:
        A list of dictionaries, each containing 'path' and 'text' for a section.
    """

    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        print("Creating Sections folder")
        os.makedirs(output_folder)

    sections_data = []
    section_names = set()  # Use a set for efficient membership checks

    for i, box in enumerate(results['boxes']):
        x1, y1, x2, y2 = map(int, box)
        section = image[y1:y2, x1:x2]
        section_path = os.path.join(output_folder, f"section_{i}.jpg")
        cv2.imwrite(section_path, section)

        extracted_text = pytesseract.image_to_string(section).strip()
        first_line = extracted_text.split('\n')[0]

        new_path = os.path.join(output_folder, f"{first_line}.jpg")
        if first_line not in section_names:
            os.rename(section_path, new_path)
            section_names.add(first_line)

        sections_data.append({'path': new_path, 'text': extracted_text})

    return sections_data


