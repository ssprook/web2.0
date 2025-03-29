from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import time
from flask_cors import CORS
import os
import re
import numpy as np

# Désactiver les avertissements TensorFlow
tf.get_logger().setLevel('ERROR')

# Load your tokenizer and model
try:
    print("Chargement du tokenizer...")
    with open("src/models/tokenizerf.pkl", "rb") as tk:
        tokenizer = pickle.load(tk)
    print("Tokenizer chargé avec succès")
except Exception as e:
    print(f"Erreur lors du chargement du tokenizer: {str(e)}")
    raise e

try:
    print("Chargement du modèle...")
    model = tf.keras.models.load_model('src/models/finemail2.0.h5')
    print("Modèle chargé avec succès")
except Exception as e:
    print(f"Erreur lors du chargement du modèle: {str(e)}")
    raise e

MAX_SEQUENCE_LENGTH = 100

def clean_text(text):
    # Nettoyage plus approfondi du texte
    text = str(text).lower()
    # Remplacer les URLs par un token spécial
    text = re.sub(r'http\S+|www.\S+', '[URL]', text)
    # Remplacer les emails par un token spécial
    text = re.sub(r'\S+@\S+', '[EMAIL]', text)
    # Remplacer les numéros de téléphone par un token spécial
    text = re.sub(r'\b\d{10,}\b', '[PHONE]', text)
    # Remplacer les montants d'argent par un token spécial
    text = re.sub(r'\$\d+(?:\.\d{2})?|\d+(?:\.\d{2})?\$', '[MONEY]', text)
    # Supprimer les caractères spéciaux mais garder la ponctuation importante
    text = re.sub(r'[^\w\s\.,!?]', ' ', text)
    # Remplacer les espaces multiples par un seul espace
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def preprocess_text(text):
    cleaned_text = clean_text(text)
    # Convertir le texte en séquence de tokens
    sequence = tokenizer.texts_to_sequences([cleaned_text])
    # Padding de la séquence
    padded_sequence = pad_sequences(sequence, maxlen=MAX_SEQUENCE_LENGTH, padding='post', truncating='post')
    return padded_sequence

# Create the Flask app and enable CORS
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        start_time = time.time()
        data = request.get_json()
        message = data.get("message", "")
        if not message:
            return jsonify({"error": "Message is required"}), 400

        # Prétraitement et prédiction
        processed_message = preprocess_text(message)
        prediction = model.predict(processed_message)
        probability = float(prediction[0][0])
        
        # Calculer le temps écoulé
        elapsed = time.time() - start_time
        print(f"Prediction took {elapsed:.2f} seconds")
        
        # Déterminer si c'est du spam avec un seuil de 0.5
        is_spam = probability > 0.5
        
        # Calculer la confiance (plus la prédiction est proche de 0 ou 1, plus la confiance est élevée)
        confidence = (abs(probability - 0.5) * 2) * 100
        
        # Préparer la réponse
        details = {
            "prediction": "spam ⛔" if is_spam else "not spam ✅",
            "probability": probability,
            "confidence": f"{confidence:.1f}%",
            "processing_time": f"{elapsed:.2f}s"
        }
        
        print(f"Message: {message}")
        print(f"Cleaned message: {clean_text(message)}")
        print(f"Probability: {probability:.4f}")
        print(f"Confidence: {confidence:.1f}%")
        
        return jsonify(details)
    
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000) 