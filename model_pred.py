import os
import cv2
from ultralytics import YOLO
import torch
from flask import jsonify

def load_model(model_path, use_cuda=False):
    """
    Loads a YOLO model from the specified .pt file.

    Args:
        model_path (str): Path to the .pt file containing the trained YOLO model.
        use_cuda (bool): If True, loads the model on the GPU; otherwise, on the CPU.

    Returns:
        model: The loaded YOLO model.
    """
    if use_cuda and torch.cuda.is_available():
        model = YOLO(model_path)  # This loads the model on GPU by default if available
    else:
        model = YOLO(model_path).to('cpu')  # Explicitly move the model to CPU

    return model
def predict_with_yolo(image_path):
    # Example usage:
    model = load_model('YOLO/best.pt', use_cuda=torch.cuda.is_available())
    # Check if the image path is valid
    if not os.path.exists(image_path):
        return jsonify({"error": "Image path does not exist"}), 400


    image=cv2.imread(image_path)

    if image is None:
        return jsonify({"error": "Could not read the image"}), 400


    # Make predictions with the image
    results = model.predict(image)

    # Extract boxes data
    boxes = results[0].boxes

    # Prepare the boxes data for JSON response
    boxes_data = {
        "boxes": boxes.xyxy.tolist(),  # Convert to list for JSON serialization
        "conf": boxes.conf.tolist(),  # Confidence scores
        "cls": boxes.cls.tolist()  # Class IDs
    }
    print(boxes_data)
    return image, boxes_data