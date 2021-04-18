import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import Navbar from "../../UI/Navbar";
import Footer from "../../UI/Footer";
import HiringIcon from "../../../images/hiring4.png";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import Select from "react-select";
import FormUpdate from "./FormUpdate";
import "./HiringUpdate.css";
function HiringUpdate(props) {
  const [data, setData] = useState(props.location.state.showModalData);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided) => ({
      ...provided,
      margin: " auto 30px",
      border: "1.75px solid #00aded",
      padding: "2px 150px 2px 50px",
      borderRadius: "30px",
      backgroundColor: "#b3f5ca",
    }),
  };

  const [companyOptionsUp, setCompanyOptionsUp] = useState([
    { label: props.location.state.companyView, value: 1 },
  ]);
  const [companyView, setCompanyView] = useState("");
  const companySelectView = (e) => {
    // console.log(e.label);
    if (e == null) {
      setCompanyView("");
    } else {
      setCompanyView(e.label);
    }
  };

  const submit_update = () => {
    console.log(data);
  };
  useEffect(() => {
    console.log("2", data);
    var sd = data.stream_data.length;
    var sii = data.stream_id_in.length;
    var sip = data.stream_id_pla.length;
    for (var w = 0; w < sd; w++) {
      for (var o = 0; o < sii; o++) {
        if (data.stream_id_in[o] === data.stream_data[w].value) {
          console.log("1.2", data.stream_data[w].label);
          data.stream_data_in[w].forcheck = true;
        } else {
          data.stream_data_in[w].forcheck = false;
        }
      }
    }
    console.log("NEW 1", data.stream_data_in);

    for (var q = 0; q < sd; q++) {
      for (var a = 0; a < sip; a++) {
        if (data.stream_id_pla[a] === data.stream_data[q].value) {
          console.log("1.3", data.stream_data[q].label);

          data.stream_data_pla[q].forcheck = true;
        } else {
          data.stream_data_pla[q].forcheck = false;
        }
      }
    }
    console.log("NEW 2", data.stream_data_pla);
  }, []);
  //-----------------------------------------
  //setSelected({ ...selected, label: t });
  //-----------------------------------------
  return (
    <Container component="main" maxWidth={false} className="hiringUpdate">
      <Navbar Icon={HiringIcon} name="Hiring Info" />
      <Container
        maxWidth={false}
        disableGutters={true}
        className="hiringUpdate_main"
      >
        <Container maxWidth={false} className="hiringUpdate_select">
          <div className="hiringUpdate_selectLeft">
            <ArrowBackIosRoundedIcon className="hiringUpdate_selectBack" />
            <Select
              options={setCompanyOptionsUp}
              onChange={companySelectView}
              defaultValue={companyOptionsUp[0]}
              styles={customStyles}
              isDisabled={true}
              components={{
                IndicatorsContainer: () => null,
              }}
            />
          </div>
          <div className="hiringUpdate_selectRight">
            <Button
              variant="contained"
              type="submit"
              className="hiringUpdate_save"
              onClick={submit_update}
            >
              Save
            </Button>
          </div>
        </Container>
        <Container maxWidth={false} className="hiringUpdate_mainElement">
          <FormUpdate
            className="hiringUpdate_form"
            type="Placement"
            data={props.location.state.showModalData}
            setData={setData}
          />
          <FormUpdate
            className="hiringUpdate_form"
            type="Internship"
            data={props.location.state.showModalData}
            setData={setData}
          />
        </Container>
      </Container>
      <Footer />
    </Container>
  );
}

export default HiringUpdate;
