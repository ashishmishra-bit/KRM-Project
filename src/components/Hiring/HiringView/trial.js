import React, { useState, useEffect } from "react";
import Navbar from "../../UI/Navbar";
import Footer from "../../UI/Footer";
import { Container, Modal } from "@material-ui/core";
import HiringIcon from "../../../images/hiring4.png";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import CreateIcon from "@material-ui/icons/Create";
import { Button } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Select from "react-select";
import Table from "./Table";
import "./HiringView.css";
import { Link } from "react-router-dom";

import ModalData from "./ModalData";

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
  const columns = React.useMemo(
    () => [
      {
        Header: "School",
        accessor: "school_name",
      },
      {
        Header: "Placement",
        columns: [
          { Header: "Profile-CTC", accessor: "profile_ctc" },
          { Header: "No. of Offers", accessor: "offers" },
          {
            Header: "Month of Visit",
            accessor: "month",
          },
          {
            Header: "Placement Status",
            accessor: "placement_status_statement",
          },
        ],
      },
      {
        Header: "Internship",
        columns: [
          {
            Header: "Profile-Stipend",
            accessor: "intern_profile_ctc",
          },
          { Header: "No. of Offers", accessor: "intern_offers" },
        ],
      },
      {
        Header: "Batch",
        accessor: "batch",
      },
    ],
    []
  );
  const [showModalData, setShowModalData] = useState({});
  const [data, setData] = React.useState([]);

  const [companyOptionsView, setCompanyOptionsView] = useState([]);
  const [companyView, setCompanyView] = useState();
  const [Plaschool, setPlaSchool] = useState([]);
  const [viewPla, setViewPla] = useState();

  const [checked, setchecked] = useState();
  const [open, setOpen] = useState(false);

  const companySelectView = async (e) => {
    if (e != null) {
      var compdata = await getcompdata(e.value);
      var indata = await getindata(e.value);

      var detail = [];
      var x = compdata.length;
      var y = indata.length;
      //console.log(x)
      //console.log(y)
      for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
          //console.log(compdata[i])
          //console.log(indata[j].internship_info_id)
          if (compdata[i].placement_info_id === indata[j].internship_info_id) {
            detail = [
              ...detail,
              {
                id: compdata[i].placement_info_id,
                ...compdata[i],
                ...indata[j],
              },
            ];
            break;
          }
        }
      }
      setData(detail);
      //console.log(detail)
    }
  };

  const getindata = (p) => {
    return new Promise(function (resolve, reject) {
      var id = [];
      axios
        .get(`http://127.0.0.1:8000/hiring/internships/?comp_id=${p}`, {
          headers: {
            Authorization:
              "Token 2c8801d925a8e8d205ac6c6b02a1050eca7e44c89a020ab6aa609730028a6f92",
          },
        })
        .then((res) => {
          //console.log(compdata);
          id = res.data.response;
          resolve(id);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const getcompdata = (p) => {
    return new Promise(function (resolve, reject) {
      var cd = [];
      var Pla = 0;
      axios
        .get(`http://127.0.0.1:8000/hiring/placements/?comp_id=${p}`, {
          headers: {
            Authorization:
              "Token 2c8801d925a8e8d205ac6c6b02a1050eca7e44c89a020ab6aa609730028a6f92",
          },
        })
        .then((res) => {
          //console.log(res.data.response);
          //compdata = res.data.response;
          //console.log(compdata);
          res.data.response.map((r) => {
            Plaschool.map((i) => {
              if (i.label == r.school_name) {
                //console.log(i.value)
                //var k=i.label
                getPlaStat(i.value);
                async function getPlaStat(k) {
                  Pla = await getPla(k);
                  setViewPla(Pla);
                  console.log("--", Pla);
                }
              }
            });

            console.log(Pla);
            var placement_status_statement = "";
            if (r.placement_status == "0")
              placement_status_statement = "Visited for current year";
            else if (r.placement_status == "1")
              placement_status_statement = `${Pla}L fixed+fresher recruitment policy in place &
                  Hot for current year`;
            else if (r.placement_status == "2")
              placement_status_statement = `${Pla}L fixed+fresher recruitment policy in place &
                  for next year`;
            else if (r.placement_status == "3")
              placement_status_statement = `${Pla}L fixed /no fresher recruitment policy / hot
                  for current year`;
            else if (r.placement_status == "4")
              placement_status_statement = `${Pla}L fixed /no fresher recruitment policy / for
                  next year`;
            else if (r.placement_status == "5")
              placement_status_statement =
                "not meeting criteria but for tail enders";

            cd = [
              ...cd,
              { placement_status_statement: placement_status_statement, ...r },
            ];
          });

          resolve(cd);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const getPla = (p) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(` http://127.0.0.1:8000/hiring/placement_status/?school_id=${p}`)
        .then((res) => {
          //console.log("PLa",res.data.response[0].status);
          var pla = res.data.response[0].status;
          resolve(pla);
        })
        .catch((err) => reject(err));
    });
  };
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflow: "auto",
      height: "90%",
      display: "block",
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",

      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  useEffect(() => {
    // console.log(props);
    axios
      .get("http://127.0.0.1:8000/hiring/assigncompany/", {
        headers: {
          Authorization:
            "Token 2c8801d925a8e8d205ac6c6b02a1050eca7e44c89a020ab6aa609730028a6f92",
        },
      })
      .then((res) => {
        console.log(res.data);
        res.data.response.map((d) => {
          setCompanyOptionsView((prevOption) => [
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
          setPlaSchool((prevOption) => [
            ...prevOption,
            { value: d.school_id, label: d.school_name },
          ]);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const body = (
    <div style={modalStyle} className={`paper2 ${classes.paper}`}>
      <h2 id="simple-modal-title">{companyView}</h2>
      <p id="simple-modal-description">
        <ModalData
          companyName={companySelectView}
          showModalData={showModalData}
          setOpen={setOpen}
        />
      </p>
    </div>
  );

  const handleClick = (e) => {
    if (showModalData === undefined) e.preventDefault();
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
            <Button onClick={() => setOpen(true)}>
              <VisibilityIcon className="hiringview_rightIcon" />
            </Button>
            <Button>
              <Link
                onClick={handleClick}
                exact
                to={{
                  pathname: "/hiringupdate",
                  state: { showModalData },
                }}
              >
                <CreateIcon className="hiringview_rightIcon" />
              </Link>
            </Button>
          </div>
        </Container>
        <Container
          disableGutters={true}
          maxWidth={false}
          className="hiringview_mainTable"
        >
          <Table
            columns={columns}
            data={data}
            showModalData={showModalData}
            setShowModalData={setShowModalData}
            checked={checked}
            setchecked={setchecked}
          />
        </Container>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Container>
      <Footer />
    </Container>
  );
}

export default HiringView;
