import React, {useState} from 'react';
import Likert from './Likert';

const LikertsAnswers = ({answerTypes, onPress, value,minimize}) => {
  const [selected, setSelected] = useState(value);
  const handleSelection = (item) => {
    // console.log(item);
    var selectedId = selected;

    if (selectedId === item.id) setSelected(item.id);
    else setSelected(item.id);
    onPress(item);
  };
  return (
    <div style={{display:"flex", flexDirection: 'row',justifyContent:"space-between"}}>
      {answerTypes.map((item, index) => {
        return (
          <div>
            <Likert
            minimize = {minimize}
              text={item.answer}
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

export default LikertsAnswers;

// const styles = StyleSheet.create({
//   starImageStyle: {
//     color: 'black',
//     fontFamily: 'Poppins-Bold',
//     textAlign: 'center',
//     fontSize: 22,
//     width: 100,
//     alignSelf: 'center',
//   },
// });
