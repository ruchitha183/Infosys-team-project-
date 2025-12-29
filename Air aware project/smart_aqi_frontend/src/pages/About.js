import React from "react";

const About = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          About Smart AQI System
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          The <span className="font-semibold text-indigo-600">Smart AQI Prediction System</span> 
          monitors and forecasts air quality across India using advanced machine learning algorithms 
          and real-time data analysis.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pollutant Analysis</h3>
            <p className="text-gray-600">Get a detailed pollutant-wise breakdown to understand local air quality.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Health Recommendations</h3>
            <p className="text-gray-600">Receive actionable advice to protect your health during pollution peaks.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Predictive Trends</h3>
            <p className="text-gray-600">Forecast future air quality trends using a reliable Random Forest model.</p>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-800">
          Our mission is to empower communities with data-driven insights for better environmental decisions and public health protection.
        </p>
      </div>
    </section>
  );
};

export default About;
