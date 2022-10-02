
import pandas as pd
import joblib

# read model from file
# the model is read outside the function to ensure it is 'pre-loaded'
MODEL = joblib.load("dtree_model.pkl")


def get_suburb_from_prefs(prefs: dict):

    # Convert prefs to a DataFrame
    user_preference = pd.DataFrame(prefs, index=[0])
    
    # Ensure order of columns in user preference data is same as training data
    user_preference = user_preference[MODEL.feature_names_in_]

    # Predict recommended suburb using model
    recommended_suburb = MODEL.predict(user_preference)[0]
    
    # Return the recommended suburb
    return recommended_suburb


if __name__ == "__main__":
    get_suburb_from_prefs({})
