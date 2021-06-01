import React, { useRef, useState } from "react";
import Rater from "react-rater";
import fire from "../../config/firebase-config";
import shareStopImg from "../../../assets/images/share_stop.jpg";
import deleteStopImg from "../../../assets/images/delete_img.png";
import Message from "../StatusMessage/Message";

/**
 * This component renders a Destination Add, remove, update & share functionality.
 * user-destinations are stored in a collection where a users data is stored against email id of the logged in user
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
        setMessage("Shared successfully.");
        setMessageType("success");
      })
      .catch((err) => console.log(err))
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
    console.log("Running SaveDestination");
    console.log("saveDestination destImage===>", destImage);

    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
    if (!destImage) {
      setMessage("Please select a destination image.");
      setMessageType("error");
      return;
    }
    setDisableSave(true);
    const userObj = JSON.parse(userString);
    if (destImage) {
      const storageRef = fire
        .storage()
        .ref(userObj.email + "/destination/" + destImage.name);
      // Upload file
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
              console.log(resp);
              refreshMarkersOnSave();
            })
            .catch((err) => {
              console.log(err);
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
          console.log(resp);
          refreshMarkersOnSave();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((e) => setDisableSave(false));
    }
  }

  function addDestination() {
    console.log("Running addDestination");
    console.log("addDestination destImage===>", destImage);
    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
    if (!destImage) {
      setMessage("Please select a destination image.");
      setMessageType("error");
      return;
    }
    setDisableSave(true);
    const userObj = JSON.parse(userString);
    const storageRef = fire
      .storage()
      .ref(userObj.email + "/destination/" + destImage.name);
    // Upload file
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
            console.log(resp);
            refreshMarkersOnSave();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally((e) => setDisableSave(false));
      });
    });
  }

  return (
    <div class="modal" id="destination-popup">
      <div class="modal-dialog animate-modal">
        <div class="modal-content dest-modal">
          <div class="modal-header">
            <h5 class="modal-title" id="destination-popup-label">
              {selectedDest}
            </h5>
            <label
              class="close-popup-icon"
              onClick={() => {
                startAnimation();
                setTimeout(() => setShowPopup(false), 500);
              }}
              tabIndex={1}
            >
              {" "}
              x{" "}
            </label>
          </div>
          {editDestination && (
            <div>
              <div class="modal-body">
                <div style={{ marginBottom: 10 }}>
                  <input
                    class="form-control"
                    type="file"
                    id="dest-image"
                    tabIndex={1}
                    onChange={handleDestFileUpload}
                    placeholder="Destination Image"
                  />
                </div>
                <div>
                  <textarea
                    maxLength="100"
                    class="form-control"
                    id="dest-desc"
                    value={destDesc}
                    tabIndex={2}
                    onChange={(event) => setDestDesc(event.target.value)}
                    rows="3"
                    placeholder="Destination Desc"
                  ></textarea>
                  <label style={{ fontSize: 16, paddingTop: 4 }}>
                    {100 - destDesc.length} characters left.
                  </label>
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <label>Rate</label>
                  <br />
                  <Rater
                    total={5}
                    tabIndex={3}
                    rating={destRating}
                    onRate={setRate}
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
                  tabIndex={4}
                  onClick={() => {
                    startAnimation();
                    setTimeout(() => setShowPopup(false), 500);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={disableSave}
                  class="btn btn-primary"
                  onClick={saveDestination}
                  tabIndex={5}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {!editDestination && (
            <div>
              <div class="modal-body">
                <div>
                  {!currentDestination.title && (
                    <p> Destination saved successfully.</p>
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
                  <label style={{ fontSize: 16, paddingTop: 4 }}>
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
                      tabIndex={1}
                      alt="delete destination"
                      onClick={deleteDestination}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") deleteDestination();
                      }}
                    ></img>
                    <img
                      src={shareStopImg}
                      style={{
                        cursor: "pointer",
                        width: 30,
                        height: 30,
                        display: "inline",
                      }}
                      tabIndex={2}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") setEnableShareDest(true);
                      }}
                      alt="share destination"
                      onClick={() => setEnableShareDest(true)}
                    ></img>
                    {enableShareDest && (
                      <input
                        type="text"
                        class="form-control"
                        value={sharewith}
                        style={{ display: "inline", width: "65%" }}
                        placeholder="Enter email of the user"
                        tabIndex={3}
                        onChange={(event) => setSharewith(event.target.value)}
                      />
                    )}
                    {enableShareDest && (
                      <button
                        class="btn btn-primary"
                        disabled={disableShare}
                        onClick={shareDestination}
                        style={{ display: "inline" }}
                        tabIndex={4}
                      >
                        Share
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
                  >
                    Edit Destination
                  </button>
                </div>
              )}
              {isEditDestination && (
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary">
                    Close
                  </button>
                  <button
                    type="button"
                    disabled={disableSave}
                    class="btn btn-primary"
                    onClick={addDestination}
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
