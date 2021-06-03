import React, { useEffect, useState } from "react";

/**
 * Denne komponenten render en dropdown-menu nummer 2 fra øvre venstre hjørne
 * Data er hentet fra FirebaseDB
 */

export default function Menu({ destinations, map }) {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [mediaqueryMatches, setMediaqueryMatches] = useState(false);

  /** Regel som gjør at geocoder-feltet forsvinner foreløpig når dropdown-listen åpnes under 750px i bredde */
  const mediaQueryList = window.matchMedia("(max-width: 750px)");

  useEffect(() => {
    if (mediaQueryList.matches) {
      setMediaqueryMatches(true);
    }
  }, []);

  function screenTest(e) {
    const geoCoderElements = document.getElementsByClassName(
      "mapboxgl-ctrl-geocoder mapboxgl-ctrl"
    );
    
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
    
    if (mediaqueryMatches) {
      const geoCoderElements = document.getElementsByClassName(
        "mapboxgl-ctrl-geocoder mapboxgl-ctrl"
      );
      
      for (const element of geoCoderElements) {
        if (!showMenuItems) element.classList.add("hide-element");
        else element.classList.remove("hide-element");
      }
    }
    setShowMenuItems(!showMenuItems);
  }

  function flyToDestination(destination) {
    
    const allMarkers = document.getElementsByClassName("min-destinasjon");
    
    for (const singleMarker of allMarkers) {
      if (singleMarker.getAttribute("data-name") === destination.title) {
        
        const desiredMarker = singleMarker;
        
        desiredMarker.click();
      }
    }

    // if (map) {
    //   
    //   map.flyTo({
    //     center: [destination.lng, destination.lat],
    //     zoom: 9,
    //   });
    // }
    handleMenu();
  }

  return (
    <div>
      <nav>
        <h2
          onClick={handleMenu}
          tabIndex="2"
          onKeyDown={(event) => {
            if (event.key === "Enter") handleMenu();
          }}
          role="button"
          aria-haspopup="true"
          aria-label="Lagrede destinasjoner"
        >
          📌
        </h2>
        {showMenuItems && (
          <ul>
            {destinations.map((dest, index) => (
              <li
                key={index}
                onClick={() => flyToDestination(dest)}
                tabIndex="2"
                onKeyDown={(event) => {
                  
                  if (event.key === "Enter") {
                    flyToDestination(dest);
                  }
                }}
              >
                <a className="menu-element" key={index} href="#">
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
