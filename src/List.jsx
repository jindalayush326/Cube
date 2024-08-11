import React from "react";
import "./List.css";

const List = ({ customers, activeIndex, handleActiveDiv }) => {
  return (
    <div>
      {customers.map((item, ind) => {
        return (
          <div
            onClick={() => handleActiveDiv(ind)}
            className={`customerList ${ind == activeIndex ? "activeDiv" : ""}`}
            key={ind}
          >
            <h2>{item}</h2>
            <p>
              Paragraph for <b>Customer {ind + 1}</b> Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Omnis eius commodi exercitationem,
              tempora expedita in eligendi maxime sapiente excepturi odio
              itaque.
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;