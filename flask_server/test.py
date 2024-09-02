from ultralytics import YOLO
import cv2

# Load the YOLO
# model
model = YOLO('YOLO/best.pt')

# Read the image
image = cv2.imread('CV_images/page_1.jpeg')

# Make predictions with the resized image
results = model.predict(image)




