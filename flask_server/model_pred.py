import os

import cv2
import requests
from ultralytics import YOLO


def load_model(model_path):
    """Load the YOLOv8 model from the specified path."""
    model = YOLO(model_path)
    return model


def predict_with_yolo(image_path):

    image=cv2.imread(image_path)

    # Define the URL for the Flask server
    url = 'http://127.0.0.1:5050/predict'

    # Get the absolute path of the image
    absolute_path = os.path.abspath(image_path)

    # Create the payload with the image path
    payload = {'image_path': absolute_path}

    try:
        # Send a POST request to the Flask server
        response = requests.post(url, json=payload)

        # Check if the response is successful
        if response.status_code == 200:
            # Return the results from the response
            return image, response.json()
        else:
            # Return an error message if the request was unsuccessful
            return image, {"error": f"Request failed with status code {response.text}"}
    except Exception as e:
        return image, {"error": str(e)}