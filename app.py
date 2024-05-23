from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app) 

# Load data
final_file = 'yelp_dataset_business_clean_withoriginalfeature.csv'
data = pd.read_csv(final_file)

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    req_data = request.get_json()
    state = req_data['state']
    city = req_data['city']
    category = req_data['category']
    day = req_data['day']
    kids = req_data['kids']

    recommendation = recommendations(data, state, city, category, day, kids)
    if not recommendation.empty:
        return recommendation.to_json(orient='records')
    else:
        return jsonify({"error": "No recommendations found for the given criteria."})

def recommendations(data, state, city, category, day, kids=False):
    recommendation = data[(data['state'] == state) & 
                          (data['city'] == city) & 
                          (data[category] == True) & 
                          (data[day] == True) & 
                          (data['review_count'] > 100) & 
                          (data['stars'] >= 4.5)].sort_values(by='review_count', ascending=False)
    if kids == 'Yes':
        recommendation = recommendation[recommendation['GoodForKids'] == True]
    return recommendation[['name', 'stars', 'review_count', 'address']]

if __name__ == '__main__':
    app.run(debug=True)
