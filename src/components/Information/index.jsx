import React from "react";

/**
 * This component renders a Information component on the left top of the application.
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
            <p style={{ marginTop: 30 }} id="dialog1_label">
              On this map you find the 7 new wonders of the world + our school!
            </p>
            <p></p>
            <p id="dialog1_label2">
              Click, scroll and navigate through the map!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
