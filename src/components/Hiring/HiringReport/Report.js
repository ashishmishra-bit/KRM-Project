/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Report.css";
import TableReport from "./TableReport";
import Navbar from "../../UI/Navbar";
import Footer from "../../UI/Footer";
import { Container, Button } from "@material-ui/core";
import HiringIcon from "../../../images/hiring4.png";
import axios from "axios";
import Select from "react-select";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

function Report() {
  useEffect(() => {}, []);
  const customStyles1 = {
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
  const customStyles2 = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided) => ({
      ...provided,
      margin: " auto 30px",
      border: "1.5px solid #00aded",
      padding: "2px 30px 2px 2px",
      borderRadius: "30px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "10px 50px",
    }),
  };

  const [companyOptionsReport, setCompanyOptionsReport] = useState([]);
  const [companyReport, setCompanyReport] = useState("");
  const [yearOptionsReport, setYearOptionsReport] = useState([
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
    { value: 2022, label: 2022 },
  ]);
  const [yearReport, setYearReport] = useState("");

  // const [visiting, setVisiting] = useState([
  //   {
  //     PlaStatus: 1,
  //     Company_Name: "ABC Comapny",
  //     Month_of_visit: "May",
  //     School: "School of Engineering",
  //     Profile: "SD",
  //     CTC: 8.9,
  //   },
  //   {
  //     PlaStatus: 2,
  //     Company_Name: "AB Comapny",
  //     Month_of_visit: "June",
  //     School: "School of Engineering",
  //     Profile: "SD1",
  //     CTC: 9.9,
  //   },
  //   {
  //     PlaStatus: 3,
  //     Company_Name: "ABD Comapny",
  //     Month_of_visit: "July",
  //     School: "School of Management",
  //     Profile: "PM",
  //     CTC: 10.9,
  //   },
  // ]);


  const [visiting, setVisiting] = useState();
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/hiring/visiting/?batch=2021",{
//         headers: {
//           Authorization:
//           "Token d5d6da08036044f0c7484edcd9cf70adb772ccd91223d8fa1c9bacb7baf1229f",  
//         },      
//   })
//   .then((res) => {
//     console.log(res)
//     res.data.response.map((d) => {
//       setDataTable((prevOption)=>[
//         ...prevOption,
//         { comp_id: d.comp_id, company_name: d.company_name , school_id: d.school_id, school_name: d.school_name , profile_ctc: d.profile_ctc , month: d.month , placement_info_id: d.placement_info_id },
//       ]);
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }, []);

 

  // const [hotCurrentYear, setHotCurrentYear] = useState([
  //   {
  //     PlaStatus: 1,
  //     Company_Name: "ABE Comapny",
  //     Month_of_visit: "October",
  //     School: "School of Management",
  //     Profile: "PM",
  //     CTC: 8.9,
  //   },
  //   {
  //     PlaStatus: 1,
  //     Company_Name: "ABQ Comapny",
  //     Month_of_visit: "November",
  //     School: "School of Engineering",
  //     Profile: "SD1",
  //     CTC: 9.9,
  //   },
  //   {
  //     PlaStatus: 3,
  //     Company_Name: "ABW Comapny",
  //     Month_of_visit: "August",
  //     School: "School of Management",
  //     Profile: "PM",
  //     CTC: 10.9,
  //   },
  // ]);
  const [hotCurrentYear , setHotCurrentYear] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/hiring/current_hot_visiting/?batch=2021",{
        headers: {
          Authorization:
          "Token d5d6da08036044f0c7484edcd9cf70adb772ccd91223d8fa1c9bacb7baf1229f",  
        },      
  })
  .then((res) => {
    console.log(res)
    res.data.response.map((p) => {
      setDataTable((prevOption)=>[
        ...prevOption,
        { comp_id: p.comp_id, company_name: p.company_name , school_id: p.school_id, school_name: p.school_name , profile_ctc: p.profile_ctc , month: p.month , placement_info_id: p.placement_info_id },
      ]);
    });
  })
  .catch((error) => {
    console.error(error);
  });
}, []);

  const [hotNextYear, setHotNextYear] = useState([
    {
      PlaStatus: 2,
      Company_Name: "ABA Comapny",
      Month_of_visit: "January",
      School: "School of Engineering",
      Profile: "PM",
      CTC: 11.9,
    },
    {
      PlaStatus: 4,
      Company_Name: "ABS Comapny",
      Month_of_visit: "March",
      School: "School of Engineering",
      Profile: "SD1",
      CTC: 10.9,
    },
    {
      PlaStatus: 2,
      Company_Name: "ABD Comapny",
      Month_of_visit: "September",
      School: "School of Engineering",
      Profile: "SD",
      CTC: 9.9,
    },
  ]);

  const [visited, setVisited] = useState([
    {
      PlaStatus: 0,
      Company_Name: "ABZ Comapny",
      Month_of_visit: "October",
      School: "School of Management",
      Profile: "PM",
      CTC: 8.9,
    },
    {
      PlaStatus: 0,
      Company_Name: "ABX Comapny",
      Month_of_visit: "April",
      School: "School of Management",
      Profile: "PM",
      CTC: 9.9,
    },
    {
      PlaStatus: 0,
      Company_Name: "ABY Comapny",
      Month_of_visit: "June",
      School: "School of Management",
      Profile: "PM",
      CTC: 10.9,
    },
  ]);
  const [notVisiting, setNotVisiting] = useState([
    {
      PlaStatus: null,
      Company_Name: "ABJ Comapny",
      Month_of_visit: "October",
      School: "School of Engineering",
      Profile: "SD",
      CTC: 12.9,
    },
    {
      PlaStatus: null,
      Company_Name: "ABK Comapny",
      Month_of_visit: "November",
      School: "School of Engineering",
      Profile: "SD",
      CTC: 13.9,
    },
    {
      PlaStatus: null,
      Company_Name: "ABL Comapny",
      Month_of_visit: "December",
      School: "School of Engineering",
      Profile: "SD",
      CTC: 11.9,
    },
  ]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/hiring/not_visiting/?batch=2021/",{
//         headers: {
//           Authorization:
//           "Token 9b4ef7449077d585570dd67166a7e432dbe4140b51c03d61be67c35bd81040d1",  
//         },      
//   })
//   .then((res) => {
//     console.log(res)
//     res.data.response.map((d) => {
//       setDataTable((prevOption)=>[
//         ...prevOption,
//         { comp_id: d.comp_id, company_name: d.company_name , school_id: d.school_id, school_name: d.school_name , profile_ctc: d.profile_ctc , month: d.month , placement_info_id: d.placement_info_id },
//       ]);
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }, []);

  const [notConfirmed, setNotConfirmed] = useState([
    {
      PlaStatus: 1,
      Company_Name: "ABE Comapny",
      Month_of_visit: "October",
      School: "School of Management",
      Profile: "PM",
      CTC: 8.9,
    },
    {
      PlaStatus: 1,
      Company_Name: "ABQ Comapny",
      Month_of_visit: "November",
      School: "School of Engineering",
      Profile: "SD1",
      CTC: 9.9,
    },
    {
      PlaStatus: 3,
      Company_Name: "ABW Comapny",
      Month_of_visit: "August",
      School: "School of Management",
      Profile: "PM",
      CTC: 10.9,
    },
  ]);
  // const [dataTable, setDataTable] = useState((() => visiting));
  const [dataTable ,setDataTable] = useState([])
  const [dataSetTo, setDataSetTo] = useState("Visiting");


  // const [dataSetTo, setDataSetTo] = useState("HotCurrentYear");

 

