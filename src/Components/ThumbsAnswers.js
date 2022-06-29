import React, { useState } from "react";
import Faces from "./Faces";
const ThumbsAnswers = ({ answerTypes, onPress, value, minimize }) => {
  const [selected, setSelected] = useState(value);
  const handleSelection = (item) => {
    // console.log(item);
    var selectedId = selected;

    if (selectedId === item.id) setSelected(item.id);
    else setSelected(item.id);
    onPress(item);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      {answerTypes.map((item) => {
        return (
          <Faces
            minimize={minimize}
            image={selected === item.id ? item.selected : item.un}
            onPress={() => {
              handleSelection(item);
            }}
          />
        );
      })}
    </div>
  );
};

export default ThumbsAnswers;
