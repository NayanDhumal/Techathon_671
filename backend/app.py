from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import google.generativeai as genai
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load the trained model
MODEL_PATH = "C:/Users/Nayan Dhumal/Desktop/Techathon/backend/model_last.pkl"
model = joblib.load(MODEL_PATH)

# Configure Gemini API
genai.configure(api_key="AIzaSyBbWM64ynqFwOOM92nzwUhawStNKTfxdrs")
gemini_model = genai.GenerativeModel("gemini-pro")

# Disease Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        input_features = np.array([[
            0,data["acetone"], data["nitric_oxide"], data["isoprene"],
            data["ammonia"], data["methane"], data["hydrogen_sulfide"],
            data["carbon_monoxide"], data["hydrogen"], data["ethanol"]
        ]])

        prediction = model.predict(input_features)
        return jsonify({"disease": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)})

# Chatbot API
# @app.route("/chatbot", methods=["POST"])
# def chatbot():
#     try:
#         user_input = request.json["message"]
#         prompt = f"Provide information about {user_input}, including how it can be detected through exhaled breath VOCs, preventive measures, and how it is transmitted."
#         response = gemini_model.generate_content(prompt)
#         return jsonify({"response": response.text})
#     except Exception as e:
#         return jsonify({"error": str(e)})
@app.route("/chatbot", methods=["POST"])
def chatbot():
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"error": "Invalid request. 'message' field is required."}), 400

        user_input = data["message"].strip()
        if not user_input:
            return jsonify({"error": "Message cannot be empty."}), 400

        prompt = (
            f"Provide information about {user_input}, including how it can be detected "
            "through exhaled breath VOCs, preventive measures, and how it is transmitted."
        )

        response = gemini_model.generate_content(prompt)

        if not response or not hasattr(response, "text"):
            return jsonify({"error": "AI model did not return a valid response."}), 500

        return jsonify({"response": response.text})

    except Exception as e:
        logging.error(f"Error in chatbot route: {e}", exc_info=True)
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500

# Lifestyle Recommendation API
# @app.route("/recommend", methods=["POST"])
# def recommend():
#     try:
#         data = request.json
#         disease = data["disease"]
#         lifestyle_factors = json.dumps(data["lifestyle_factors"])
        
#         prompt = f"Based on the disease '{disease}' and the user's lifestyle factors {lifestyle_factors}, provide a personalized diet and lifestyle recommendation."
#         response = gemini_model.generate_content(prompt)
        
#         return jsonify({"recommendation": response.text})
#     except Exception as e:
#         return jsonify({"error": str(e)})


@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json
        disease = data.get("disease", "").strip()
        lifestyle_factors = data.get("lifestyle_factors", [])

        if not disease or not lifestyle_factors:
            return jsonify({"error": "Disease and lifestyle factors are required"}), 400

        # Format input as readable text
        lifestyle_factors_text = ", ".join(lifestyle_factors)

        prompt = (
            f"A patient has been diagnosed with '{disease}'. "
            f"They have the following lifestyle factors: {lifestyle_factors_text}. "
            "Provide a personalized diet, exercise, and wellness recommendation in bullet points without any markdown formatting like ** or *."
        )

        response = gemini_model.generate_content(prompt)

        # Remove unwanted markdown formatting (** and *)
        cleaned_response = response.text.replace("**", "").replace("*", "")

        # Convert response into structured bullet points
        formatted_recommendation = "\n".join(
            [f"• {line.strip()}" for line in cleaned_response.split("\n") if line.strip()]
        )

        return jsonify({"recommendation": formatted_recommendation})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)

