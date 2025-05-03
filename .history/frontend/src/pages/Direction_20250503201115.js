import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SimpleModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-4">
      {/* Button to Open Modal */}
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Open Modal
      </button>

      {/* Small Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p> First line of text.</p>
                <p> Second line of text.</p>
                <p> Third line of text.</p>

                {/* Extra Button Inside Modal */}
                <button className="btn btn-success mb-2">Click Me</button>

                {/* Close Button */}
                <button className="btn btn-danger" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Overlay (Backdrop) */}
      {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}
    </div>
  );
};

export default SimpleModal;
