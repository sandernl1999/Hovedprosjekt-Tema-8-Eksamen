import React, { useEffect, useState } from "react";

/**
 * This component renders a Drop down menu on the left top corner of the application.
 * Data is fetched from Firebase FirestoreDB
 */

export default function Menu({ destinations, map }) {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [mediaqueryMatches, setMediaqueryMatches] = useState(false);

  const mediaQueryList = window.matchMedia("(max-width: 490px)");

  useEffect(() => {
    if (mediaQueryList.matches) {
      setMediaqueryMatches(true);
    }
  }, []);

  function screenTest(e) {
    const geoCoderElements = document.getElementsByClassName(
      "mapboxgl-ctrl-geocoder mapboxgl-ctrl"
    );
    console.log("screenTest=>", geoCoderElements);
    if (e.matches) {
      setMediaqueryMatches(true);
      if (showMenuItems) {
        for (const element of geoCoderElements) {
          element.classList.add("hide-element");
        }
      } else {
        for (const element of geoCoderElements) {
          element.classList.remove("hide-element");
        }
      }
    } else {
      setMediaqueryMatches(false);
      for (const element of geoCoderElements) {
        element.classList.remove("hide-element");
      }
    }
  }

  mediaQueryList.addEventListener("change", screenTest);

  function handleMenu() {
    console.log("handleMenu IS RUNNING=>");
    if (mediaqueryMatches) {
      const geoCoderElements = document.getElementsByClassName(
        "mapboxgl-ctrl-geocoder mapboxgl-ctrl"
      );
      console.log("handleMenu geoCoderElements=>", geoCoderElements);
      for (const element of geoCoderElements) {
        if (!showMenuItems) element.classList.add("hide-element");
        else element.classList.remove("hide-element");
      }
    }
    setShowMenuItems(!showMenuItems);
  }

  function flyToDestination(destination) {
    if (map) {
      map.flyTo({
        center: [destination.lng, destination.lat],
        zoom: 9,
      });
    }
    handleMenu();
  }

  return (
    <div>
      <nav>
        <h2
          onClick={handleMenu}
          tabIndex={2}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleMenu();
          }}
        >
          🌎📌
        </h2>
        {showMenuItems && (
          <ul>
            {destinations.map((dest, index) => (
              <li key={index} onClick={() => flyToDestination(dest)}>
                <a
                  className="menu-element"
                  key={index}
                  href="#"
                  tabIndex={3 + index}
                >
                  {dest.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
