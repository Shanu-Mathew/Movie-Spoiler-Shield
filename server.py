import pandas as pd
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
import tensorflow_hub as hub
import tensorflow_text as text
from flask_cors import CORS

# Create Flask app
app = Flask(__name__)
CORS(app)

# Load your pre-trained model
model = tf.keras.models.load_model("Models\Final_Model.h5", custom_objects={
                                   "KerasLayer": hub.KerasLayer}, compile=False)
METRICS=[
    tf.keras.metrics.BinaryAccuracy(name='accuracy'),
    tf.keras.metrics.Precision(name='precision'),
    tf.keras.metrics.Recall(name='recall')
]
model.compile(optimizer= tf.keras.optimizers.Adam(learning_rate=3e-7),
             loss='binary_crossentropy',
             metrics=METRICS)

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get the review text from the request
    data = request.json
    review_text =pd.DataFrame({'review':[data['review']]})
    print('Review Text Received',review_text['review'][:])
    # Make prediction using the loaded model
    prediction = model.predict(review_text)
    print('Prediction Done')
    # Assuming binary classification, convert the prediction to a class (0 or 1)
    predicted_class = 1 if prediction > 0.5 else 0

    # Return the result as JSON
    result = {'prediction': predicted_class}
    return jsonify(result)

# Run the app
if __name__ == '__main__':
    app.run(debug=True,port=5000)