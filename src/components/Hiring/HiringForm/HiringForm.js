import React, { useState, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import Navbar from "../../UI/Navbar";
import Footer from "../../UI/Footer";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import "./HiringForm.css";
import Select from "react-select";
import HiringIcon from "../../../images/hiring4.png";
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

  const [PlaBatch, setPlaBatch] = useState();
  const [InterBatch, setInterBatch] = useState();

  const [PlaOffers, setPlaOffers] = useState();
  const [InterOffers, setInterOffers] = useState();
  const [InterOffers_PPO, setInterOffers_PPO] = useState();

  const [PlaMonth, setPlaMonth] = useState("");
  const [PlaStatus, setPlaStatus] = useState();
  const [pay, setPay] = useState("");
  const [InterStartDate, setInterStartDate] = useState("");
  const [InterEndDate, setInterEndDate] = useState("");

  const [PlaRemark, setPlaRemark] = useState("");
  const [InterRemark, setInterRemark] = useState("");

  const [companyOptions, setCompanyOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);

  const [company, setCompany] = useState();
  const [school, setSchool] = useState();
  const [streamPla, setStreamPla] = useState([]);
  const [streamInter, setStreamInter] = useState([]);

  const [streamPlaSelected, setStreamPlaSelected] = useState([]);
  const [streamInterSelected, setStreamInterSelected] = useState([]);

  const submit = () => {
    let plaPC = [];
    PlaProCTC.map((d) => {
      //console.log(`${d.Profile}-${d.CTC}`);
      plaPC.push(`${d.Profile}-${d.CTC}`);
    });
    let InterPC = [];
    InterProCTC.map((d) => {
      //console.log(`${d.Profile}-${d.CTC}`);
      InterPC.push(`${d.Profile}-${d.CTC}`);
    });
    let I_PlaPC = [];
    InterProCTC_PPO.map((d) => {
      //console.log(`${d.Profile}-${d.CTC}`);
      I_PlaPC.push(`${d.Profile}-${d.CTC}`);
    });

    axios
      .post(
        `http://127.0.0.1:8000/hiring/placement_details/`,
        {
          comp_id: company,
          school_id: school,
          profile_ctc: plaPC,
          batch: PlaBatch,
          month: PlaMonth,
          offers: PlaOffers,
          remark: PlaRemark,
          stream_id: streamPlaSelected,
          placement_status_id: PlaStatus,
        },
        {
          headers: {
            Authorization:
              "Token d5d6da08036044f0c7484edcd9cf70adb772ccd91223d8fa1c9bacb7baf1229f",
          },
        }
      )
      .then((res) => {
        console.log("Succ");
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(
        `http://127.0.0.1:8000/hiring/internship_details/`,
        {
          school_id: school,
          stream_id: streamInterSelected,
          intern_profile_ctc: InterPC,
          intern_batch: InterBatch,
          start_date: InterStartDate,
          end_date: InterEndDate,
          ppo_offered: InterOffers_PPO,
          comp_id: company,
          intern_offers: InterOffers,
          intern_remark: InterRemark,
          ppo_profile_ctc: I_PlaPC,
        },
        {
          headers: {
            Authorization:
              "Token d5d6da08036044f0c7484edcd9cf70adb772ccd91223d8fa1c9bacb7baf1229f",
          },
        }
      )
      .then((res) => {
        console.log("Succ");
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(company);
    // console.log(school);
    // console.log("Placement Info");
    // console.log(streamPlaSelected);
    // console.log(plaPC);
    // console.log(PlaBatch);
    // console.log(PlaOffers);
    // console.log(PlaMonth);
    console.log(PlaStatus);
    // console.log(PlaRemark);
    // console.log("Internship Info");
    // console.log(streamInterSelected);
    // console.log(InterPC);
    // console.log(InterBatch);
    // console.log(InterOffers);
    // console.log(InterStartDate);
    // console.log(InterEndDate);
    // console.log(InterRemark);
    // console.log(InterOffers_PPO);
    // console.log(I_PlaPC);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/hiring/assigncompany/", {
        headers: {
          Authorization:
            "Token d5d6da08036044f0c7484edcd9cf70adb772ccd91223d8fa1c9bacb7baf1229f",
        },
      })
      .then((res) => {
        console.log(res.data);
        res.data.response.map((d) => {
          setCompanyOptions((prevOption) => [
            ...prevOption,
            { value: d.comp_id, label: d.company_name },
          ]);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://127.0.0.1:8000/hiring/schools/`)
      .then((res) => {
        //console.log("School", res);
        res.data.response.map((d) => {
          setSchoolOptions((prevOption) => [
            ...prevOption,
            { value: d.school_id, label: d.school_name },
          ]);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const companySelect = (e) => {
    // console.log(e.label);
    if (e != null) {
      setCompany(e.value);
    }
    //console.log(company);
  };

  const schoolSelect = (e) => {
    //console.log("School selected", school);

    if (e != null) {
      //console.log("axios", e);
      setSchool(e.value);
      axios
        .get(`http://127.0.0.1:8000/hiring/streams/?school_id=${e.value}`)
        .then((res) => {
          //console.log("stream", res.data);
          res.data.response.map((d) => {
            //console.log(d);
            setStreamPla((prevOption) => [
              ...prevOption,
              { value: d.stream_id, label: d.stream_name, isChecked: false },
            ]);
            setStreamInter((prevOption) => [
              ...prevOption,
              { value: d.stream_id, label: d.stream_name, isChecked: false },
            ]);
          });
        })
        .catch((err) => console.log(err));
      axios
        .get(
          ` http://127.0.0.1:8000/hiring/placement_status/?school_id=${e.value}`
        )
        .then((res) => {
          //console.log(res.data.response[0].status);
          setPay(res.data.response[0].status);
        })
        .catch((err) => console.log(err));
    } else {
      setPay(0);
      setStreamPla([]);
      setStreamInter([]);
    }
  };

  return (
    <Container component="main" maxWidth={false} className="hiringform">
      <Navbar Icon={HiringIcon} name="Hiring Info" />
      <Container maxWidth={false} className="hiringform_select">
        <Container maxWidth={false} className="hiringform_selectLeft">
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
        </Container>
        <Container maxWidth={false} className="hiringform_selectRight">
          <Button
            variant="contained"
            type="submit"
            onClick={submit}
            className="hiringform_save"
          >
            Save
          </Button>
        </Container>
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
          pay={pay}
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
