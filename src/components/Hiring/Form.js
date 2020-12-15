import React, { useEffect, useState } from "react";
import "./Form.css";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Container } from "@material-ui/core";

function Form(props) {
  const [batchArray, setBatchArray] = useState([]);
  const [errorP, seterrorP] = useState(false);
  const [errorI, seterrorI] = useState(false);
  const [errorIN, seterrorIN] = useState(false);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...props.PlaProCTC];
    list[index][name] = value;
    props.setPlaProCTC(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...props.PlaProCTC];
    list.splice(index, 1);
    props.setPlaProCTC(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    props.setPlaProCTC([...props.PlaProCTC, { Profile: "", CTC: "" }]);
  };

  //Internship 1
  const handleInputChange_I = (e, index) => {
    const { name, value } = e.target;
    const list = [...props.InterProCTC];
    list[index][name] = value;
    props.setInterProCTC(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick_I = (index) => {
    const list = [...props.InterProCTC];
    list.splice(index, 1);
    props.setInterProCTC(list);
  };

  // handle click event of the Add button
  const handleAddClick_I = () => {
    props.setInterProCTC([...props.InterProCTC, { Profile: "", CTC: "" }]);
  };

  // Internship ka alg
  const handleInputChange_IN = (e, index) => {
    const { name, value } = e.target;
    const list = [...props.InterProCTC_PPO];
    list[index][name] = value;
    props.setInterProCTC_PPO(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick_IN = (index) => {
    const list = [...props.InterProCTC_PPO];
    list.splice(index, 1);
    props.setInterProCTC_PPO(list);
  };

  // handle click event of the Add button
  const handleAddClick_IN = () => {
    props.setInterProCTC_PPO([
      ...props.InterProCTC_PPO,
      { Profile: "", CTC: "" },
    ]);
  };

  const batchIN = (e) => {
    console.log(e.target.value);
    props.setInterBatch(e.target.value);
  };
  const batchPla = (e) => {
    props.setPlaBatch(e.target.value);
  };

  const offerIN = (e) => {
    props.setInterOffers(e.target.value);
  };
  const offerPla = (e) => {
    props.setPlaOffers(e.target.value);
  };
  const RemarkIN = (e) => {
    props.setInterRemark(e.target.value);
  };
  const RemarkPla = (e) => {
    props.setPlaRemark(e.target.value);
  };

  const streamInter = (e) => {
    const list = [...props.streamInter];
    if (e.target.value === "All" && e.target.checked) {
      list.map((li) => {
        {
          li.isChecked = true;
        }
      });
      props.setStreamInterSelected(list);
    } else if (e.target.value === "All" && !e.target.checked) {
      list.map((li) => {
        {
          li.isChecked = false;
        }
      });
      props.setStreamInterSelected(list);
    } else {
      list.map((li) => {
        if (li.stream === e.target.value) {
          {
            li.isChecked = !li.isChecked;
          }
        }
      });
      props.setStreamInterSelected(list);
    }
    //console.log(list)
  };
  const streamPla = (e) => {
    const list = [...props.streamPla];
    if (e.target.value === "All" && e.target.checked) {
      list.map((li) => {
        {
          li.isChecked = true;
        }
      });
      props.setStreamPlaSelected(list);
    } else if (e.target.value === "All" && !e.target.checked) {
      list.map((li) => {
        {
          li.isChecked = false;
        }
      });
      props.setStreamPlaSelected(list);
    } else {
      list.map((li) => {
        if (li.stream === e.target.value) {
          {
            li.isChecked = !li.isChecked;
          }
        }
      });
      props.setStreamPlaSelected(list);
    }
  };

  useEffect(() => {
    var today = new Date();
    //var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    if (mm >= "05") {
      setBatchArray([yyyy, yyyy + 1, yyyy + 2]);
    } else {
      setBatchArray([yyyy - 1, yyyy, yyyy + 1]);
    }
  }, []);

  const isFloat = (vf) => {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(vf)) return false;

    vf = parseFloat(vf);
    if (isNaN(vf)) return false;
    return true;
  };

  const isInt = (vi) => {
    var intRegex = /^-?\d+$/;
    if (!intRegex.test(vi)) return false;

    var intVal = parseInt(vi, 10);
    return parseFloat(vi) == intVal && !isNaN(intVal);
  };

  return (
    <Container disableGutters={true} maxWidth="md" className="Form">
      <div className="Form_heading">
        <h3>{props.type} Details</h3>
      </div>

      <div className="Form_material">
        <div className="Form_materialStream">
          <p>
            Stream <span className="Form_required">*</span>
          </p>

          {props.type === "Internship" ? (
            <React.Fragment>
              <label className="Form_stream">
                <input onChange={streamInter} value="All" type="checkbox" />
                All
              </label>

              {props.streamInter.map((streamOption) => {
                return (
                  <label className="Form_stream">
                    <input
                      checked={streamOption.isChecked}
                      onChange={streamInter}
                      value={streamOption.stream}
                      type="checkbox"
                    />
                    {streamOption.stream}
                  </label>
                );
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label className="Form_stream">
                <input onChange={streamPla} value="All" type="checkbox" />
                All
              </label>

              {props.streamPla.map((streamOption) => {
                return (
                  <label className="Form_stream">
                    <input
                      checked={streamOption.isChecked}
                      onChange={streamPla}
                      value={streamOption.stream}
                      type="checkbox"
                    />
                    {streamOption.stream}
                  </label>
                );
              })}
            </React.Fragment>
          )}
        </div>
        <div className="Form_materialMain">
          {props.type === "Internship" ? (
            <React.Fragment>
              <label id="Form_labelCTC" for="Form_proCTC">
                Profile - CTC
                <span className="label_tag">
                  Stipend per month (in Thousand)
                </span>
                {errorI && (
                  <span className="error_tag error_intern">
                    Please enter numeric value only
                  </span>
                )}
              </label>
              {props.InterProCTC.map((x, i) => {
                return (
                  <div className="box">
                    <input
                      type="text"
                      className="ml10"
                      name="Profile"
                      value={x.Profile}
                      placeholder="Profile"
                      onChange={(e) => handleInputChange_I(e, i)}
                    />
                    <input
                      type="text"
                      className="ml11"
                      name="CTC"
                      placeholder={
                        props.type === "Internship"
                          ? "Stipend per month"
                          : "CTC"
                      }
                      value={x.CTC}
                      onChange={(e) => {
                        var valueI = e.target.value;
                        if (
                          valueI === null ||
                          valueI === "" ||
                          isFloat(valueI) ||
                          isInt(valueI)
                        ) {
                          handleInputChange_I(e, i);
                          seterrorI(false);
                        } else {
                          seterrorI(true);
                        }
                      }}
                    />
                    <div className="btn-box">
                      {props.InterProCTC.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick_I(i)}
                        >
                          <CloseRoundedIcon />
                        </button>
                      )}
                      {props.InterProCTC.length - 1 === i && (
                        <button className="mr10" onClick={handleAddClick_I}>
                          <AddRoundedIcon />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {" "}
              <label id="Form_labelCTC" for="Form_proCTC">
                Profile - CTC<span className="label_tag">(in Lakh)</span>
                {errorP && (
                  <span className="error_tag">
                    Please enter numeric value only
                  </span>
                )}
              </label>
              {props.PlaProCTC.map((x, i) => {
                return (
                  <div className="box">
                    <input
                      type="text"
                      className="ml10"
                      name="Profile"
                      value={x.Profile}
                      placeholder="Profile"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <input
                      type="text"
                      className="ml11"
                      name="CTC"
                      placeholder={
                        props.type === "Internship"
                          ? "Stipend per month"
                          : "CTC"
                      }
                      value={x.CTC}
                      onChange={(e) => {
                        var valueP = e.target.value;

                        if (
                          valueP === null ||
                          valueP === "" ||
                          isFloat(valueP) ||
                          isInt(valueP)
                        ) {
                          handleInputChange(e, i);
                          seterrorP(false);
                        } else {
                          seterrorP(true);
                        }
                      }}
                    />
                    <div className="btn-box">
                      {props.PlaProCTC.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <CloseRoundedIcon />
                        </button>
                      )}
                      {props.PlaProCTC.length - 1 === i && (
                        <button className="mr10" onClick={handleAddClick}>
                          <AddRoundedIcon />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          )}

          <label for="batch">Batch</label>
          <select
            onChange={props.type === "Internship" ? batchIN : batchPla}
            className="Form_batch"
            id="batch"
          >
            <option defaultValue value={batchArray[1]}>
              {batchArray[1]}
            </option>
            <option value={batchArray[0]}>{batchArray[0]}</option>
            <option value={batchArray[2]}>{batchArray[2]}</option>
          </select>
          <br />
          <br />

          <label for="offers">No. of Offers</label>
          <input
            id="offers"
            type="text"
            onChange={props.type === "Internship" ? offerIN : offerPla}
          ></input>
          <br />
          <br />

          {props.type === "Internship" ? (
            <React.Fragment>
              <label className="Form_dateLabel" for="date">
                Internship Date <span id="Form_date">(Tentative)</span>
              </label>

              <input
                onChange={(e) => props.setInterStartDate(e.target.value)}
                id="date"
                type="date"
                required
                placeholder="Start Date"
              />
              <input
                onChange={(e) => props.setInterEndDate(e.target.value)}
                id="date"
                type="date"
                required
                placeholder="End Date"
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label for="month">Month of visit</label>
              <select
                id="month"
                onChange={(e) => props.setPlaMonth(e.target.value)}
              >
                <option defaultValue value="default" hidden>
                  Select Month
                </option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>

              <br />
              <br />

              <label for="status">Placement Status</label>
              <select
                id="status"
                onChange={(e) => props.setPlaStatus(e.target.value)}
              >
                <option defaultValue value="default" hidden>
                  Select Status
                </option>
                <option value="0">0 - Visited for current year</option>
                <option value="1">
                  1 – {props.pay}L fixed+fresher recruitment policy in place &
                  Hot for current year
                </option>
                <option value="2">
                  2 - {props.pay}L fixed+fresher recruitment policy in place &
                  for next year
                </option>
                <option value="3">
                  3 - {props.pay}L fixed /no fresher recruitment policy / hot
                  for current year
                </option>
                <option value="4">
                  4 - {props.pay}L fixed /no fresher recruitment policy / for
                  next year
                </option>
                <option value="5">
                  5 - not meeting criteria but for tail enders
                </option>
              </select>
            </React.Fragment>
          )}
          <br />
          <br />

          <label className="Form_remark" for="remark">
            Remark
          </label>
          <textarea
            onChange={props.type === "Internship" ? RemarkIN : RemarkPla}
            id="remark"
            rows="5"
          />

          <br />
          <br />
          <br />

          {props.type === "Internship" ? (
            <React.Fragment>
              <h4 className="Form_PPO">PPO</h4>

              <label for="ppo_offered">PPOs Offered</label>
              <input
                onChange={(e) => props.setInterOffers_PPO(e.target.value)}
                id="ppo_offered"
                type="text"
              />
              <br />
              <br />

              <label>
                Profile - CTC <span className="label_tag ">(in Lakh)</span>
                {errorIN && (
                  <span className="error_tag">
                    Please enter numeric value only
                  </span>
                )}
              </label>
              {props.InterProCTC_PPO.map((x, i) => {
                return (
                  <div className="box">
                    <input
                      type="text"
                      className="ml10"
                      name="Profile"
                      value={x.Profile_In}
                      placeholder="Profile"
                      onChange={(e) => handleInputChange_IN(e, i)}
                    />
                    <input
                      type="text"
                      className="ml11"
                      name="CTC"
                      placeholder="CTC"
                      value={x.CTC_In}
                      onChange={(e) => {
                        var valueIN = e.target.value;
                        if (
                          valueIN === null ||
                          valueIN === "" ||
                          isFloat(valueIN) ||
                          isInt(valueIN)
                        ) {
                          handleInputChange_IN(e, i);
                          seterrorIN(false);
                        } else {
                          seterrorIN(true);
                        }
                      }}
                    />
                    <div className="btn-box">
                      {props.InterProCTC_PPO.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick_IN(i)}
                        >
                          <CloseRoundedIcon />
                        </button>
                      )}
                      {props.InterProCTC_PPO.length - 1 === i && (
                        <button className="mr10" onClick={handleAddClick_IN}>
                          <AddRoundedIcon />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <br />
              <br />
              <br />

              <br />
            </React.Fragment>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Form;
