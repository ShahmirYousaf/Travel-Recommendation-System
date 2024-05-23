import React, { useState } from 'react'
import './Recommendation.css'
import Navbar from '../../Components/Navbar/Navbar';

const categories = [
    'Restaurants', 
    'Food', 
    'Shopping', 
    'Beauty & Spas', 
    'Home Services', 
    'Health & Medical', 
    'Automotive', 
    'Nightlife', 
    'Local Services', 
    'Bars', 
    'Event Planning & Services', 
    'American (Traditional)', 
    'Active Life'
];

const Recommendation = () => {
    const [recommendations, setRecommendations] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const requestData = {
            state: formData.get('state'),
            city: formData.get('city'),
            category: formData.get('category'),
            day: formData.get('day'),
            kids: formData.get('kids')
        };

        const response = await fetch('http://localhost:5000/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        setRecommendations(data);
    };
  return (
    <div className="recommendation-container">
        <Navbar/>
            <h2 className='RecHeading'>Explore Your Next Adventure</h2>
            <form className='RecForm' onSubmit={handleSubmit}>
                <input className='Rec-Own-Style' type="text" name="state" placeholder="Enter State" required />
                <input className='Rec-Own-Style' type="text" name="city" placeholder="Enter City" required />
                {/* <input type="text" name="category" placeholder="Enter Category" required />  */}
                <select className='Rec-Own-Style' name="category" required>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <input className='Rec-Own-Style' type="text" name="day" placeholder="Enter Day" required />
                <select className='Rec-Own-Style' name="kids" required>
                    <option value="">Will you bring kids?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <button className='RecommendationButton' type="submit">Get Recommendations</button>
            </form>

            {/* Display recommendations */}
            <div className="recommendation-list">
                {recommendations.map(recommendation => (
                    <div key={recommendation.name} className="recommendation-item">
                        <p className="recommendation-name">{recommendation.name}</p>
                        <p className="recommendation-details">{recommendation.stars} Stars | {recommendation.review_count} Reviews</p>
                        <p className="recommendation-address">{recommendation.address}</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Recommendation;
