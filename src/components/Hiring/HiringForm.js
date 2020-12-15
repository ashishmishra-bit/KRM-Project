import React, { useState, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import "./HiringForm.css";
import Select from "react-select";

import HiringIcon from "../../images/hiring4.png";
import Form from "./Form";

function HiringForm() {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided) => ({
      ...provided,
      margin: " auto 30px",
      border: "1.75px solid #00aded",

      padding: "2px 50px",

      borderRadius: "30px",
    }),
  };

  const [PlaProCTC, setPlaProCTC] = useState([{ Profile: "", CTC: "" }]);
  const [InterProCTC, setInterProCTC] = useState([{ Profile: "", CTC: "" }]);
  const [InterProCTC_PPO, setInterProCTC_PPO] = useState([
    { Profile: "", CTC: "" },
  ]);

  const [PlaBatch, setPlaBatch] = useState("");
  const [InterBatch, setInterBatch] = useState("");

  const [PlaOffers, setPlaOffers] = useState("");
  const [InterOffers, setInterOffers] = useState("");
  const [InterOffers_PPO, setInterOffers_PPO] = useState("");

  const [PlaMonth, setPlaMonth] = useState("");
  const [PlaStatus, setPlaStatus] = useState("");

  const [InterStartDate, setInterStartDate] = useState("");
  const [InterEndDate, setInterEndDate] = useState("");

  const [PlaRemark, setPlaRemark] = useState("");
  const [InterRemark, setInterRemark] = useState("");

  const [companyOptions, setCompanyOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);

  const [company, setCompany] = useState("");
  const [school, setSchool] = useState("");
  const [streamPla, setStreamPla] = useState([]);
  const [streamInter, setStreamInter] = useState([]);

  const [streamPlaSelected, setStreamPlaSelected] = useState([]);
  const [streamInterSelected, setStreamInterSelected] = useState([]);

  const submit = () => {
    console.log(company);
    console.log(school);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/comp`)
      .then((res) => {
        console.log("Company", res);
        res.data.map((d) => {
          setCompanyOptions((prevOption) => [
            ...prevOption,
            { value: d.id, label: d.comp },
          ]);
        });
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://127.0.0.1:8000/school`)
      .then((res) => {
        console.log("School", res);
        res.data.map((d) => {
          setSchoolOptions((prevOption) => [
            ...prevOption,
            { value: d.id, label: d.school },
          ]);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const companySelect = (e) => {
    // console.log(e.label);

    setCompany(e.label);
  };

  const schoolSelect = async (e) => {
    //console.log(company);
    console.log(e.label);
    await setSchool(e.label);
    console.log("School selected", school);
    getStream();
  };
  const getStream = () => {
    console.log("School selected-1-", school);

    axios
      .get(`http://127.0.0.1:8000/stream/${school.name}`)
      .then((res) => {
        console.log("School selected-2-", school);
        console.log("stream", res);
      })
      .catch((err) => console.log(err));
    console.log("School selected-3-", school);
  };
  return (
    <Container component="main" maxWidth={false} className="hiringform">
      <Navbar Icon={HiringIcon} name="Hiring Info" />
      <Container maxWidth={false} className="hiringform_select">
        <ArrowBackIosRoundedIcon className="hiringform_selectBack" />

        <Select
          options={companyOptions}
          onChange={companySelect}
          styles={customStyles}
          placeholder="Select your company"
          isSearchable={true}
          isClearable={true}
        />
        <Select
          options={schoolOptions}
          onChange={schoolSelect}
          styles={customStyles}
          placeholder="Select your School"
          isSearchable={true}
          isClearable={true}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={submit}
          className="hiringform_save"
        >
          Save
        </Button>
      </Container>
      <Container
        disableGutters={true}
        maxWidth={false}
        className="hiringform_element"
      >
        <Form
          type="Placement"
          className="hiringform_form"
          PlaProCTC={PlaProCTC}
          setPlaProCTC={setPlaProCTC}
          PlaBatch={PlaBatch}
          setPlaBatch={setPlaBatch}
          PlaOffers={PlaOffers}
          setPlaOffers={setPlaOffers}
          PlaMonth={PlaMonth}
          setPlaMonth={setPlaMonth}
          pay="3"
          PlaStatus={PlaStatus}
          setPlaStatus={setPlaStatus}
          PlaRemark={PlaRemark}
          setPlaRemark={setPlaRemark}
          streamPla={streamPla}
          setStreamPla={setStreamPla}
          streamPlaSelected={streamPlaSelected}
          setStreamPlaSelected={setStreamPlaSelected}
        />
        <Form
          type="Internship"
          className="hiringform_form"
          InterProCTC={InterProCTC}
          setInterProCTC={setInterProCTC}
          InterProCTC_PPO={InterProCTC_PPO}
          setInterProCTC_PPO={setInterProCTC_PPO}
          InterBatch={InterBatch}
          setInterBatch={setInterBatch}
          InterOffers={InterOffers}
          setInterOffers={setInterOffers}
          InterStartDate={InterStartDate}
          setInterStartDate={setInterStartDate}
          InterEndDate={InterEndDate}
          setInterEndDate={setInterEndDate}
          InterOffers_PPO={InterOffers_PPO}
          setInterOffers_PPO={setInterOffers_PPO}
          InterRemark={InterRemark}
          setInterRemark={setInterRemark}
          streamInter={streamInter}
          setStreamInter={setStreamInter}
          streamInterSelected={streamInterSelected}
          setStreamInterSelected={setStreamInterSelected}
        />
      </Container>

      <Footer />
    </Container>
  );
}

export default HiringForm;
