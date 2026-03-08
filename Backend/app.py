from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

# load trained model
model = joblib.load(r"C:\Users\Mustafa\Desktop\diabetes project\Backend\diabetes_model.pkl")


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    print("Received:", data)



    
    features = np.array([[

        float(data.get("Pregnancies", 0)),
        float(data.get("Glucose", 0)),
        float(data.get("BloodPressure", 0)),
        float(data.get("SkinThickness", 0)),
        float(data.get("Insulin", 0)),
        float(data.get("BMI", 0)),
        float(data.get("DiabetesPedigreeFunction", 0)),
        float(data.get("Age",0))

    ]])

    # prediction
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]

    return jsonify({
        "prediction": int(prediction),
        "probability": float(probability)
    })


if __name__ == "__main__":
    app.run(debug=True)