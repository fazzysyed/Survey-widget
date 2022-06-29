import React, { useState } from "react";
import Faces from "./Faces";
// import {great, greatActive, okay, sad} from './Icons';

const FacesAnswers = ({ answerTypes, onPress, value, minimize }) => {
  const [selected, setSelected] = useState(value);
  const handleSelection = (item) => {
    // console.log(item);
    var selectedId = selected;

    if (selectedId === item.id) setSelected(item.id);
    else setSelected(item.id);
    onPress(item);
  };
  // console.log(answerTypes)
  return (
    <div
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        display: "flex",
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

export default FacesAnswers;
