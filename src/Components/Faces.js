import React from "react";
class Faces extends React.Component {
  render() {
    return (
      <img
        className={
          this.props.minimize
            ? "images-survey-tab big-responsive-tab"
            : "images-survey big-responsive"
        }
        onClick={this.props.onPress}
        resizeMode="contain"
        src={this.props.image}
        style={{
          height: "20%", // 70% of height device screen
          width: "25%",
        }}
      />
    );
  }
}

export default Faces;
