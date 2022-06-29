import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import Thanks from "./thanks";

function Feedback({ minimize, value, handler, feed, sendFeedback }) {
  return (
    <>
      {feed ? (
        <div>
          <div className="survey_thanks">
            <div className="survey_question_text thanks">
              Thank You. Leave Feedback!
            </div>
          </div>
          <div className="survey_textarea">
            <textarea
              multiline={true}
              value={value}
              onChange={(value) => handler(value)}
              placeholder="Your Feedback Here..."
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className={"next-btn-tab"}
              disabled={value.length === 0}
              onClick={sendFeedback}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <Thanks minimize={minimize} />
      )}
    </>
  );
}

export default Feedback;
