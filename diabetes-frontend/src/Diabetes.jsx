import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Diabetes() {

  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: ""
  });

  const [result, setResult] = useState("");
  const [probability, setProbability] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );

      setResult(response.data.prediction);
      setProbability(response.data.probability);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl"
      >

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Diabetes Prediction System
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input type="number" name="Pregnancies" placeholder="Pregnancies" onChange={handleChange} className="input" />

          <input type="number" name="Glucose" placeholder="Glucose" onChange={handleChange} className="input" />

          <input type="number" name="BloodPressure" placeholder="Blood Pressure" onChange={handleChange} className="input" />

          <input type="number" name="SkinThickness" placeholder="Skin Thickness" onChange={handleChange} className="input" />

          <input type="number" name="Insulin" placeholder="Insulin" onChange={handleChange} className="input" />

          <input type="number" name="BMI" placeholder="BMI" onChange={handleChange} className="input" />

          <input type="number" step="0.01" name="DiabetesPedigreeFunction" placeholder="Pedigree Function" onChange={handleChange} className="input" />

          <input type="number" name="Age" placeholder="Age" onChange={handleChange} className="input" />

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Predict Diabetes
          </button>

        </form>

        {/* Result Section */}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-gray-50 rounded-xl p-6 shadow-md text-center"
          >

            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Prediction Result
            </h2>

            <p
              className={`text-3xl font-bold ${
                result === "Diabetic"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {result}
            </p>

            {probability !== null && (

              <div className="mt-6">

                <p className="text-gray-600 mb-2">
                  Risk Probability:
                  <span className="font-semibold ml-1">
                    {probability}%
                  </span>
                </p>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${probability}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-4 ${
                      probability > 70
                        ? "bg-red-500"
                        : probability > 40
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                  />

                </div>

                <p className="mt-2 text-sm text-gray-500">

                  {probability > 70
                    ? "High Risk - Consult a doctor"
                    : probability > 40
                    ? "Moderate Risk"
                    : "Low Risk"}

                </p>

              </div>

            )}

          </motion.div>
        )}

      </motion.div>
    </div>
  );
}

export default Diabetes;