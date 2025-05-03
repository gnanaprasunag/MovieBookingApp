import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./onbooktickets.css";

export default function App() {
  const { alltimeplaces, allbookinghistories } = useSelector((state) => state.movieSlice);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, currentLocation } = location.state || {};

  const [timeplaceFiltered, setTimeplaceFiltered] = useState([]);
  const [currentlat, setcurrentlat] = useState();
  const [currentlon, setcurrentlon] = useState();
  const [lat, setlat] = useState();
  const [lon, setlon] = useState();
  const [alllocations, setAlllocations] = useState([]);
  const [a, setA] = useState();
  const [showModal, setShowModal] = useState(false);
  const Key = "pk.2a08003926a37954102c9d1cb3d3d94c";

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setcurrentlat(position.coords.latitude);
      setcurrentlon(position.coords.longitude);
    });
  }, []);

  
  useEffect(() => {
    if (alltimeplaces && movie && currentLocation) {
      const filter = alltimeplaces.filter(
        (ele) =>
          ele.movie_name === movie.movie_name &&
          ele.language === movie.language &&
          ele.location.toLowerCase().includes(currentLocation.toLowerCase())
      );
      setTimeplaceFiltered(filter);
    } else {
      setTimeplaceFiltered([]); // no data fallback
    }
  }, [alltimeplaces, movie, currentLocation]);

  
  useEffect(() => {
    if (allbookinghistories && user) {
      const az = allbookinghistories.filter((ele) => ele.user_name === user.email);

      if (az.length > 0 && az[0].booked) {
        const all = az[0].booked.map((el) => el.location);
        setAlllocations(all);
      } else {
        setAlllocations([]); // if no bookings
      }
    } else {
      setAlllocations([]); // reset when user or histories are missing
    }
  }, [allbookinghistories, user]);

  
  useEffect(() => {
    if (currentlon && currentlat && lat && lon) {
      const url = `https://us1.locationiq.com/v1/directions/driving/${currentlon},${currentlat};${lon},${lat}?key=${Key}&overview=simplified&annotations=false`;
      axios
        .get(url)
        .then((response) => {
          const result = response.data;
          if (result.routes && result.routes.length > 0) {
            const distanceInMeters = result.routes[0].distance;
            const distanceInKilometers = distanceInMeters / 1000;
            setA(distanceInKilometers);
          } else {
            console.error("No route found in API response.");
          }
        })
        .catch((error) => {
          console.error("Error fetching distance data: ", error);
        });
    }
  }, [currentlon, currentlat, lat, lon]);

  
  const click1 = (address) => {
    const url1 = `https://us1.locationiq.com/v1/search.php?key=${Key}&q=${address}&format=json`;
    axios
      .get(url1)
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          setlat(data[0].lat);
          setlon(data[0].lon);
        } else {
          console.log("Location not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching geolocation data: ", error);
      });
  };

  const nav = () => {
    window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
  };

  return (
    <div className="timeplace-container">
      <h2 className="page-title">Select Your Show</h2>

      {timeplaceFiltered && timeplaceFiltered.length > 0 ? (
        timeplaceFiltered.map((ele, index) => (
          <div key={index} className="timeplace-card">
            <h3 className="place-name">
              {ele.place}{" "}
              <button
                style={{
                  fontSize: "100px",
                  backgroundColor: "white",
                  paddingLeft: "30px",
                }}
                onClick={() => {
                  setShowModal(true);
                  click1(ele.location);
                }}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red", fontSize: "24px" }} />
              </button>
              {alllocations.includes(ele.location) && <span className="visited">(Visited)</span>}
            </h3>
            <h4 className="location-name">{ele.location}</h4>

            <div className="time-buttons">
              {ele.time.map((el, idx) => (
                <button
                  key={idx}
                  className="time-button"
                  onClick={() =>
                    navigate("/onlocationclick", {
                      state: {
                        movie_name: movie.movie_name,
                        language: movie.language,
                        locationselected: ele.location,
                        placeselected: ele.place,
                        seats: el.seats,
                        time: el.time,
                      },
                    })
                  }
                >
                  {el.time}
                </button>
              ))}
            </div>

            {/* ✅ Modal for distance */}
            {showModal && (
              <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-body text-center">
                      <p>{a ? `Distance - ${a.toFixed(1)} km` : "Calculating distance..."}</p>
                      <button className="btn btn-success mb-2" onClick={nav}>
                        Directions
                      </button>
                      <br />
                      <button className="btn btn-danger" onClick={() => setShowModal(false)}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Backdrop */}
            {showModal && (
              <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>
            )}
          </div>
        ))
      ) : (
        <p className="no-shows">No shows available at this location.</p>
      )}
    </div>
  );
}
