import React, { useEffect, useState } from "react";

/**
 * Denne komponenten rendrer en Velkomst pop-up som vises kun første gang en bruker logger seg inn i applikasjonen
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
              <div className="align-center" style={{marginTop: 14}}>
                <label aria-label="Velkommen til My travels">Velkommen til MyTravels.</label>
                  <label aria-label="Her kan du søke opp destinasjoner og markere dem på kartet!">
                    Her kan du søke opp destinasjoner og markere dem på kartet!</label>
                </div>
                <div className="align-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={closeBanner}
                    aria-label="Jeg skjønner"
                  >
                    Jeg skjønner!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
