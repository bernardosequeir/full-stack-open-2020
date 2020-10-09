import React from "react";

import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((element) => (
        <Part
          key={element.id}
          part={element.name}
          exercise={element.exercises}
        />
      ))}
    </>
  );
};
export default Content;
