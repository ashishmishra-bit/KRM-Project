import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import "./FormUpdate.css";
function FormUpdate({ type, data, setData }) {
  //console.log(data.stream_data);
  const [batchArray, setBatchArray] = useState([]);
  const [errorP, seterrorP] = useState(false);
  const [errorI, seterrorI] = useState(false);
  const [errorIN, seterrorIN] = useState(false);
  const [stream_Inter, setStream_Inter] = useState(data.stream_data);

  const [stream_Pla, setStream_Pla] = useState(data.stream_data);

  useEffect(() => {
    console.log("1");
    var today = new Date();
    //var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    if (mm >= "05") {
      setBatchArray([yyyy, yyyy + 1, yyyy + 2]);
    } else {
      setBatchArray([yyyy - 1, yyyy, yyyy + 1]);
    }

    stream_Pla.map((x) => {
      x.isChecked = false;
    });
    stream_Inter.map((x) => {
      x.isChecked = false;
    });

    var sii = data.stream_id_in.length;
    var sip = data.stream_id_pla.length;
    var sd = data.stream_data.length;
    for (var i = 0; i < sii; i++) {
      for (var j = 0; j < sd; j++) {
        if (stream_Inter[j].value === data.stream_id_in[i]) {
          stream_Inter[j].isChecked = true;
        }
      }
    }
    for (var i = 0; i < sip; i++) {
      for (var j = 0; j < sd; j++) {
        if (stream_Pla[j].value === data.stream_id_pla[i]) {
          stream_Pla[j].isChecked = true;
        }
      }
    }
  }, []);

  const streamInterSelectFunction = (e) => {
    const list = [...stream_Inter];

    if (e.target.value === "All" && e.target.checked) {
      let save = [];
      list.map((li) => {
        // eslint-disable-next-line no-lone-blocks
        {
          li.isChecked = true;
        }
      });
      list.map((li) => {
        if (li.isChecked === true) {
          save = [...save, li.value];
        }
      });
      //console.log(save);
      setData({ ...data, stream_id_in: save });
    } else if (e.target.value === "All" && !e.target.checked) {
      let save = [];
      // eslint-disable-next-line array-callback-return
      list.map((li) => {
        // eslint-disable-next-line no-lone-blocks
        {
          li.isChecked = false;
        }
      });
      list.map((li) => {
        if (li.isChecked === true) {
          save = [...save, li.value];
        }
      });
      //console.log(save);
      setData({ ...data, stream_id_in: save });
    } else {
      let save = [];
      list.map((li) => {
        if (li.value == e.target.value) {
          {
            li.isChecked = !li.isChecked;
          }
        }
      });
      setStream_Inter(list);
      list.map((li) => {
        if (li.isChecked === true) {
          save = [...save, li.value];
        }
      });
      //console.log(save);
      setData({ ...data, stream_id_in: save });
    }
    //console.log(list)
  };
  const streamPlaSelectFunction = (e) => {
    const list = [...stream_Pla];
    if (e.target.value === "All" && e.target.checked) {
      //console.log("select all");
      let save = [];

      list.map((li) => {
        {
          li.isChecked = true;
        }
      });
      list.map((li) => {
        if (li.isChecked === true) {
          save = [...save, li.value];
        }
      });
      //console.log(save);
      setData({ ...data, stream_id_pla: save });
    } else if (e.target.value === "All" && !e.target.checked) {
      let save = [];

      //console.log("deselect all");
      // eslint-disable-next-line array-callback-return
      list.map((li) => {
        // eslint-disable-next-line no-lone-blocks
        {
          li.isChecked = false;
        }
      });
      list.map((li) => {
        if (li.isChecked === true) {
          save = [...save, li.value];
        }
      });
      //console.log(save);
      setData({ ...data, stream_id_pla: save });
    } else {
      let save = [];

      // console.log(e.target.value);
      list.map((li) => {
        if (li.value == e.target.value) {
          //console.log("1", li.isChecked);
          li.isChecked = !li.isChecked;
        }
      });
      setStream_Pla(list);
      //console.log(props.streamPla);
      list.map((li) => {
        if (li.isChecked === true) {
          save = [...save, li.value];
        }
      });
      //console.log(save);
      setData({ ...data, stream_id_pla: save });
      //console.log(props.streamPlaSelected);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...data.profile_ctc_li];
    list[index][name] = value;
    setData({ ...data, profile_ctc_li: list });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...data.profile_ctc_li];
    list.splice(index, 1);
    setData({ ...data, profile_ctc_li: list });
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setData({
      ...data,
      profile_ctc_li: [...data.profile_ctc_li, { Profile: "", CTC: "" }],
    });
  };

  //Internship 1
  const handleInputChange_I = (e, index) => {
    const { name, value } = e.target;
    const list = [...data.intern_profile_ctc_li];
    list[index][name] = value;
    setData({ ...data, intern_profile_ctc_li: list });
  };

  // handle click event of the Remove button
  const handleRemoveClick_I = (index) => {
    const list = [...data.intern_profile_ctc_li];
    list.splice(index, 1);
    setData({ ...data, intern_profile_ctc_li: list });
  };

  // handle click event of the Add button
  const handleAddClick_I = () => {
    setData({
      ...data,
      intern_profile_ctc_li: [
        ...data.intern_profile_ctc_li,
        { Profile: "", CTC: "" },
      ],
    });
  };

  // Internship ka alg
  const handleInputChange_IN = (e, index) => {
    const { name, value } = e.target;
    const list = [...data.ppo_profile_ctc_li];
    list[index][name] = value;
    setData({ ...data, ppo_profile_ctc_li: list });
  };

  // handle click event of the Remove button
  const handleRemoveClick_IN = (index) => {
    const list = [...data.ppo_profile_ctc_li];
    list.splice(index, 1);
    setData({ ...data, ppo_profile_ctc_li: list });
  };

  // handle click event of the Add button
  const handleAddClick_IN = () => {
    setData({
      ...data,
      ppo_profile_ctc_li: [
        ...data.ppo_profile_ctc_li,
        { Profile: "", CTC: "" },
      ],
    });
  };

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
    return parseFloat(vi) === intVal && !isNaN(intVal);
  };

  return (
    <Container disableGutters={true} maxWidth="md" className="FormUpdate">
      <div className="FormUpdate_heading">
        <h3>{type} Details</h3>
      </div>

      <div className="FormUpdate_material">
        <div className="FormUpdate_materialStream">
          <p>
            Stream <span className="Form_required">*</span>
          </p>

          {type === "Internship" ? (
            <React.Fragment>
              <label className="FormUpdate_stream">
                <input
                  onChange={streamInterSelectFunction}
                  value="All"
                  type="checkbox"
                />
                All
              </label>

              {stream_Inter.map((streamOptionIN) => {
                return (
                  <label className="FormUpdate_stream">
                    <input
                      checked={streamOptionIN.isChecked}
                      onChange={streamInterSelectFunction}
                      value={streamOptionIN.value}
                      type="checkbox"
                    />
                    {streamOptionIN.label}
                  </label>
                );
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label className="FormUpdate_stream">
                <input
                  onChange={streamPlaSelectFunction}
                  value="All"
                  type="checkbox"
                />
                All
              </label>

              {stream_Pla.map((streamOption) => {
                return (
                  <label className="FormUpdate_stream">
                    <input
                      checked={streamOption.isChecked}
                      onChange={streamPlaSelectFunction}
                      value={streamOption.value}
                      type="checkbox"
                    />
                    {streamOption.label}
                  </label>
                );
              })}
            </React.Fragment>
          )}
        </div>
        <div className="FormUpdate_materialMain">
          {type === "Internship" ? (
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
              {data.intern_profile_ctc_li.map((x, i) => {
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
                        type === "Internship" ? "Stipend per month" : "CTC"
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
                      {data.intern_profile_ctc_li.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick_I(i)}
                        >
                          <CloseRoundedIcon />
                        </button>
                      )}
                      {data.intern_profile_ctc_li.length - 1 === i && (
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
              <label id="Form_labelCTC" for="Form_proCTC">
                Profile - CTC<span className="label_tag">(in Lakh)</span>
                {errorP && (
                  <span className="error_tag">
                    Please enter numeric value only
                  </span>
                )}
              </label>
              {data.profile_ctc_li.map((x, i) => {
                return (
                  <div className="box">
                    <input
                      type="text"
                      className="ml10"
                      name="Profile"
                      value={x.Profile}
                      defaultValue={x.Profile}
                      placeholder="Profile"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <input
                      type="text"
                      className="ml11"
                      name="CTC"
                      defaultValue={x.CTC}
                      placeholder={
                        type === "Internship" ? "Stipend per month" : "CTC"
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
                      {data.profile_ctc_li.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <CloseRoundedIcon />
                        </button>
                      )}
                      {data.profile_ctc_li.length - 1 === i && (
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
            onChange={(e) =>
              type === "Internship"
                ? setData({ ...data, intern_batch: e.target.value })
                : setData({ ...data, batch: e.target.value })
            }
            className="Form_batch"
            id="batch"
            defaultValue={
              type === "Internship" ? data.intern_batch : data.batch
            }
          >
            <option value={batchArray[1]}>{batchArray[1]}</option>
            <option value={batchArray[0]}>{batchArray[0]}</option>
            <option value={batchArray[2]}>{batchArray[2]}</option>
          </select>
          <br />
          <br />

          <label for="offers">No. of Offers</label>
          <input
            defaultValue={
              type === "Internship" ? data.intern_offers : data.offers
            }
            id="offers"
            type="text"
            onChange={(e) =>
              type === "Internship"
                ? setData({ ...data, intern_offers: e.target.value })
                : setData({ ...data, offers: e.target.value })
            }
          ></input>
          <br />
          <br />

          {type === "Internship" ? (
            <React.Fragment>
              <label className="Form_dateLabel" for="date">
                Internship Date <span id="Form_date">(Tentative)</span>
              </label>

              <input
                onChange={(e) =>
                  setData({ ...data, start_date: e.target.value })
                }
                id="date"
                type="date"
                required
                value={data.start_date}
                placeholder={data.start_date}
              />
              <input
                defaultValue={data.end_date}
                onChange={(e) => setData({ ...data, end_date: e.target.value })}
                id="date"
                type="date"
                required
                placeholder={data.end_date}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label for="month">Month of visit</label>
              <select
                id="month"
                onChange={(e) =>
                  setData({ ...data, visit_month: e.target.value })
                }
                defaultValue={data.visit_month}
              >
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
                onChange={(e) =>
                  setData({ ...data, placement_status_id: e.target.value })
                }
                defaultValue={data.placement_status_id}
              >
                <option value="0">0 - Visited for current year</option>
                <option value="1">
                  1 – {data.pay}L fixed+fresher recruitment policy in place &
                  Hot for current year
                </option>
                <option value="2">
                  2 - {data.pay}L fixed+fresher recruitment policy in place &
                  for next year
                </option>
                <option value="3">
                  3 - {data.pay}L fixed /no fresher recruitment policy / hot for
                  current year
                </option>
                <option value="4">
                  4 - {data.pay}L fixed /no fresher recruitment policy / for
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
            defaultValue={
              type === "Internship" ? data.intern_remark : data.remarks
            }
            onChange={(e) =>
              type === "Internship"
                ? setData({ ...data, intern_remark: e.target.value })
                : setData({ ...data, remarks: e.target.value })
            }
            id="remark"
            rows="5"
            cols="100"
          />

          <br />
          <br />
          <br />

          {type === "Internship" ? (
            <React.Fragment>
              <h4 className="Form_PPO">PPO</h4>

              <label for="ppo_offered">PPOs Offered</label>
              <input
                defaultValue={data.ppo_offered}
                onChange={(e) =>
                  setData({ ...data, ppo_offered: e.target.value })
                }
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
              {data.ppo_profile_ctc_li.map((x, i) => {
                return (
                  <div className="box">
                    <input
                      type="text"
                      className="ml10"
                      name="Profile"
                      value={x.Profile_In}
                      defaultValue={x.Profile}
                      placeholder="Profile"
                      onChange={(e) => handleInputChange_IN(e, i)}
                    />
                    <input
                      type="text"
                      className="ml11"
                      name="CTC"
                      placeholder="CTC"
                      value={x.CTC_In}
                      defaultValue={x.CTC}
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
                      {data.ppo_profile_ctc_li.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick_IN(i)}
                        >
                          <CloseRoundedIcon />
                        </button>
                      )}
                      {data.ppo_profile_ctc_li.length - 1 === i && (
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

export default FormUpdate;
