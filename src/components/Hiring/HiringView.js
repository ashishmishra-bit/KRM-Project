import React, { useState } from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { Container } from "@material-ui/core";
import HiringIcon from "../../images/hiring4.png";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Select from "react-select";

import "./HiringView.css";
function HiringView() {
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
  const [companyOptionsView, setCompanyOptionsView] = useState([]);
  const [companyView, setCompanyView] = useState("");
  const companySelectView = (e) => {
    // console.log(e.label);

    setCompanyView(e.label);
  };

  return (
    <Container component="main" maxWidth={false} className="hiringview">
      <Navbar Icon={HiringIcon} name="Hiring Info" />

      <Container
        maxWidth={false}
        disableGutters={true}
        className="hiringview_main"
      >
        <Container maxWidth={false} className="hiringview_mainSelect">
          <div className="hiringview_selectLeft">
            <ArrowBackIosRoundedIcon className="hiringview_selectBack" />
            <Select
              options={companyOptionsView}
              onChange={companySelectView}
              styles={customStyles}
              placeholder="Select your company"
              isSearchable={true}
              isClearable={true}
            />
          </div>
          <div className="hiringview_selectRight">
            <VisibilityIcon className="hiringview_rightIcon" />
            <CreateIcon className="hiringview_rightIcon" />
          </div>
        </Container>
        <Container
          disableGutters={true}
          maxWidth={false}
          className="hiringview_mainTable"
        ></Container>
      </Container>
      <Footer />
    </Container>
  );
}

export default HiringView;
