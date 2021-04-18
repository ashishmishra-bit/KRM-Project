import React, { useState } from "react";
import "./ModalData.css";
import { Container, Button } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CloseIcon from "@material-ui/icons/Close";

function Modal({ checked, setOpen, showModalData, companyName }) {
  //console.log(showModalData.stream_name_pla);
  return (
    <div className="ModalData">
      <h2 className="ModalData_companyName">{companyName}</h2>

      <Button className="modal_close" onClick={() => setOpen(false)}>
        <CloseIcon />
      </Button>
      <Container
        disableGutters={true}
        maxWidth={false}
        className="ModalData_element"
      >
        <div disableGutters={true} className="modalData_box">
          <div className="modalData_heading">
            <h3>Placement Details</h3>
          </div>
          <div className="modalData_material">
            <div className="modalData_Stream">
              {showModalData.stream_name_pla.map((stream_name) => {
                return (
                  <div className="stream">
                    <FiberManualRecordIcon className="blue" />
                    <p className="streamData">{stream_name}</p>
                  </div>
                );
              })}
            </div>
            <div className="modalData_main">
              <div className="row">
                <p className="bold pla_proLabelTag">
                  Profile - CTC<span className="pro_tag">(in Lakh)</span>
                </p>
                {showModalData.profile_ctc.map((pc) => {
                  return <p className="data">{pc}</p>;
                })}
              </div>
              <div className="row batch_margin">
                <p className="bold ">Batch</p>
                <p className="data">{showModalData.batch}</p>
              </div>
              <div className="row">
                <p className="bold">No. of Offers</p>
                <p className="data">{showModalData.offers}</p>
              </div>
              <div className="row">
                <p className="bold">Month of Visit</p>
                <p className="data">{showModalData.visit_month}</p>
              </div>
              <div className="row">
                <p className="bold">Placement Status</p>
                <p className="data">
                  {showModalData.placement_status_statement}
                </p>
              </div>
              <div className="row">
                <p className="bold">Remarks</p>
                <p className="data">{showModalData.remarks}</p>
              </div>
            </div>
          </div>
        </div>
        <div disableGutters={true} className="modalData_box">
          <div className="modalData_heading">
            <h3>Internship Details</h3>
          </div>
          <div className="modalData_material">
            <div className="modalData_Stream">
              {showModalData.stream_name_in.map((stream_name) => {
                return (
                  <div className="stream">
                    <FiberManualRecordIcon className="blue" />
                    <p className="streamData">{stream_name}</p>
                  </div>
                );
              })}
            </div>
            <div className="modalData_main">
              <div className="row">
                <p className="bold in_proLabelTag">
                  Profile - CTC
                  <span className="in_proTag">
                    Stipend per month (in Thousand)
                  </span>
                </p>
                {showModalData.intern_profile_ctc.map((pc) => {
                  return <p className="data">{pc}</p>;
                })}
              </div>
              <div className="row batch_margin">
                <p className="bold ">Batch</p>
                <p className="data">{showModalData.intern_batch}</p>
              </div>
              <div className="row">
                <p className="bold">No. of Offers</p>
                <p className="data">{showModalData.intern_offers}</p>
              </div>
              <div className="row">
                <p className="bold date_tagLabel">
                  Internship Date <span className="date_tag">(Tentative)</span>
                </p>
                <p className="data">
                  {showModalData.start_date} - {showModalData.end_date}
                </p>
              </div>

              <div className="row">
                <p className="bold"> Remarks</p>
                <p className="data">{showModalData.intern_remark}</p>
              </div>
              <p className="PPO_in">PPO</p>
              <div className="row">
                <p className="bold">PPOs Offered</p>
                <p className="data">{showModalData.ppo_offered}</p>
              </div>
              <div className="row">
                <p className="bold ppo_proLabelTag">
                  Profile - CTC <span className="ppo_proTag">(in Lakh)</span>
                </p>
                {showModalData.ppo_profile_ctc.map((pc) => {
                  return <p className="data">{pc}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Modal;
