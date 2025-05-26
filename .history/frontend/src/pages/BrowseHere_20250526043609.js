import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./browsehere.css";

export default function LocationFilter() {
  const { alltimeplaces } = useSelector((state) => state.movieSlice);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLocation } = location.state || {};

  const locationfilter = useMemo(() => {
    if (!alltimeplaces || !currentLocation) return [];
    const placesSet = new Set();
    alltimeplaces.forEach((ele) => {
      if (ele.location.toLowerCase().includes(currentLocation.toLowerCase())) {
        placesSet.add(ele.place);
      }
    });
    return Array.from(placesSet);
  }, [alltimeplaces, currentLocation]);

  const filteredTimePlace = useMemo(() => {
    if (!alltimeplaces || !currentLocation) return [];
    return alltimeplaces.filter((ele) =>
      ele.location.toLowerCase().includes(currentLocation.toLowerCase())
    );
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
                  state: {
                    place: ele,
                    filteredtimeplace: filteredTimePlace,
                  },
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
