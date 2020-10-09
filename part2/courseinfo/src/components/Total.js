import React from "react";

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        total of {parts.reduce((sum, element) => (sum += element.exercises), 0)}{" "}
        exercices
      </b>
    </p>
  );
};

export default Total;
