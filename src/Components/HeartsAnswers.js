import React, { useState, useEffect } from "react";

import { HeartsAnswersTypes, StarsAnswersTypes } from "../helper/AnswersType";
// const {height, width} = Dimensions.get('window');

const StarsAnswers = ({ onPress, value, minimize }) => {
  const [defaultRating, setDefaultRating] = useState(value);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [imgsLoaded, setImgsLoaded] = useState(false);

  return (
    <div
      style={{
        display: "-webkit-flex",
        flexDirection: "row",
        justifyContent: "space-between",

        display: "flex",
      }}
    >
      {HeartsAnswersTypes.map((item, index) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={item.id}
            onClick={() => {
              setDefaultRating(item.id);
              onPress(item);
            }}
          >
            <div>
              <img
                className={minimize ? "stars-image-tab" : "stars-image"}
                resizeMode="contain"
                src={item.id <= defaultRating ? item.selected : item.un}
              />

              {index === 0 ? (
                <p
                  className={minimize ? "worst-tab" : "worst"}
                  style={{
                    marginTop: 10,
                    color: "black",
                    fontFamily: "Poppins-Bold",
                    marginLeft: minimize ? 0 : 0,
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  Worst Rating
                </p>
              ) : null}
              {index === StarsAnswersTypes.length - 1 ? (
                <p
                  className={minimize ? " best-stars-tab" : "best-stars"}
                  style={{
                    color: "black",
                    fontFamily: "Poppins-Bold",
                    marginTop: 10,
                    fontSize: 14,
                    textAlign: "center",

                    marginLeft: minimize ? 0 : 0,
                  }}
                >
                  Best Rating
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
      {/* <Text style={{fontSize: 50, fontWeight: 'bold'}}>{1 + 1}</Text> */}
    </div>
  );
};

export default StarsAnswers;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//     justifyContent: 'center',
//     textAlign: 'center',
//   },
//   titleText: {
//     padding: 8,
//     fontSize: 16,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   textStyle: {
//     textAlign: 'center',
//     fontSize: 23,
//     color: '#000',
//     marginTop: 15,
//   },
//   textStyleSmall: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#000',
//     marginTop: 15,
//   },
//   buttonStyle: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 30,
//     padding: 15,
//     backgroundColor: '#8ad24e',
//   },
//   buttonTextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//   },

// });
