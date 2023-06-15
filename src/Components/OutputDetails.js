import React from "react";
import './OutputDetails.css';
const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="all-details">
      <p className="details">
        Status:{" "}
        <span >
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="details">
        Memory:{" "}
        <span >
          {outputDetails?.memory}
        </span>
      </p>
      <p className="details">
        Time:{" "}
        <span >
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;