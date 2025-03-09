import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./offer.css"; // Assuming the CSS file is in the same directory

export default function Navigation() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");

  const places = [
    "Tirupati",
    "Nellore",
    "Mumbai",
    "Delhi-NCR",
    "Chennai",
    "Bengaluru",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Kolkata",
    "Kochi",
    "Chandigarh",
    "Jaipur",
    "Lucknow",
    "Indore",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Nagpur",
    "Vadodara",
    "Ludhiana",
    "Coimbatore",
  ];

  const handleClick = (ele) => {
    setSelectedLocation(ele);
    navigate("/initialpage", { state: { selectedlocation: ele } });
  };

  return (
    <div className="navigation-container">
      {places.map((ele, i) => (
        <button
          key={i}
          onClick={() => handleClick(ele)}
          className="location-button"
        >
          {ele}
        </button>
      ))}
    </div>
  );
}
