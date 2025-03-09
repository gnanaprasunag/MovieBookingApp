import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./browsehere.css";

export default function LocationFilter() {
  const { alltimeplaces } = useSelector((state) => state.movieSlice);
  const [locationfilter, setLocationFilter] = useState([]);
  const [filteredTimePlace, setFilteredTimePlace] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLocation } = location.state || {};

  useEffect(() => {
    let unique = [];
    if (alltimeplaces && currentLocation) {
      alltimeplaces.forEach((ele) => {
        if (
          !unique.includes(ele.place) &&
          ele.location.toLowerCase().includes(currentLocation.toLowerCase())
        ) {
          unique.push(ele.place);
        }
      });
    }
    setLocationFilter(unique);

    if (alltimeplaces && currentLocation) {
      let filter = alltimeplaces.filter((ele) =>
        ele.location.toLowerCase().includes(currentLocation.toLowerCase())
      );
      console.log("filter in browsehere",filter)
      setFilteredTimePlace(filter);
    }
  }, [alltimeplaces, currentLocation]);

  return (
    <div className="location-filter-container">
      <h1 className="location-filter-title">Select a Place</h1>
      <div className="locationn-filter-buttons">
        {locationfilter.length > 0 &&
          locationfilter.map((ele, index) => (
            <button
              key={index}
              className="locationn-button"
              onClick={() =>
                navigate("/onplaceclick", {
                  state: {place: ele, filteredtimeplace:filteredTimePlace },
                })
              }
            >
              {ele}
            </button>
          ))}
      </div>
    </div>
  );
}
