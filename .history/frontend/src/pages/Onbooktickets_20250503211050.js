import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
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
    const [currentLat, setCurrentLat] = useState(null);
    const [currentLon, setCurrentLon] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [distance, setDistance] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const Key = "pk.2a08003926a37954102c9d1cb3d3d94c";

    // ✅ Collect previous visited locations only once
    const visitedLocations = useMemo(() => {
        if (allbookinghistories && user) {
            const bookings = allbookinghistories.filter(
                (ele) => ele.user_name === user.email
            );
            if (bookings.length > 0) {
                return bookings[0].booked.map((el) => el.location);
            }
        }
        return [];
    }, [allbookinghistories, user]);

    // ✅ Get user's current lat/lon once
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLat(position.coords.latitude);
            setCurrentLon(position.coords.longitude);
        });
    }, []);

    // ✅ Filter time places whenever data changes
    useEffect(() => {
        if (alltimeplaces) {
            const filtered = alltimeplaces.filter(
                (ele) =>
                    ele.movie_name === movie.movie_name &&
                    ele.language === movie.language &&
                    ele.location.toLowerCase().includes(currentLocation.toLowerCase())
            );
            setTimeplaceFiltered(filtered);
        }
    }, [alltimeplaces, movie.movie_name, movie.language, currentLocation]);

    // ✅ When lat/lon changes, calculate distance
    useEffect(() => {
        if (currentLat && currentLon && lat && lon) {
            const url = `https://us1.locationiq.com/v1/directions/driving/${currentLon},${currentLat};${lon},${lat}?key=${Key}&overview=simplified&annotations=false`;
            axios.get(url)
                .then((response) => {
                    const result = response.data;
                    if (result.routes?.length > 0) {
                        const distanceInKilometers = result.routes[0].distance / 1000;
                        setDistance(distanceInKilometers);
                    } else {
                        console.error("No route found in API response.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching distance:", error);
                });
        }
    }, [currentLat, currentLon, lat, lon]);

    // ✅ Function to get coordinates from location name
    const fetchCoordinates = useCallback((address) => {
        const url = `https://us1.locationiq.com/v1/search.php?key=${Key}&q=${address}&format=json`;
        axios.get(url)
            .then((response) => {
                const data = response.data;
                if (data?.length > 0) {
                    setLat(data[0].lat);
                    setLon(data[0].lon);
                } else {
                    console.log("Location not found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching coordinates:", error);
            });
    }, []);

    // ✅ Open Google Maps navigation
    const nav = useCallback(() => {
        if (lat && lon) {
            window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
        }
    }, [lat, lon]);

    return (
        <div className="timeplace-container">
            <h2 className="page-title">Select Your Show</h2>
            {timeplaceFiltered && timeplaceFiltered.length > 0 ? (
                timeplaceFiltered.map((ele, index) => (
                    <div key={index} className="timeplace-card">
                        <h3 className="place-name">
                            {ele.place}{" "}
                            <button
                                style={{ fontSize: "18px", backgroundColor: "white", paddingLeft: "30px" }}
                                onClick={() => {
                                    setShowModal(true);
                                    fetchCoordinates(ele.location);
                                }}
                            >
                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red", fontSize: "24px" }} />
                            </button>{" "}
                            {visitedLocations.includes(ele.location) && (
                                <span className="visited">(Visited)</span>
                            )}
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

                        {showModal && (
                            <>
                                <div className="modal fade show d-block" tabIndex="-1">
                                    <div className="modal-dialog modal-sm">
                                        <div className="modal-content">
                                            <div className="modal-body text-center">
                                                <p>
                                                    {distance
                                                        ? `Distance - ${distance.toFixed(1)} km`
                                                        : "Calculating distance..."}
                                                </p>
                                                <button className="btn btn-success mb-2" onClick={nav}>
                                                    Directions
                                                </button>
                                                <br />
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="modal-backdrop fade show"
                                    onClick={() => setShowModal(false)}
                                ></div>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p className="no-shows">No shows available at this location.</p>
            )}
        </div>
    );
}
