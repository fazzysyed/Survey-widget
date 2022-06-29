import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import FacesAnswers from "./Components/FacesAnswers";
import YesorNoAnswers from "./Components/FacesAnswers";
import ThumbsAnswers from "./Components/ThumbsAnswers";
import MultipleChoice from "./Components/Answer";
import HeartsAnswers from "./Components/HeartsAnswers";
import StarsAnswers from "./Components/StarsAnswer";
import LikertsAnswers from "./Components/LikertAnswers";
import Suggestion from "./Components/Suggestion";
import Feedback from "./Components/Feedback";
import Single from "./Components/Single";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import axios from "axios";

import { FaWindowClose } from "react-icons/fa";

import {
  facesAnswerType,
  YesorNoAnswerTpes,
  thumbsAnswerTpes,
  HeartsAnswersTypes,
  LikertAnswerTypes,
  StarsAnswersTypes,
} from "./helper/AnswersType";
import "./style.css";

class Survey extends React.Component {
  state = {
    minimize: true,
    surveyVisible: true,
    companyName: "",
    highValue: null,
    surveyLength: 0,
    surveyNumber: 0,
    startTime: "",
    survey: null,
    config: {},
    uuid: "",
    feedback_text: "",
    loading: false,

    //Response State
    multiple: [],
    userResponse: [],
    facesAnswer: null,
    visible: false,
    feed: true,
    responses: [],

    index: 0,

    data: [],
    progress: 0,
    write: "Write Something",
  };

  componentDidMount = () => {
    if (this.props.censuble_survey.embed_type === "tab") {
      this.setState({ minimize: true });
    } else {
      this.setState({ minimize: false });
    }

    this.getDevice();
  };

