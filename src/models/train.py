import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout, GlobalMaxPooling1D, BatchNormalization, Bidirectional
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import numpy as np
import pandas as pd
import pickle
import os
import re

# Paramètres
MAX_WORDS = 10000
MAX_SEQUENCE_LENGTH = 100
EMBEDDING_DIM = 100
BATCH_SIZE = 32
EPOCHS = 20

def load_glove_embeddings():
    print("Chargement des embeddings GloVe...")
    embeddings_index = {}
    glove_path = 'src/models/glove.6B.100d.txt'
    
    if not os.path.exists(glove_path):
        print(f"ERREUR: Le fichier GloVe n'existe pas à {glove_path}")
        return None
        
    try:
        with open(glove_path, encoding='utf-8') as f:
            for line in f:
                values = line.split()
                word = values[0]
                coefs = np.asarray(values[1:], dtype='float32')
                embeddings_index[word] = coefs
        print(f"Chargé {len(embeddings_index)} vecteurs de mots")
        print(f"Exemple de vecteur pour le mot 'the': {embeddings_index.get('the', 'Non trouvé')[:5]}")
        return embeddings_index
    except Exception as e:
        print(f"ERREUR lors du chargement de GloVe: {str(e)}")
        return None

def create_embedding_matrix(tokenizer, embeddings_index):
    if embeddings_index is None:
        print("ERREUR: embeddings_index est None")
        return None
        
    word_index = tokenizer.word_index
    embedding_matrix = np.zeros((len(word_index) + 1, EMBEDDING_DIM))
    
    found_words = 0
    not_found_words = 0
    
    for word, i in word_index.items():
        embedding_vector = embeddings_index.get(word)
        if embedding_vector is not None:
            embedding_matrix[i] = embedding_vector
            found_words += 1
        else:
            # Initialiser avec des valeurs aléatoires pour les mots inconnus
            embedding_matrix[i] = np.random.normal(0, 0.1, EMBEDDING_DIM)
            not_found_words += 1
    
    print(f"\nStatistiques des embeddings:")
    print(f"Mots trouvés dans GloVe: {found_words}")
    print(f"Mots non trouvés: {not_found_words}")
    print(f"Taux de couverture: {(found_words / (found_words + not_found_words)) * 100:.2f}%")
    
    return embedding_matrix

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

def create_model(vocab_size, max_length, embedding_matrix):
    model = Sequential([
        Embedding(
            vocab_size,
            EMBEDDING_DIM,
            input_length=max_length,
            weights=[embedding_matrix],
            trainable=False
        ),
        BatchNormalization(),
        Bidirectional(LSTM(128, return_sequences=True)),
        Dropout(0.3),
        Bidirectional(LSTM(64)),
        Dropout(0.3),
        Dense(64, activation='relu'),
        BatchNormalization(),
        Dropout(0.3),
        Dense(32, activation='relu'),
        BatchNormalization(),
        Dropout(0.3),
        Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return model

def train_model(X_train, y_train, X_val, y_val, tokenizer, embedding_matrix):
    vocab_size = len(tokenizer.word_index) + 1
    model = create_model(vocab_size, MAX_SEQUENCE_LENGTH, embedding_matrix)
    
    callbacks = [
        tf.keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=5,
            restore_best_weights=True
        ),
        tf.keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=3,
            min_lr=0.00001
        )
    ]
    
    history = model.fit(
        X_train, y_train,
        batch_size=BATCH_SIZE,
        epochs=EPOCHS,
        validation_data=(X_val, y_val),
        callbacks=callbacks,
        verbose=1
    )
    
    return model, history

def preprocess_data(texts, tokenizer):
    # Convertir les textes en séquences
    sequences = tokenizer.texts_to_sequences(texts)
    # Padding des séquences
    padded_sequences = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH, padding='post', truncating='post')
    return padded_sequences

def main():
    # Charger le dataset
    print("Chargement du dataset...")
    df = pd.read_csv('src/models/Dataset des SMS.csv', encoding='utf-8')
    
    print("\nInformations sur le dataset:")
    print(df.info())
    
    # Préparer les données
    texts = df['Message'].apply(clean_text).values
    
    # Convertir les labels en nombres (ham = 0, spam = 1)
    labels = np.where(df['Category'] == 'spam', 1, 0)
    print("\nDistribution des classes:")
    print("Ham (0):", np.sum(labels == 0))
    print("Spam (1):", np.sum(labels == 1))
    
    # Créer et entraîner le tokenizer
    print("\nCréation du tokenizer...")
    tokenizer = Tokenizer(num_words=MAX_WORDS)
    tokenizer.fit_on_texts(texts)
    
    # Charger les embeddings GloVe
    print("\nChargement des embeddings GloVe...")
    embeddings_index = load_glove_embeddings()
    if embeddings_index is None:
        print("ERREUR: Impossible de continuer sans les embeddings GloVe")
        return
        
    embedding_matrix = create_embedding_matrix(tokenizer, embeddings_index)
    if embedding_matrix is None:
        print("ERREUR: Impossible de créer la matrice d'embeddings")
        return
    
    # Sauvegarder le tokenizer
    print("\nSauvegarde du tokenizer...")
    with open('src/models/tokenizerf.pkl', 'wb') as f:
        pickle.dump(tokenizer, f)
    
    # Préparer les données
    print("\nPréparation des données...")
    X = preprocess_data(texts, tokenizer)
    y = labels.astype('float32')
    
    # Diviser les données en ensembles d'entraînement et de validation
    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print("\nForme des données:")
    print("X_train shape:", X_train.shape)
    print("X_val shape:", X_val.shape)
    
    # Entraîner le modèle
    print("\nDébut de l'entraînement...")
    model, history = train_model(X_train, y_train, X_val, y_val, tokenizer, embedding_matrix)
    
    # Évaluer le modèle
    print("\nÉvaluation du modèle...")
    val_loss, val_accuracy = model.evaluate(X_val, y_val)
    print(f"Validation accuracy: {val_accuracy:.4f}")
    
    # Sauvegarder le modèle
    print("\nSauvegarde du modèle...")
    model.save('src/models/finemail2.0.h5')
    print("Modèle sauvegardé avec succès!")

if __name__ == "__main__":
    main() 