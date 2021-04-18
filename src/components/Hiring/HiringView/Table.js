import React, { useState } from "react";

//import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Radio from "@material-ui/core/Radio";
import axios from "axios";
import { useTable } from "react-table";
//import RadioGroup from "@material-ui/core/RadioGroup";
function Table({
  columns,
  data,
  checked,
  setchecked,
  showModalData,
  setShowModalData,
}) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  //const [checked, setChecked] = useState();
  const setModalData = (e) => {
    setchecked(e.target.value);
  };
  React.useEffect(() => {
    var obj;
    var i = 0;
    for (; i <= checked; i++) {
      obj = data[i];
    }
    var details = {};
    if (obj != null || obj != undefined) {
      var x = obj.id;
      // console.log(obj);
      var sc_id = obj.school_id;
      a();
      async function a() {
        var modal_in_data = await getmodal_in_data(x);
        var modal_pla_data = await getmodal_pla_data(x);
        var stream_data = await getstream_data(sc_id);
        var stream_name_in = [];
        var stream_name_pla = [];
        var stream_data_in = stream_data;
        var stream_data_pla = stream_data;
        var stream_id_in = modal_in_data[0].stream_id;
        var stream_id_pla = modal_pla_data[0].stream_id;
        console.log("SD", stream_data);

        var intern_profile_ctc = modal_in_data[0].intern_profile_ctc;
        var ppo_profile_ctc = modal_in_data[0].ppo_profile_ctc;
        var profile_ctc = modal_pla_data[0].profile_ctc;

        var ppo_profile_ctc_li = [];
        var intern_profile_ctc_li = [];
        var profile_ctc_li = [];

        profile_ctc.map((s) => {
          var res = s.split("-");

          profile_ctc_li = [
            ...profile_ctc_li,
            {
              Profile: res.slice(0, res.length - 1).join("-"),
              CTC: res[res.length - 1],
            },
          ];
        });

        ppo_profile_ctc.map((s) => {
          var res = s.split("-");
          ppo_profile_ctc_li = [
            ...ppo_profile_ctc_li,
            {
              Profile: res.slice(0, res.length - 1).join("-"),
              CTC: res[res.length - 1],
            },
          ];
        });

        intern_profile_ctc.map((s) => {
          var res = s.split("-");
          intern_profile_ctc_li = [
            ...intern_profile_ctc_li,
            {
              Profile: res.slice(0, res.length - 1).join("-"),
              CTC: res[res.length - 1],
            },
          ];
        });

        //console.log(intern_profile_ctc);
        //console.log(intern_profile_ctc_li);
        console.log(stream_data_in);
        console.log(stream_data_pla);
        // console.log(obj);
        // console.log(modal_in_data);
        // console.log(modal_pla_data);
        // console.log(modal_in_data[0].start_date);
        // var statr = new Date(modal_in_data[0].start_date);
        // console.log(statr.toLocaleDateString());
        details = {
          id: x,
          pay: obj.pay,
          school_id: sc_id,
          placement_status_statement: obj.placement_status_statement,
          ...modal_pla_data[0],
          intern_batch: modal_in_data[0].intern_batch,
          intern_offers: modal_in_data[0].intern_offers,
          intern_profile_ctc: modal_in_data[0].intern_profile_ctc,
          ppo_offered: modal_in_data[0].ppo_offered,
          end_date: new Date(modal_in_data[0].end_date).toLocaleDateString(),
          ppo_profile_ctc: modal_in_data[0].ppo_profile_ctc,
          intern_remark: modal_in_data[0].remarks,
          start_date: new Date(
            modal_in_data[0].start_date
          ).toLocaleDateString(),
          internship_id: modal_in_data[0].internship_id,
          stream_data: stream_data,
          stream_name_in: stream_name_in,
          stream_name_pla: stream_name_pla,
          stream_data_in: stream_data_in,
          stream_data_pla: stream_data_pla,
          stream_id_in: stream_id_in,
          stream_id_pla: stream_id_pla,
          intern_profile_ctc_li: intern_profile_ctc_li,
          profile_ctc_li: profile_ctc_li,
          ppo_profile_ctc_li: ppo_profile_ctc_li,
        };
        //console.log(details);
        console.log("details", details);
        setShowModalData(details);
        //console.log(showModalData);
      }
    }
    //console.log(details);
    //console.log(showModalData);
  }, [checked]);

  const getmodal_in_data = (p) => {
    return new Promise(function (resolve, reject) {
      var id = [];
      axios
        .get(
          `http://127.0.0.1:8000/hiring/internship_view/?internship_id=${p}`,
          {
            headers: {
              Authorization:
                "Token 77264ad1e4645c13eadd6964aeacf8572cc043aec074738a174c5402537feaf7",
            },
          }
        )
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

  const getmodal_pla_data = (p) => {
    return new Promise(function (resolve, reject) {
      var id = [];
      axios
        .get(`http://127.0.0.1:8000/hiring/placement_view/?placement_id=${p}`, {
          headers: {
            Authorization:
              "Token 77264ad1e4645c13eadd6964aeacf8572cc043aec074738a174c5402537feaf7",
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

  const getstream_data = (p) => {
    return new Promise(function (resolve, reject) {
      var id = [];
      axios
        .get(`http://127.0.0.1:8000/hiring/streams/?school_id=${p}`)
        .then((res) => {
          //console.log(compdata);

          res.data.response.map((d) => {
            //console.log(d);
            id = [
              ...id,
              {
                value: d.stream_id,
                label: d.stream_name,
                checking: false,
                forcheck: false,
              },
            ];
          });
          console.log("ID", id);
          resolve(id);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>

      <TableBody>
        {rows.map((row, i) => {
          // var val = row.original.id;
          prepareRow(row);

          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (cell.column.Header === "School") {
                  //console.log("H", cell.row.id);
                  return (
                    <TableCell {...cell.getCellProps()}>
                      <Radio
                        color="primary"
                        checked={checked === cell.row.id}
                        onChange={setModalData}
                        value={cell.row.id}
                      />
                      {cell.render("Cell")}
                    </TableCell>
                  );
                }
                if (cell.column.Header === "Profile-CTC") {
                  //console.log("H", cell.row.id);
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}L
                    </TableCell>
                  );
                }
                if (cell.column.Header === "Profile-Stipend") {
                  //console.log(cell.render);
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}k
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}
export default Table;
