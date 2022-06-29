import React, {useState} from 'react';
import Faces from './Faces';

const YesNoAnswers = ({answerTypes, onPress, value,minimize}) => {
  const [selected, setSelected] = useState(value);
  const handleSelection = (item) => {
    // console.log(item);
    var selectedId = selected;

    if (selectedId === item.id) setSelected(item.id);
    else setSelected(item.id);
    onPress(item);
  };
  return (
    <div style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
      {answerTypes.map((item) => {
        return (
          <div>
            <Faces
            minimize = {minimize}
              image={selected === item.id ? item.selected : item.un}
              onPress={() => {
                handleSelection(item);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default YesNoAnswers;
