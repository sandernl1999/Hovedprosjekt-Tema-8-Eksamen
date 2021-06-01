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
      setShowModal(!showModal);
    }
  }

  return (
    <div style={{ position: "absolute" }}>
      <label style={{ marginBottom: "12px" }}>
        <button id="myBtn" tabIndex={1} onClick={openModal}>
          ?
        </button>
      </label>
      {showModal && (
        <div id="myModal" class="modal">
          <div class="modal-content info-modal">
            <span
              tabIndex="1"
              class="close"
              onClick={openModal}
              onKeyDown={handleKeydown}
            >
              &times;
            </span>
            <p style={{ marginTop: 30 }}>
              On this map you find the 7 new wonders of the world + our school!
            </p>
            <p></p>
            <p>Click, scroll and navigate through the map!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
