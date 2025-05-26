import React from "react";
import "./FandQPage.css"; // Import the CSS file for styling

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I book tickets on Book My Show?",
      answer:
        "To book tickets, search for the movie you want to watch, select the theater and showtime, and complete the payment process using your preferred payment method.",
    },
    {
      question: "Can I cancel or reschedule my tickets?",
      answer:
        "Yes, you can cancel your tickets before the showtime. However, rescheduling is currently not supported. Visit the 'My Bookings' section to cancel tickets.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, net banking, UPI, and digital wallets like Paytm, Google Pay, and PhonePe.",
    },
    {
      question: "How do I apply promo codes?",
      answer:
        "Enter the promo code in the 'Apply Promo Code' section during checkout, and the discount will be applied to your total amount.",
    },
    {
      question: "What should I do if I don’t receive the ticket confirmation?",
      answer:
        "If you don’t receive a confirmation email or SMS, check your spam folder. You can also view your bookings in the 'My Bookings' section. Contact support if the issue persists.",
    },
    {
      question: "Are there any convenience fees?",
      answer:
        "Yes, a small convenience fee is charged for online bookings. The fee varies depending on the ticket price and payment method.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our support team via the 'Support' section in the app or by calling our helpline number.",
    },
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
