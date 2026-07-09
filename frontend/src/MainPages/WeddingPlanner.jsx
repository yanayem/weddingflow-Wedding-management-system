import React from "react";
import WeddingPlannersImg from "../assets/wedding_planner.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMapMarkerAlt, faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const planners = [
  {
    id: 1,
    name: "Royal Weddings & Events",
    location: "Dhaka, Bangladesh",
    rating: 4.9,
    reviews: 128,
    price: "$$$",
    specialty: "Full-Service Planner",
    image: WeddingPlannersImg,
  },
  {
    id: 2,
    name: "Elegance Planners",
    location: "Chittagong, Bangladesh",
    rating: 4.8,
    reviews: 95,
    price: "$$",
    specialty: "Destination Planner",
    image: WeddingPlannersImg,
  },
  {
    id: 3,
    name: "Dream Day Coordinators",
    location: "Sylhet, Bangladesh",
    rating: 4.7,
    reviews: 64,
    price: "$",
    specialty: "Day-of Coordinator",
    image: WeddingPlannersImg,
  },
  {
    id: 4,
    name: "Budget Bliss Weddings",
    location: "Dhaka, Bangladesh",
    rating: 4.6,
    reviews: 42,
    price: "$",
    specialty: "Budget Planner",
    image: WeddingPlannersImg,
  },
];

const WeddingPlanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4">Expert Wedding Planners</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          From concept to execution, our professional planners will help you create the wedding of your dreams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {planners.map((planner) => (
          <div key={planner.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64">
              <img
                src={planner.image}
                alt={planner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-rose-600 font-bold shadow-md">
                {planner.price}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{planner.name}</h2>
                <div className="flex items-center text-yellow-500">
                  <FontAwesomeIcon icon={faStar} />
                  <span className="ml-1 font-semibold text-gray-700">{planner.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-500 mb-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                <span>{planner.location}</span>
              </div>

              <div className="mb-6">
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">
                  {planner.specialty}
                </span>
                <span className="ml-2 text-sm text-gray-400">({planner.reviews} reviews)</span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-700 transition duration-300">
                  Contact Now
                </button>
                <button className="p-2 border border-rose-600 text-rose-600 rounded-lg hover:bg-rose-50 transition duration-300">
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
                <button className="p-2 border border-rose-600 text-rose-600 rounded-lg hover:bg-rose-50 transition duration-300">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingPlanner;
