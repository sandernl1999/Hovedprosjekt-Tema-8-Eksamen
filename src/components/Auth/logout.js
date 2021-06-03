import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import fire from "../../config/firebase-config";

/**
 * Denne komponenten rendrer et profilbilde og logge ut funksjon
 */

export default function Logout() {
  const [profileURL, setProfileURL] = useState("");
  const history = useHistory();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
    const userObj = JSON.parse(userString);
    const colRef = fire
      .firestore()
      .collection("users")
      .where("email", "==", userObj.email);
    colRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setProfileURL(doc.data().downloadURL);
        });
      })
      .catch((error) => {
        
      });
  }, []);

  function singoutUser() {
    localStorage.removeItem("user");
    history.push("/");
  }

  function showHoverEffect() {
    const classes = document.getElementsByClassName("logout-button");
    classes[0].classList.add("full-width");

    const contClasses = document.getElementsByClassName("logout-container");
    contClasses[0].classList.add("full-width1");

    const logClasses = document.getElementsByClassName("logout");
    logClasses[0].classList.add("logout-opacity");
  }

  function removeHoverEffect() {
    const classes = document.getElementsByClassName("logout-button");
    classes[0].classList.remove("full-width");

    const contClasses = document.getElementsByClassName("logout-container");
    contClasses[0].classList.remove("full-width1");

    const logClasses = document.getElementsByClassName("logout");
    logClasses[0].classList.remove("logout-opacity");
  }

  return (
    <div class="logout-container">
      <a
        class="logout-button"
        tabIndex="0"
        role="button"
        aria-label="Logg ut"
        onKeyDown={(event) => {
          if (event.key === "Enter") singoutUser();
        }}
      >
        <img
          class="profile-img"
          src={profileURL}
          disabled={true}
          onFocus={showHoverEffect}
        ></img>
        <div
          class="logout"
          onClick={singoutUser}
          onBlur={removeHoverEffect}
          onKeyDown={(event) => {
            if (event.key === "Enter") singoutUser();
          }}
        >
          LOGG UT
        </div>
      </a>
    </div>
  );
}
