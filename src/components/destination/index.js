import React, { useRef, useState } from "react";
import Rater from "react-rater";
import fire from "../../config/firebase-config";
import shareStopImg from "../../../assets/images/share_stop.jpg";
import deleteStopImg from "../../../assets/images/delete_img.png";
import Message from "../StatusMessage/Message";

/**
* Denne komponenten rendrer muligheten til å legge til, fjerne, oppdatere og dele en destinasjon.
* User-destinations er lagret i en kolleksjon hvor brukerdata er lagret mot den innloggede brukers email ID 
 */

export default function Destination({
  selectedDest,
  setShowPopup,
  destBoundaries,
  editDestination,
  setEditDestination,
  refreshMarkersOnSave,
  currentDestination,
  deleteDestination,
}) {
  const [destImage, setDestImage] = useState(null);
  const [destDesc, setDestDesc] = useState(
    currentDestination.desc ? currentDestination.desc : ""
  );
  const [destRating, setDestRating] = useState(
    currentDestination.rating ? currentDestination.rating : 0
  );
  const [isEditDestination, setIsDestination] = useState(false);
  const [enableShareDest, setEnableShareDest] = useState(false);
  const [sharewith, setSharewith] = useState("");
  const [disableShare, setDisableShare] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [disableSave, setDisableSave] = useState(false);

  function shareDestination() {
    if (!sharewith) return;
    setDisableShare(true);
    const db = fire.firestore();
    const colRef = db
      .collection("user-destinations")
      .doc(sharewith)
      .collection("destinations");
    colRef
      .add({
        downloadURL: currentDestination.downloadURL,
        title: selectedDest,
        desc: destDesc,
        rating: destRating,
        lng: currentDestination.lng,
        lat: currentDestination.lat,
        createdDateTime: new Date(),
      })
      .then((resp) => {
        setMessage("Deling er fullført");
        setMessageType("Suksess");
      })
      
      .finally((e) => setDisableShare(false));
  }

  function handleDestFileUpload(event) {
    setDestImage(event.target.files[0]);
  }

  function setRate({ rating }) {
    setDestRating(rating);
  }

  function handleFileUpload() {
    const reader = new FileReader();
    reader.onload = function (e) {
      const element = document.getElementById("destination-pic");
      element.setAttribute("src", e.target.result);
      element.setAttribute("width", 250);
      element.setAttribute("height", 250);
      element.removeAttribute("hidden");
    };
    reader.readAsDataURL(destImage);
  }

  function startAnimation() {
    const modalConatainer = document.getElementsByClassName("modal-content");
    modalConatainer[0].classList.add("animate-close-modal");
  }

  function saveDestination() {
    
    

    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
    if (!destImage) {
      setMessage("Vennligst velg et bilde");
      setMessageType("error");
      return;
    }
    setDisableSave(true);
    const userObj = JSON.parse(userString);
    if (destImage) {
      const storageRef = fire
        .storage()
        .ref(userObj.email + "/destination/" + destImage.name);
      // Last opp fil
      storageRef.put(destImage).then((snapshot) => {
        setEditDestination(false);
        setIsDestination(false);
        handleFileUpload();
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          const db = fire.firestore();
          const colRef = db
            .collection("user-destinations")
            .doc(userObj.email)
            .collection("destinations");
          colRef
            .add({
              downloadURL,
              title: selectedDest,
              desc: destDesc,
              rating: destRating,
              createdDateTime: new Date(),
              ...destBoundaries,
            })
            .then((resp) => {
              
              refreshMarkersOnSave();
            })
            .catch((err) => {
              
            })
            .finally((e) => setDisableSave(false));
        });
      });
    } else {
      setEditDestination(false);
      setIsDestination(false);
      const db = fire.firestore();
      const colRef = db
        .collection("user-destinations")
        .doc(userObj.email)
        .collection("destinations");
      colRef
        .add({
          downloadURL,
          title: selectedDest,
          desc: destDesc,
          rating: destRating,
          createdDateTime: new Date(),
          ...destBoundaries,
        })
        .then((resp) => {
          
          refreshMarkersOnSave();
        })
        .catch((err) => {
          
        })
        .finally((e) => setDisableSave(false));
    }
  }

  function addDestination() {
    
    
    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
    if (!destImage) {
      setMessage("Vennligst velg et bilde.");
      setMessageType("error");
      return;
    }
    setDisableSave(true);
    const userObj = JSON.parse(userString);
    const storageRef = fire
      .storage()
      .ref(userObj.email + "/destination/" + destImage.name);
    // Last opp fil
    storageRef.put(destImage).then((snapshot) => {
      setEditDestination(false);
      setIsDestination(false);
      handleFileUpload();
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        const db = fire.firestore();
        const colRef = db
          .collection("user-destinations")
          .doc(userObj.email)
          .collection("destinations");
        colRef
          .add({
            downloadURL,
            title: selectedDest,
            desc: destDesc,
            rating: destRating,
            createdDateTime: new Date(),
            ...destBoundaries,
          })
          .then((resp) => {
            
            refreshMarkersOnSave();
          })
          .catch((err) => {
            
          })
          .finally((e) => setDisableSave(false));
      });
    });
  }

  return (
    <div
      class="modal"
      id="destination-popup"
      role="dialog"
      tabIndex="0"
      aria-labelledby="destination-popup-label"
      aria-describedby="saved-information-description"
    >
      <div class="modal-dialog animate-modal">
        <div class="modal-content dest-modal">
          <div class="modal-header">
            <h5 class="modal-title" id="destination-popup-label">
              {selectedDest}
            </h5>
            <button
              class="close-popup-icon"
              tabIndex="0"
              aria-label="close dialog"
              onClick={() => {
                startAnimation();
                setTimeout(() => setShowPopup(false), 500);
              }}
            >
              {" "}
              x{" "}
            </button>
          </div>
          {editDestination && (
            <div>
              <div class="modal-body">
                <div style={{ marginBottom: 10 }}>
                  <input
                    class="form-control"
                    type="file"
                    id="dest-image"
                    onChange={handleDestFileUpload}
                    placeholder="Destinasjons bilde"
                  />
                </div>
                <div>
                  <textarea
                    maxLength="100"
                    class="form-control"
                    id="dest-desc"
                    value={destDesc}
                    onChange={(event) => setDestDesc(event.target.value)}
                    rows="3"
                    aria-label="Skriv inn ting om destinasjonen du har valgt"
                    placeholder="Skriv dine tanker"
                  ></textarea>
                  <label style={{ fontSize: 16, paddingTop: 4 }}>
                    {40 - destDesc.length} tegn igjen.
                  </label>
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <label>Rate</label>
                  <br />
                  <Rater
                    total={5}
                    rating={destRating}
                    onRate={setRate}
                    tabIndex="0"
                    aria-label={
                      "Rangeringen av denne destinasjonen er " + destRating + " stjerner"
                    }
                  />
                </div>
              </div>
              {message.length > 0 && (
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    marginTop: 10,
                  }}
                >
                  <Message
                    message={message}
                    setMessage={setMessage}
                    type={messageType}
                  />
                </div>
              )}
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    startAnimation();
                    setTimeout(() => setShowPopup(false), 500);
                  }}
                >
                  Steng
                </button>
                <button
                  type="button"
                  disabled={disableSave}
                  class="btn btn-primary"
                  aria-label="Lagre, men husk å legge til bilde."
                  onClick={saveDestination}
                >
                  Lagre
                </button>
              </div>
            </div>
          )}
          {!editDestination && (
            <div>
              <div class="modal-body">
                <div>
                  {!currentDestination.title && (
                    <p> Destinasjon lagret</p>
                  )}
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <img
                    id="destination-pic"
                    src="#"
                    alt="destination-pic"
                    hidden={true}
                  />
                  {currentDestination && currentDestination.downloadURL && (
                    <img
                      id="destination-pic"
                      height="250px"
                      width="250px"
                      src={currentDestination.downloadURL}
                      alt="destination-pic"
                    />
                  )}
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <label
                    style={{ fontSize: 16, paddingTop: 4 }}
                    id="saved-information-description"
                  >
                    {destDesc}
                  </label>
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <label>Rate</label>
                  <Rater
                    total={5}
                    rating={destRating}
                    onRate={setRate}
                    interactive={false}
                    tabIndex="0"
                    aria-label={
                      "Rangeringen av denne destinasjonen er " + destRating + " stjerner"
                    }
                  />
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <div style={enableShareDest ? { width: "100%" } : null}>
                    <img
                      src={deleteStopImg}
                      style={{
                        cursor: "pointer",
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        display: "inline",
                      }}
                      alt="Slett destinasjon"
                      onClick={deleteDestination}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") deleteDestination();
                      }}
                      role="button"
                      tabIndex="0"
                    ></img>
                    <img
                      src={shareStopImg}
                      style={{
                        cursor: "pointer",
                        width: 30,
                        height: 30,
                        display: "inline",
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") setEnableShareDest(true);
                      }}
                      alt="Del destinasjon"
                      role="button"
                      tabIndex="0"
                      onClick={() => setEnableShareDest(true)}
                    ></img>
                    {enableShareDest && (
                      <input
                        type="text"
                        class="form-control"
                        value={sharewith}
                        style={{ display: "inline", width: "65%" }}
                        placeholder="Tast inn bruker sin email"
                        onChange={(event) => setSharewith(event.target.value)}
                      />
                    )}
                    {enableShareDest && (
                      <button
                        class="btn btn-primary"
                        disabled={disableShare}
                        onClick={shareDestination}
                        style={{ display: "inline" }}
                      >
                        Del
                      </button>
                    )}
                  </div>
                </div>
                {message.length > 0 && (
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      marginTop: 10,
                    }}
                  >
                    <Message
                      message={message}
                      setMessage={setMessage}
                      type={messageType}
                    />
                  </div>
                )}
              </div>
              {!isEditDestination && (
                <div class="modal-footer">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDestination(true);
                      setEditDestination(true);
                    }}
                    class="btn btn-primary"
                    onKeyDown={(event) => {
                      if (event.key === "Tab") {
                        document.getElementById("destination-popup").focus();
                      } else if (event.key === "Enter") {
                        setIsDestination(true);
                        setEditDestination(true);
                      }
                    }}
                  >
                    Endre
                  </button>
                </div>
              )}
              {isEditDestination && (
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary">
                    Steng
                  </button>
                  <button
                    type="button"
                    disabled={disableSave}
                    class="btn btn-primary"
                    onClick={addDestination}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        addDestination();
                      } else {
                        document.getElementById("destination-popup").focus();
                      }
                    }}
                  >
                    {" "}
                    Save{" "}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
