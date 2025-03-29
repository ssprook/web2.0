import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Initialize Flask app
app = Flask(__name__)

# Load the model and tokenizer
MODEL_PATH = "finemail2.0_spam_classifier.h5"
TOKENIZER_PATH = "tokenizerf.pkl"

model = load_model(MODEL_PATH)

with open(TOKENIZER_PATH, "rb") as file:
    tokenizer = pickle.load(file)

# Define a route for spam prediction
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    email_text = data.get("email", "")

    if not email_text:
        return jsonify({"error": "Email text is required"}), 400

    # Preprocess the email text
    sequences = tokenizer.texts_to_sequences([email_text])
    padded_sequences = pad_sequences(sequences, maxlen=100)  # Adjust maxlen based on your model

    # Make a prediction
    prediction = model.predict(padded_sequences)
    is_spam = prediction[0][0] > 0.5  # Assuming binary classification (spam or not spam)

    return jsonify({
        "email": email_text,
        "is_spam": is_spam,
        "confidence": float(prediction[0][0])
    })

if __name__ == "__main__":
    app.run(debug=True)