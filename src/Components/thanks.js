import React, { useEffect } from "react";
import { Tick } from "react-crude-animated-tick";

const Thanks = ({ minimize, handler }) => {
  return (
    <div className={minimize ? "thankyou-tick-tab" : "thankyou-tick"}>
      <div>
        <Tick size={100} />
      </div>
      <div>
        <h2>Thank You</h2>
        <p>Your feedback has been submitted.</p>
      </div>
    </div>
  );
};

export default Thanks;
