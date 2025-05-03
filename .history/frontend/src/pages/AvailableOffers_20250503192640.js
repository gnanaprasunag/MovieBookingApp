import React from 'react';
import './offer.css';

const ExampleAlert = () => {
  let bday = 'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727334509/e7ab8s5n2jcvzwddsmot.jpg';
  let anni = 'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727334529/xbj8t9vn6t9bi6vipmdw.jpg';
  let vip = 'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737658392/fchgv2fa1kg3u3qwrhfv.jpg';
  let VIP5 = 'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737788660/mauf7ff99gjgvq9k8uk8.jpg';
  let WB2 = 'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737788869/ubysxke75e0rxxocxo4b.jpg';
  let POP5 = 'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737788924/qmr4ng871yv5dyfri17h.jpg';

  const offerData = [
    {
      image: bday,
      title: "Birthday Offer",
      details: [
        "One free movie ticket",
        "Snack combo",
      ],
      howToAvail: [
        "Code: BDAY",
        "Valid for 24 hours",
        "Apply the coupon/offer code during the payment",
        "Offer will only be applicable if you show your booking ID",
      ],
    },
    {
      image: anni,
      title: "Anniversary Offer",
      details: [
        "Two free movie tickets",
        "Large snack combo",
      ],
      howToAvail: [
        "Code: ANNIVERSARY",
        "Valid for 24 hours",
        "Apply the coupon/offer code during the payment",
        "Offer will only be applicable if you show your booking ID",
      ],
    },
    {
      image: vip,
      title: "VIP Card Offer",
      details: [
        "Eligibility to top 10 seats booking",
        "Free water bottles",
      ],
      howToAvail: [
        "Code: VIPS",
        "Valid for 24 hours",
        "Apply the coupon/offer code during the payment",
        "Offer will only be applicable if you show your booking ID",
      ],
    },
    {
      image: VIP5,
      title: "VIP5 Special Offer",
      details: [
        "One free movie ticket",
        "Free water bottles",
        "Free parking",
        "One popcorn combo",
      ],
      howToAvail: [
        "Code: VIP5",
        "Valid for 24 hours",
        "Apply the coupon/offer code during the payment",
        "Offer will only be applicable if you show your booking ID",
      ],
    },
    {
      image: WB2,
      title: "Water Bottle Offer",
      details: [
        "One free water bottle",
      ],
      howToAvail: [
        "Code: WB2",
        "Valid for 24 hours",
        "Apply the coupon/offer code during the payment",
        "Offer will only be applicable if you show your booking ID",
      ],
    },
    {
      image: POP5,
      title: "Popcorn Offer",
      details: [
        "One medium popcorn",
        "One water bottle",
      ],
      howToAvail: [
        "Code: POP5",
        "Valid for 24 hours",
        "Apply the coupon/offer code during the payment",
        "Offer will only be applicable if you show your booking ID",
      ],
    },
  ];

  return (
    <div className="offer-container">
      {offerData.map((offer, index) => (
        <div key={index} className="offer-card">
          <h3>{offer.title}</h3>
          <img src={offer.image} alt={offer.title} className="offer-image" />
          <h4>Offer Details</h4>
          <ul className="offer-details">
            {offer.details.map((detail, i) => (
              <li style={{color:'red'}}key={i}>{detail}</li>
            ))}
          </ul>
          <h4>How to Avail</h4>
          <ul className="how-to-avail">
            {offer.howToAvail.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExampleAlert;