//  const company_visiting = (e) => {
//     if(e != null){
//       setVisiting(e.value);
//       axios
//         .get(`http://127.0.0.1:8000/hiring/visiting/?batch=${e.value}`)
//         .then((res) =>{
//           res.data.response.map((d) => {
//             setVisiting((prevOption) => [
//               ...prevOption,
//               { comp_id: d.comp_id, company_name: d.company_name , school_id: d.school_id, school_name: d.school_name , profile_ctc: d.profile_ctc , month: d.month , placement_info_id: d.placement_info_id },
//             ]);
//           })
//         })
//     }else{
//       setVisiting([]);
//     }
//   };


  const companySelectReport = (e) => {
    // console.log(e.label);
    if (e == null) {
      setCompanyReport("");
    } else {
      setCompanyReport(e.label);
    }
  };

  const yearSelectReport = (e) => {
    // console.log(e.label);
    if (e == null) {
      setYearReport("");
    } else {
      setYearReport(e.label);
    }
  };
  const visitngButton = () => {
    setDataSetTo("Visiting");
    setDataTable(visiting);
    console.log("Visiting---");
    console.log(dataSetTo);
    console.log(dataTable);
  };
  const hotCurrentYearButton = () => {
    setDataSetTo("HotCurrentYear");
    setDataTable(hotCurrentYear);
    console.log("HotCurrentYear---");
    console.log(dataSetTo);
    console.log(dataTable);
  };
  const hotNextYearButton = () => {
    setDataSetTo("HotNextYear");
    setDataTable(hotNextYear);
    console.log("HotNextYear---");
    console.log(dataSetTo);
    console.log(dataTable);
  };

  const visitedButton = () => {
    setDataSetTo("Visited");
    setDataTable(visited);
    console.log("Visited---");
    console.log(dataSetTo);
    console.log(dataTable);
  };

  const notVisitngButton = () => {
    setDataSetTo("NotVisiting");
    setDataTable(notVisiting);
    console.log("NotVisiting---");
    console.log(dataSetTo);
    console.log(dataTable);
  };

  const notConfirmedButton = () => {
    setDataSetTo("NotConfirmed");
    setDataTable(notConfirmed);
    console.log("NotConfirmed---");
    console.log(dataSetTo);
    console.log(dataTable);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Company name",
        accessor: "company_name",
      },
      {
        Header: "Month of Visit",
        accessor: "month",
      },
      {
        Header: "School",
        accessor: "school_name",
      },
      // {
      //   Header: "Profile",
      //   accessor: "",
      // },
      {
        Header: "Profile-CTC",
        accessor: "profile_ctc",
      },
    ],
    []
  );
  

  return (
    <Container component="main" maxWidth={false} className="hiringreport">
      <Navbar Icon={HiringIcon} name="Hiring Info" />

      <Container
        maxWidth={false}
        disableGutters={true}
        className="hiringreport_main"
      >
        <Container maxWidth={false} className="hiringreport_mainSelect">
          <div className="hiringreport_selectLeft">
            <ArrowBackIosRoundedIcon className="hiringreport_selectBack" />
            <Select
              options={companyOptionsReport}
              onChange={companySelectReport}
              styles={customStyles1}
              placeholder="Select your company"
              isSearchable={true}
              isClearable={true}
            />
          </div>
          <div className="hiringreport_selectRight">
            <Select
              defaultValue={yearOptionsReport[1]}
              options={yearOptionsReport}
              onChange={yearSelectReport}
              styles={customStyles2}
              isSearchable={true}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>
        </Container>
        <Container
          disableGutters={true}
          maxWidth={false}
          className="hiringreport_mainTable"
        >
          <Container disableGutters={true} maxWidth={false} className="buttons">
            <Button
              onClick={visitngButton}
              className={
                dataSetTo === "Visiting"
                  ? "active_table table_button"
                  : "table_button"
              }
              variant="contained"
            >
              Visiting 
            </Button>
            <Button
              onClick={hotCurrentYearButton}
              className={
                dataSetTo === "HotCurrentYear"
                  ? "active_table table_button"
                  : "table_button"
              }
              variant="contained"
            >
              Hot for current year
            </Button>
            <Button
              onClick={hotNextYearButton}
              className={
                dataSetTo === "HotNextYear"
                  ? "active_table table_button"
                  : "table_button"
              }
              variant="contained"
            >
              Hot for next year
            </Button>
            <Button
              onClick={visitedButton}
              className={
                dataSetTo === "Visited"
                  ? "active_table table_button"
                  : "table_button"
              }
              variant="contained"
            >
              Visisted
            </Button>
            <Button
              onClick={notVisitngButton}
              className={
                dataSetTo === "NotVisiting"
                  ? "active_table table_button"
                  : "table_button"
              }
              variant="contained"
            >
              Not Visiting
            </Button>
            <Button
              onClick={notConfirmedButton}
              className={
                dataSetTo === "NotConfirmed"
                  ? "active_table table_button"
                  : "table_button"
              }
              variant="contained"
            >
              Not Confirmed
            </Button>
          </Container>
          <TableReport columns={columns} data={dataTable} />
        </Container>
      </Container>
      <Footer />
    </Container>
  );
}

export default Report;
