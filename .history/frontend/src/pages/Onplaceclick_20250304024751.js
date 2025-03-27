import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./onbooktickets.css"; // Assuming your CSS file is named Timeplace.css

export default function App() {
  
  const [filtered, setFiltered] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const {place, filteredtimeplace } = location.state || {};
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    let filter
    if (filteredtimeplace.length>0) {
      filter = filteredtimeplace.filter((ele) => {
        return ele.place === place
    }); 
    }
    setFiltered(filter);
  }, [filteredtimeplace, place]);

  return (
    <div className="timeplace-container">
      <h1 className="page-title">Available Showtimes</h1>

      {filtered.length > 0 ? (
        filtered.map((ele, index) => (
          <div key={index} className="timeplace-card">
            <h2 className="place-name">{ele.movie_name}</h2>
            <p className="location-name">{ele.language}</p>
            <div className="time-buttons">
              {ele.time.map((el, i) => (
                <button
                  key={i}
                  className="time-button"
                  onClick={() =>{ navigate("/onlocationclick", {
                    state: {
                      movie_name: ele.movie_name,
                      language: ele.language,
                      locationselected: ele.location,
                      seats: el.seats,
                      time: el.time,
                    },
                  }) }
                    
                  }
                >
                  {el.time}
                </button>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-shows">No shows available for the selected location.</p>
      )}
    </div>
  );
}
