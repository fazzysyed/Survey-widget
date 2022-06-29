import React, { useState } from "react";

class Answer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIds: [],
    };
  }
  componentDidMount = () => {
    if (this.props.value) {
      if (this.props.selectedIds.length) {
        var selectedIds = [...this.state.selectedIds];
        // this.state.selectedIds.push(this.props.value.answer_id);
        this.props.value.map((item) => {
          console.log(item);
          selectedIds.push(item.master_id);
        });
        this.setState({ selectedIds });
      }
    }
  };

  handleSelectionMultiple = async (item) => {
    var selectedIds = [...this.state.selectedIds]; // clone state
    if (selectedIds.includes(item.master_id)) {
      selectedIds = selectedIds.filter((_id) => _id !== item.master_id);
    } else selectedIds.push(item.master_id);
    this.props.onPress(item);
    this.setState({ selectedIds });
  };
  render() {
    return (
      <div
        style={{
          justifyContent: "center",
          // float:'left',
          display: "flex",
          flexDirection: "column",
          width: "100%",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {this.props.answerTypes.map((item) => {
          // console.log(item,"KKKK")
          return (
            <div
              className={
                this.props.minimize ? "questions-tab" : "questions-tab"
              }
              key={item.answer_id}
              onClick={() => this.handleSelectionMultiple(item)}
              style={{
                // height: 40,
                borderWidth: 1,
                shadowRadius: 1,
                shadowColor: "#AFAFAF",
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 1 },
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                backgroundColor: this.state.selectedIds.includes(item.master_id)
                  ? "#114B78"
                  : "#FFFFFF",
                borderColor: "#AFAFAF",
                borderRadius: 4,
                padding: "7px 0px",

                display: "flex",

                marginTop: "10px",
                cursor: "default",
              }}
            >
              <p
                style={{
                  fontSize: 20,
                  marginBottom: 0,
                  fontFamily: "Poppins-Regular",
                  color: this.state.selectedIds.includes(item.master_id)
                    ? "#FFFFFF"
                    : "#000",
                }}
              >
                {item.answer_text}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Answer;
