import React from "react";

/**
  * Denne komponenten render en pop-up informasjon øverst i venstre hjørne
    som gir deg info om applikasjonens funksjonalitet 
 */

function Information() {
  const [showModal, setShowModal] = React.useState(false);

  function openModal() {
    setShowModal(!showModal);
    const menuEl = document.getElementsByClassName("menu-element");
    const h2El = document.querySelector("nav h2");

    if (menuEl.length !== 0) {
      h2El.click();
    }
  }

  function handleKeydown(event) {
    if (event.key === "Enter") {
      openModal();
    } else if (event.key === "Tab") {
      document.getElementById("myModal").focus();
    }
  }

  return (
    <div style={{ position: "absolute" }}>
      <label style={{ marginBottom: "12px" }}>
        <button
          id="myBtn"
          onClick={openModal}
          aria-haspopup="true"
          tabIndex="1"
        >
          ?
        </button>
      </label>
      {showModal && (
        <div
          id="myModal"
          class="modal"
          role="dialog"
          tabIndex="1"
          aria-labelledby="dialog1_label"
          aria-describedby="dialog1_label2"
        >
          <div class="modal-content info-modal">
            <button
              style={{
                width: "25px",
                height: "25px",
                marginLeft: "auto",
                marginRight: "10px",
                marginTop: "10px",
              }}
              class="close-popup-icon"
              tabIndex="1"
              onClick={openModal}
              onKeyDown={handleKeydown}
              aria-label="close dialog"
            >
              &times;
            </button>
            <p style={{ marginTop: 10 }} id="dialog1_label">
            I denne applikasjonen kan du søke opp nye destinasjoner og lagre dem digitalt på kartet!
            </p>
            <p></p>
            <p style={{marginTop: -25 }} id="dialog1_label2">
            Drøm deg bort og del destinasjoner med venner.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
