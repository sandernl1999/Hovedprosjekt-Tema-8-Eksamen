import React, { useEffect, useState } from "react";

/**
 * This component renders a Welcome Banner which is displayed only first time when user logs into the application
 * Storing the flags in localstorage to make it consistent behavior
 */
export default function WelcomeBanner() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("showBanner") === "FALSE") {
      setShowBanner(false);
    }
  }, []);

  function closeBanner() {
    setShowBanner(false);
    localStorage.setItem("showBanner", "FALSE");
  }

  return (
    <div>
      {showBanner && (
        <div
          class="modal"
          id="welcome-banner"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog animate-modal">
            <div class="modal-content dest-modal">
              <div class="modal-body">
                <div className="align-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={closeBanner}
                  >
                    I Understand
                  </button>
                </div>
                <div className="align-center" style={{marginTop: 40}}>
                  <label>Welcome to MyTravels</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
