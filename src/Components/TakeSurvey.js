import React from "react";
function TakeSurvey({ Click, visible }) {
  return (
    <>
      {!visible ? (
        <div className="take-survey" onClick={Click}>
          <div
            style={{
              padding: 15,
              display: "flex",
              flexDirection: "row",

              minWidth: 200,
              width: 220,
              backgroundColor: "#ffffff",
              borderRadius: 10,
              borderBottom: "hidden",
              cursor: "pointer",
              boxShadow: "rgb(136 136 136) 0px 2px 5px",
              borderColor: "solid thin #cccccc",
              margin: 10,

              // : #ffffff;
              //   border-radius: 10px;
              //   border: solid thin #cccccc;
              //   border-bottom: hidden;
              //   box-shadow: 0px 2px 5px #888888;
              //   cursor: pointer;
            }}
          >
            <div
              style={{
                width: 40,
              }}
            >
              <img
                style={{
                  maxWidth: "100%",
                }}
                src="https://app.censuble.com/web_survey/v2/assets/img/faces.gif"
              />
            </div>
            <h3 className="take-survey-h3">Take our Survey</h3>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default TakeSurvey;
