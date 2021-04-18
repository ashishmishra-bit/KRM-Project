import React, { useState } from "react";

//import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Link } from "react-router-dom";

import { useTable, useSortBy } from "react-table";
//import RadioGroup from "@material-ui/core/RadioGroup";

function TableReport({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  const [companyViewTable, setCompanyViewTable] = useState("");
  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell
                {...(column.id === "selection"
                  ? column.getHeaderProps()
                  : column.getHeaderProps(column.getSortByToggleProps()))}
              >
                {column.render("Header")}
                {column.id !== "selection" ? (
                  <TableSortLabel
                    active={column.isSorted}
                    // react-table has a unsorted state which is not treated here
                    direction={column.isSortedDesc ? "desc" : "asc"}
                  />
                ) : null}
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
                //console.log(cell);
                if (cell.column.Header === "Company name") {
                  //console.log("H", cell.row.id);
                  return (
                    <TableCell
                      {...cell.getCellProps()}
                      onClick={(e) => setCompanyViewTable(cell.value)}
                    >
                      <Link
                        to={{
                          pathname: "/hiringview",
                          state: cell.value,
                        }}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {cell.render("Cell")}{" "}
                      </Link>
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
export default TableReport;