  feedbackText = () => {
    const { feedback_text, config } = this.state;
    if (feedback_text.length) {
      var myHeaders = new Headers();

      let formdata = new FormData();
      formdata.append("survey_uuid", this.state.survey.uuid);
      formdata.append("feedback_topic", "general");
      formdata.append("answer_id", "0");
      formdata.append("answer_type", "feedback");
      formdata.append("feedback_type", "text");
      formdata.append("feedback_text", feedback_text);
      formdata.append("feedback_uri", "empty");
      formdata.append("company_uuid", config.company_uuid);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://services.censuble.com/api/v1/web-feedback", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          this.setState({
            feedback_text: "",
            feed: false,
          });
          setTimeout(() => {
            this.props.submitHandler();
          }, 5000);
        })
        .catch((error) => {});

      // this.props.navigation.navigate('Thankyou');
      // });
    }
  };

  uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  toTime = (time) => {
    let new_time = time.split(":");
    let t = new_time[0] * 60 + parseInt(new_time[1]);
    t = parseInt(t);
    return t;
  };
  getDevice = () => {
    this.setState({
      responses: [],
      data: [],
      multiple: [],
      index: 0,
      highValue: null,
      surveyLength: 0,
      surveyNumber: 0,
      startTime: "",
      survey: null,
      uuid: null,
      timeEqualSurveys: [],
      facesAnswer: null,
      visible: false,
      noSurvey: false,
    });

    this.setState({ loading: true });

    var config = {
      method: "get",
      url: `https://services.censuble.com/api/v1/device-surveys/${this.props.censuble_survey.device_token}`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        this.setState({ config: response.data.data.device });

        const today = new Date();
        const utc_time = today.getUTCHours() * 60 + today.getUTCMinutes();
        const time = parseInt(utc_time);
        console.log(time, "HHHHHHHH");

        response.data.data.device.survey_list.map((el) => {
          for (let item of el.schedules) {
            let start_time = this.toTime(item.time_start);
            let end_time = this.toTime(item.time_end);

            if (time > start_time && time < end_time) {
              this.state.timeEqualSurveys.push({ surveyuid: el.uuid });
            }
          }
        });
      })
      .then(() => {
        const { timeEqualSurveys } = this.state;
        if (timeEqualSurveys.length) {
          let survey =
            timeEqualSurveys[
              Math.floor(Math.random() * timeEqualSurveys.length)
            ];

          let configs = {
            method: "get",
            url: `https://services.censuble.com/api/v1/web-survey/${this.state.config.company_uuid}/${survey.surveyuid}`,
            headers: {},
          };

          axios(configs)
            .then((response) => {
              localStorage.setItem(
                "rememberSurvey",
                response.data.data.survey.uuid
              );

              this.setState({ survey: response.data.data.survey });

              let survey = response.data.data.survey.questions;

              this.setState({ data: survey, surveyLength: survey.length });
            })
            .then((result) => {
              this.setState({
                progress: 100 / this.state.data.length,
                loading: false,
              });
            })
            .catch((e) => {
              this.setState({ noSurvey: true });
            });
        } else {
          this.setState({ noSurvey: true });
        }
      })
      .catch((error) => {
        this.setState({ noSurvey: true });
        console.log(error);
      });
  };

  apiCall = async () => {
    this.setState({
      responses: [],
      data: [],
      multiple: [],
      index: 0,
      highValue: null,
      surveyLength: 0,
      surveyNumber: 0,
      startTime: "",
      survey: null,
      uuid: null,
      timeEqualSurveys: [],
      facesAnswer: null,
      visible: false,
    });
    this.setState({ loading: true });
  };

  uploadResponse = async () => {
    // this.setState({ data: [] });
    this.setState({ loading: true });
    const { config, data, companyName } = this.state;

    let responses = [];
    data.map((value) => {
      if (Array.isArray(value.answerWithId)) {
        for (let item of value.answerWithId) {
          responses.push({
            survey_uuid: this.state.survey.uuid,
            survey_name: this.state.survey.name,
            survey_category: "0",
            question_id: value.question_id,
            answer_text: item.answer_text,
            answer_id: item.id,

            parent_question_id: value.parent_question_id
              ? value.parent_question_id
              : 0,
            question_text: value.question_text,
            question_type: value.answer_type,
            timestamp: Math.ceil(new Date().getTime() / 1000),
            user_uuid: 1,
            transaction_id: this.uuid(),
            testmode: this.state.config.status === "active" ? 0 : 1,

            category_id: "0",
            category_name: "kiosk",
            media: {
              type: "video",
              source: "url",
              viewed: "true",
            },
          });
        }
      } else {
        console.log(data, "Testing");
        responses.push({
          survey_uuid: this.state.survey.uuid,
          survey_name: this.state.survey.name,
          survey_category: "0",
          question_id: value.question_id,
          answer_text: value.answerWithId.answer_text,
          answer_id: value.answerWithId.master_id,

          parent_question_id: value.parent_question_id
            ? value.parent_question_id
            : 0,
          question_text: value.question_text,
          question_type: value.answer_type,
          timestamp: Math.ceil(new Date().getTime() / 1000),
          user_uuid: 1,
          transaction_id: this.uuid(),
          testmode: this.props.censuble_survey.testmode,
          category_id: "0",
          category_name: "kiosk",
          media: {
            type: "video",
            source: "url",
            viewed: "true",
          },
        });
      }
    });

    let allrespones = [];
    let suggestionResponses = [];
    responses.map((item) => {
      if (item.question_type === "suggestion") {
        suggestionResponses.push(item);
      } else {
        allrespones.push(item);
      }
    });

    if (allrespones.length) {
      let data2 = {
        config: {
          device_uuid: this.state.config.uuid,
          device_name: this.state.config.company_name,
          device_location: this.state.config.location_name,
          company_name: this.state.config.company_name,
          company_uuid: this.state.config.company_uuid,
          timezone: this.state.config.company_timezone,
          account_uuid: this.state.config.account_uuid,
          account_name: this.state.config.account_name,
        },
        responses: allrespones,
        // outage: {
        //   records: allrespones.length,
        //   start_timestamp: Math.ceil(new Date().getTime() / 1000),
        // },
      };

      var configuration = {
        method: "post",
        url: "https://services.censuble.com/api/v1/web-survey",
        headers: {
          "Content-Type": "application/json",
        },
        data: data2,
      };

      axios(configuration)
        .then((response) => {
          console.log(response);
          this.setState({
            surveyVisible: false,
            loading: false,
          });
        })

        .catch(function (error) {
          this.setState({
            surveyVisible: false,
            loading: false,
          });
          console.log(error);
        });
    }
    if (suggestionResponses.length) {
      for (let item of suggestionResponses) {
        var myHeaders = new Headers();

        let formdata = new FormData();
        formdata.append("survey_uuid", this.state.survey.uuid);
        formdata.append("feedback_topic", "general");
        formdata.append("answer_id", "0");
        formdata.append("answer_type", "suggestion");
        formdata.append("feedback_type", "text");
        formdata.append("feedback_text", item.answer_text);
        formdata.append("feedback_uri", "empty");
        formdata.append("company_uuid", config.company_uuid);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        fetch(
          "https://services.censuble.com/api/v1/web-feedback",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {})
          .catch((error) => {});
        // this.props.navigation.navigate('Thankyou');
      }
    }
  };

  next = (value, index) => {
    console.log(this.state.facesAnswer, "Hey");
    this.setState({ visible: false, highValue: null });

    console.log(value, "REsponse");
    let foundR = this.state.responses.some(
      (el) => el.question_id === value.question_id
    );
    console.log(foundR, "gsgsgsgs");
    console.log("Hihe", this.state.highValue);
    this.setState({ highValue: value });
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds();

    let timestamp = `${hours}${min}${sec}`;
    const { facesAnswer, data, progress, surveyLength } = this.state;
    console.log(facesAnswer, "fafafafaHello");

    let length2 = data.length;
    if (this.state.facesAnswer != null && facesAnswer.length === undefined) {
      if (value.subquestions != undefined) {
        let subSortedArray = value.subquestions.sort(function (a, b) {
          return a.order_by - b.order_by;
        });

        value.subquestions.map((it) => {
          console.log(it, "Sub Arrays");
          const found = data.some((el) => el.id === it.id);
          it.parent_question_id = value.question_id;
          console.log(it, "YOYOYO", found);

          if (!found) {
            if (it.answer_link_id.includes(facesAnswer.id)) {
              this.state.data.splice(index + 1, 0, it);
              console.log("FFRREEERERERE", this.state.data);
            } else if (it.answer_link_id.includes(0)) {
              this.state.data.splice(index + 1, 0, it);
              console.log(this.state.data, "DDDDDDDD");
            }
          }
        });
      }

      if (value.subquestions === undefined || length2 === data.length) {
        console.log("Hello NOT ARRAY");

        this.setState({
          surveyNumber: this.state.surveyNumber + 1,
          progress: progress + 100 / surveyLength,
        });
      }
    }
    if (index != data.length - 1) {
      data[index].answerWithId = facesAnswer;

      this.setState({
        active: true,
        index: index + 1,
        facesAnswer: null,
        multiple: [],
      });
      if (data[index + 1].answerWithId === undefined) {
        console.log("IIII", data[index + 1].answerWithId);
        this.setState({ facesAnswer: null });
      }

      if (Array.isArray(facesAnswer)) {
        console.log("YesArray", facesAnswer);

        facesAnswer.map((item) => {
          console.log(item, "GGGAFfafafafaf", value);

          if (value.subquestions != null) {
            value.subquestions.map((it) => {
              const found = data.some((el) => el.id === it.id);
              it.parent_question_id = value.question_id;

              if (!found) {
                if (it.answer_link_id.includes(item.id)) {
                  this.state.data.splice(index + 1, 0, it);
                } else if (it.answer_link_id.includes(0)) {
                  this.state.data.splice(index + 1, 0, it);
                }
              }
            });
          }
          console.log(length2, "Chalo naa Response");
        });
        if (
          value.subquestions === undefined &&
          data[index + 1].parent_question_id != value.parent_question_id
        ) {
          console.log("Hello NOT ARRAY 2");
          this.setState({
            surveyNumber: this.state.surveyNumber + 1,
            progress: progress + 100 / surveyLength,
          });
        }

        for (let item of facesAnswer) {
          console.log(item, "Hello");
          data[index].answerWithId = facesAnswer;
        }
        this.setState({
          active: true,
          index: index + 1,
          // facesAnswer: null,
        });
      }
    }
    console.log(data, "Hesss");
    if (index === data.length - 1) {
      console.log("YesArray", Array.isArray(facesAnswer));

      data[index].answerWithId = facesAnswer;
      if (Array.isArray(facesAnswer)) {
        facesAnswer.map((item) => {
          if (value.subquestions != undefined) {
            value.subquestions.map((it) => {
              const found = data.some((el) => el.id === it.id);
              it.parent_question_id = value.question_id;

              if (!found) {
                if (it.answer_link_id.includes(item.id)) {
                  console.log("YYYESSSS");
                  this.state.data.splice(index + 1, 0, it);
                } else if (it.answer_link_id.includes(0)) {
                  console.log("NOOOOO");

                  this.state.data.splice(index + 1, 0, it);
                }
              }
            });
          }
          console.log(this.state.data, "Chalo naa Response");
        });

        for (let item of facesAnswer) {
          data[index].answerWithId = facesAnswer;
        }
      }
      this.uploadResponse();
    }
  };

  previous = (value, index) => {
    let high = this.state.data[index - 1].answerWithId;
    console.log(high, "Ground");

    this.setState({ highValue: high, facesAnswer: high, multiple: high });

    if (value.parent_question_id != undefined) {
      var removeIndex2 = this.state.data
        .map(function (item) {
          return item.question_id;
        })
        .indexOf(value.question_id);

      this.state.data.splice(removeIndex2, 1);
    }

    // remove object
    console.log("New state", this.state.data);
    if (index != 0) {
      this.setState({
        index: index - 1,
      });
    }
    if (value.parent_question_id === undefined) {
      this.setState({
        surveyNumber: this.state.surveyNumber - 1,
        progress: this.state.progress - 1 / this.state.surveyLength,
      });
    }
  };
  render() {
    const { minimize } = this.state;
    return (
      <div className={""}>
        <div style={{ padding: 10 }}>
          <Box
            className={minimize ? "main-box-tab" : "main-box"}
            bgcolor="white"
            boxShadow={
              this.props.censuble_survey.embed_type === "tab" ? "2" : "0"
            }
            p="24px"
            mt="50px"
            width="100%"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p className="censuable-tab">
                Powered by{" "}
                <a href="https://www.censuble.com/" target="_blank">
                  Censuble
                </a>
              </p>
              <div>
                {this.props.censuble_survey.embed_type === "tab" ? (
                  <FaWindowClose
                    className="icon-close"
                    onClick={this.props.close}
                  />
                ) : null}
              </div>
            </div>
            {this.state.loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {this.state.noSurvey ? (
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    No Survey available.
                  </div>
                ) : (
                  <img
                    className="loading-icon"
                    src={"https://app.censuble.com/img/animated.gif"}
                  />
                )}
              </div>
            ) : (
              <>
                {this.state.surveyVisible ? (
                  <>
                    <p
                      className={
                        minimize ? "question-number-tab" : "question-number"
                      }
                    >
                      {" "}
                      {this.state.surveyNumber + 1} of {this.state.surveyLength}
                    </p>
                    <ProgressBar
                      className={minimize ? "progress-tab" : "progress"}
                      now={this.state.progress}
                    />

                    {/* <p className="question-text">Q: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                     the industry's standard dummy text ever since the 1500s, when an unknown printer</p> */}
                    {/* <MultipleChoice value  answerTypes={[{answer_id:1,answer :"fafhajfhajfhajf"},{answer_id:2,answer :"fafhajfhajfhajf"},{answer_id:3,answer :"fafhajfhajfhajf"},{answer_id:4,answer :"fafhajfhajfhajf"}]} onPress={()=>console.log("afajfg")}/> */}
                    {this.state.data.map((item, index) => {
                      if (index === this.state.index) {
                        return (
                          <div key={index}>
                            <h3
                              className={
                                minimize ? "question-text-tab" : "question-text"
                              }
                            >
                              {item.question_text}
                            </h3>
                            <div
                              style={{
                                height: minimize ? 200 : 220,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {item.answer_type === "faces" ? (
                                <FacesAnswers
                                  minimize={minimize}
                                  answerTypes={facesAnswerType}
                                  value={
                                    this.state.highValue
                                      ? this.state.highValue.id
                                      : null
                                  }
                                  onPress={(value) => {
                                    let newAnswer = item.answers.filter(
                                      (data) => data.master_id === value.id
                                    );
                                    this.setState({
                                      facesAnswer: newAnswer[0],
                                    });
                                  }}
                                />
                              ) : (
                                [
                                  item.answer_type === "selectall" ? (
                                    <MultipleChoice
                                      minimize={minimize}
                                      selectedIds={this.state.multiple}
                                      answerTypes={item.answers}
                                      value={
                                        this.state.highValue
                                          ? this.state.highValue
                                          : null
                                      }
                                      onPress={(item, i) => {
                                        let foundR = this.state.multiple.some(
                                          (el) => el.id === item.id
                                        );
                                        if (!foundR) {
                                          this.state.multiple.push(item);
                                          console.log(
                                            "Answers Done",
                                            this.state.multiple
                                          );
                                          this.setState({
                                            facesAnswer: this.state.multiple,
                                          });

                                          console.log(
                                            this.state.facesAnswer,
                                            "Answers Done",
                                            this.state.multiple
                                          );
                                        } else {
                                          // let newArray = [...this.state.multiple];
                                          console.log("Hello");
                                          this.setState({
                                            multiple:
                                              this.state.multiple.filter(
                                                (r) => r.id != item.id
                                              ),
                                            facesAnswer:
                                              this.state.multiple.filter(
                                                (r) => r.id != item.id
                                              ),
                                            // multiple: newArray,
                                          });
                                        }
                                      }}
                                    />
                                  ) : (
                                    [
                                      item.answer_type === "hearts" ? (
                                        <HeartsAnswers
                                          minimize={minimize}
                                          answerTypes={HeartsAnswersTypes}
                                          value={
                                            this.state.highValue
                                              ? this.state.highValue.master_id
                                              : null
                                          }
                                          onPress={(value) => {
                                            let newAnswer = item.answers.filter(
                                              (data) =>
                                                data.master_id === value.id
                                            );

                                            this.setState({
                                              facesAnswer: newAnswer[0],
                                            });
                                          }}
                                        />
                                      ) : (
                                        [
                                          item.answer_type === "stars" ? (
                                            <StarsAnswers
                                              minimize={minimize}
                                              answerTypes={StarsAnswersTypes}
                                              value={
                                                this.state.highValue
                                                  ? this.state.highValue
                                                      .master_id
                                                  : null
                                              }
                                              onPress={(value) => {
                                                let newAnswer =
                                                  item.answers.filter(
                                                    (data) =>
                                                      data.master_id ===
                                                      value.id
                                                  );

                                                this.setState({
                                                  facesAnswer: newAnswer[0],
                                                });
                                              }}
                                            />
                                          ) : (
                                            [
                                              item.answer_type === "yesorno" ? (
                                                <YesorNoAnswers
                                                  minimize={minimize}
                                                  value={
                                                    this.state.highValue
                                                      ? this.state.highValue
                                                          .master_id
                                                      : null
                                                  }
                                                  answerTypes={
                                                    YesorNoAnswerTpes
                                                  }
                                                  onPress={(value) => {
                                                    let newAnswer =
                                                      item.answers.filter(
                                                        (data) =>
                                                          data.master_id ===
                                                          value.id
                                                      );

                                                    this.setState({
                                                      facesAnswer: newAnswer[0],
                                                    });
                                                  }}
                                                />
                                              ) : (
                                                [
                                                  item.answer_type ===
                                                  "multiplechoice" ? (
                                                    <Single
                                                      minimize={minimize}
                                                      value={
                                                        this.state.highValue
                                                          ? this.state.highValue
                                                              .master_id
                                                          : null
                                                      }
                                                      answerTypes={item.answers}
                                                      onPress={(item) => {
                                                        this.setState({
                                                          facesAnswer: item,
                                                        });
                                                      }}
                                                    />
                                                  ) : (
                                                    [
                                                      item.answer_type ===
                                                      "thumbs" ? (
                                                        <ThumbsAnswers
                                                          minimize={minimize}
                                                          value={
                                                            this.state.highValue
                                                              ? this.state
                                                                  .highValue
                                                                  .master_id
                                                              : null
                                                          }
                                                          answerTypes={
                                                            thumbsAnswerTpes
                                                          }
                                                          onPress={(value) => {
                                                            let newAnswer =
                                                              item.answers.filter(
                                                                (data) =>
                                                                  data.master_id ===
                                                                  value.id
                                                              );
                                                            this.setState({
                                                              facesAnswer:
                                                                newAnswer[0],
                                                            });
                                                          }}
                                                        />
                                                      ) : (
                                                        [
                                                          item.answer_type ===
                                                          "likert" ? (
                                                            <LikertsAnswers
                                                              minimize={
                                                                minimize
                                                              }
                                                              value={
                                                                this.state
                                                                  .highValue
                                                                  ? this.state
                                                                      .highValue
                                                                      .master_id
                                                                  : null
                                                              }
                                                              onPress={(item) =>
                                                                this.setState({
                                                                  facesAnswer:
                                                                    item,
                                                                })
                                                              }
                                                              answerTypes={
                                                                LikertAnswerTypes
                                                              }
                                                            />
                                                          ) : (
                                                            <Suggestion
                                                              minimize={
                                                                minimize
                                                              }
                                                              onFocus={() => {
                                                                this.setState({
                                                                  facesAnswer: {
                                                                    master_id: 25,
                                                                    answer_text:
                                                                      "",
                                                                  },
                                                                });
                                                              }}
                                                              value={
                                                                this.state
                                                                  .highValue
                                                                  ? this.state
                                                                      .highValue
                                                                      .answer
                                                                  : "type your feedback"
                                                              }
                                                              onChangeText={(
                                                                event
                                                              ) =>
                                                                this.setState({
                                                                  facesAnswer: {
                                                                    master_id: 25,
                                                                    answer_text:
                                                                      event
                                                                        .target
                                                                        .value,
                                                                  },
                                                                })
                                                              }
                                                            />
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]
                              )}
                            </div>

                            <div
                              style={{
                                // justifyContent: 'center',

                                height: "30%",
                                marginTop: 10,
                              }}
                            >
                              {index === 0 ? (
                                <div
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignSelf: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Button
                                    className={
                                      minimize ? "next-btn-tab" : "next-btn2"
                                    }
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                      this.state.facesAnswer === null ||
                                      this.state.facesAnswer.length === 0
                                        ? true
                                        : false
                                    }
                                    //   title="Next"
                                    onClick={() => this.next(item, index)}
                                    //   backgroundColor={
                                    //     this.state.facesAnswer === null
                                    //       ? 'grey'
                                    //       : '#114B78'
                                    //   }
                                  >
                                    Next
                                  </Button>
                                </div>
                              ) : index != 0 &&
                                index < this.state.data.length ? (
                                <div
                                  style={{
                                    justifyContent: "space-between",
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Button
                                    className={
                                      minimize ? "prev-btn-tab" : "prev-btn"
                                    }
                                    variant="contained"
                                    color="primary"
                                    backgroundColor="#114B78"
                                    title="Previous"
                                    onClick={() => this.previous(item, index)}
                                  >
                                    Previous
                                  </Button>
                                  <Button
                                    className={
                                      minimize ? "next-btn-tab" : "next-btn"
                                    }
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                      this.state.facesAnswer === null ||
                                      this.state.facesAnswer.length === 0
                                        ? true
                                        : false
                                    }
                                    onClick={() => this.next(item, index)}
                                  >
                                    Next
                                  </Button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : (
                  <Feedback
                    minimize={minimize}
                    value={this.state.feedback_text}
                    handler={(value) =>
                      this.setState({
                        feedback_text: value.target.value,
                      })
                    }
                    feed={this.state.feed}
                    sendFeedback={() => this.feedbackText()}
                  />
                )}
              </>
            )}
          </Box>
        </div>
      </div>
    );
  }
}

export default Survey;
