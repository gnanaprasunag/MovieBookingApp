import React from "react";
import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import "./aplicableoffers.css";

export default function App() {
  const { user } = useSelector((state) => {
    return state.user;
  });

  let bday =
    "https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727334509/e7ab8s5n2jcvzwddsmot.jpg";
  let anni =
    "https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727334529/xbj8t9vn6t9bi6vipmdw.jpg";
  let vipImage =
    "https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737658392/fchgv2fa1kg3u3qwrhfv.jpg";

  const [vip, setVip] = useState(false);
  const [birthdate, setBirthdate] = useState(false);
  const [annivers, setAnnivers] = useState(false);

  useEffect(() => {
    if (user.vip === "yes") {
      setVip(true);
    }
  }, []);

  
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const birthday = new Date(user.birthday);
  const anniversary = new Date(user.anniversary);
  const bdaymonth = birthday.getMonth() + 1;
  const bdaydate = birthday.getDate();
  const annimonth = anniversary.getMonth() + 1;
  const annidate = anniversary.getDate();

  useEffect(() => {
    if (date === bdaydate && month === bdaymonth) {
      setBirthdate(true);
    }
  }, []);

  useEffect(() => {
    if (date === annidate && month === annimonth) {
      setAnnivers(true);
    }
  }, []);

  return (
    <div className="offer-container">
      {vip==true && (
        <div className="offer-card">
          <h3>VIP Offer</h3>
          <img src={vipImage} alt="VIP Card" className="offer-image" />
          <h4>Available Offers</h4>
          <ul className="offer-details">
            <li>Two free movie tickets</li>
            <li>Large snack combo</li>
          </ul>
          <h4>How to Avail</h4>
          <ul className="how-to-avail">
            <li>Code: VIPS</li>
            <li>Valid for 24 hours</li>
            <li>Apply the coupon/offer code during the payment</li>
            <li>Offer will only be applicable if you show your booking ID</li>
          </ul>
        </div>
      )}

      {birthdate==true && (
        <div className="offer-card">
          <h3>Birthday Offer</h3>
          <img src={bday} alt="Birthday" className="offer-image" />
          <h4>Available Offers</h4>
          <ul className="offer-details">
            <li>One free movie ticket</li>
            <li>Snack combo</li>
          </ul>
          <h4>How to Avail</h4>
          <ul className="how-to-avail">
            <li>Code: BDAY</li>
            <li>Valid for 24 hours</li>
            <li>Apply the coupon/offer code during the payment</li>
            <li>Offer will only be applicable if you show your booking ID</li>
          </ul>
        </div>
      )}

      {annivers==true && (
        <div className="offer-card">
          <h3>Anniversary Offer</h3>
          <img src={anni} alt="Anniversary" className="offer-image" />
          <h4>Available Offers</h4>
          <ul className="offer-details">
            <li>Two free movie tickets</li>
            <li>Large snack combo</li>
          </ul>
          <h4>How to Avail</h4>
          <ul className="how-to-avail">
            <li>Code: ANNIVERSARY</li>
            <li>Valid for 24 hours</li>
            <li>Apply the coupon/offer code during the payment</li>
            <li>Offer will only be applicable if you show your booking ID</li>
          </ul>
        </div>
      )}
    </div>
  );
}
