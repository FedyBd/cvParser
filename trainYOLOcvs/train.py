from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import os

app = Flask(__name__)

# Load the YOLO model
model = YOLO('best.pt')


@app.route('/predict', methods=['POST'])
def predict():
    # Get the image path from the request
    data = request.json
    image_path = data.get('image_path')
    print(image_path)

    # Check if the image path is valid
    if not os.path.exists(image_path):
        return jsonify({"error": "Image path does not exist"}), 400

    # Read the image
    image = cv2.imread(image_path)

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

    return jsonify(boxes_data)


if __name__ == '__main__':
    app.run(debug=True, port=5050)
