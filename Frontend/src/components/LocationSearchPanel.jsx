import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";


const LocationSearchPanel = (props) => {
  const {
    suggestions,
    clickedField,
    setDrop,
    setPickup,
  } = props;


  //const { setOpenVehiclePanel, setOpenPanel } = props;
  const suggestionClickHandler = (suggestion) => {
    if (clickedField === "pickup") {
      setPickup(suggestion.structured_formatting.secondary_text+","+suggestion.structured_formatting.main_text);
    }
    else if(clickedField === "drop"){
        setDrop(suggestion.structured_formatting.secondary_text+","+suggestion.structured_formatting.main_text);
    }
  };

  return (
    <div>
      {suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            suggestionClickHandler(suggestion);
          }}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{suggestion.structured_formatting.secondary_text+","+suggestion.structured_formatting.main_text}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
