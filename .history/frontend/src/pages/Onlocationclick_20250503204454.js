import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Onlocationclick.css";

export default function Onbooktickets() {
  const { allsingledate } = useSelector((state) => state.movieSlice);
  const location = useLocation();
  const navigate = useNavigate();

  const { movie_name, language, locationselected, placeselected, seats, time } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [check, setCheck] = useState([]);
  const [all, setAll] = useState([]);
  const day = useMemo(()=>{["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];},[])
 
  useEffect(() => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      dates.push(newDate);
    }

    setAll(dates); // Update the all array with generated dates
  }, []);

  useEffect(() => {
    if (allsingledate) {
      const filtered = allsingledate.filter(
        (ele) =>
          ele.movie_name === movie_name &&
          ele.language === language &&
          ele.time === time &&
          new Date(ele.singledate).toDateString() === selectedDate.toDateString() &&
          ele.address === locationselected
      );
      setCheck(filtered);
    }
  }, [allsingledate, movie_name, language, locationselected, time, selectedDate]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const bookSeats = () => {
    navigate("/snack", {
      state: {
        movie_name,
        language,
        locationselected,
        placeselected,
        selectedSeats,
        time,
        selectedDate,
      },
    });
  };

  return (
    <div className="booking-container">
      {/* Date Display */}
      <div className="date-container">
        {all.map((ele, i) => (
          <div
            key={i}
            className={`date-item ${
              ele.toDateString() === selectedDate.toDateString() ? "active" : ""
            }`}
            onClick={() => setSelectedDate(ele)}
          >
            <h3>{day[ele.getDay()]}</h3>
            <h3>{ele.getDate()}</h3>
            <h3>{ele.toLocaleString("default", { month: "short" })}</h3>
          </div>
        ))}
      </div>

      {/* Layout Section */}
      <div className="layout-container">
        {/* Seat Info */}
        <div className="seat-info">
          <h3>Time: {time}</h3>
          <h3>VIP-350 (S1-S10)</h3>
          <h3>Regular-200 (S11-S90)</h3>
          <h3>Normal-100 (S91-S100)</h3>

          <button className="book-btn" onClick={bookSeats} disabled={selectedSeats.length === 0}>
            Book Seats
          </button>

          <div className="legend">
            <div className="legend-item">
              <span className="legend-box selected"></span> Selected
            </div>
            <div className="legend-item">
              <span className="legend-box available"></span> Available
            </div>
            <div className="legend-item">
              <span className="legend-box sold"></span> Sold
            </div>
          </div>
        </div>

        {/* Seat Layout */}
        <div className="seat-layout">
          {seats &&
            seats.map((seat, index) => (
              <div
                key={seat.seatNumber}
                className={`seat ${
                  index < 10
                    ? "vip"
                    : index > 89
                    ? "normal"
                    : "regular"
                } ${
                  check.length > 0 && check[0].selectedSeats.includes(seat.seatNumber)
                    ? "booked"
                    : selectedSeats.includes(seat.seatNumber)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleSeatClick(seat.seatNumber)}
              >
                {seat.seatNumber}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
