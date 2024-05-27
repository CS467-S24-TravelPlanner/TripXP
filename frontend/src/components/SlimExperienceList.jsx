import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import RatingDisplay from "./RatingDisplay";
import { Link } from "react-router-dom";
import ExpInTripCheckbox from "./ExpInTripCheckbox";

/*
    Adapted from Material UI Documentation Examples
*/

export default function SlimExperienceList({
  experiences,
  tripId = null,
  tripExperiences = null,
  experienceClick = null,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedExp, setSelectedExp] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleExperienceClick = (experience) => {
    if (experienceClick) {
      experienceClick(experience);
    }
  };

  let columns = [
    { id: "title", label: "Title", maxWidth: "70%" },
    { id: "rating", label: "Rating", maxWidth: "30%" },
  ];

  if (tripId) {
    columns = [{ id: "inTrip", label: "In Trip", minWidth: 50 }, ...columns];
  }

  return (
    <>
      <TableContainer sx={{ flex: 1 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{
                    maxWidth: column.maxWidth,
                  }}
                  sx={{
                    backgroundColor: "#bfc8ad",
                    fontSize: "1em",
                    borderBottom: "solid black 2px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((experience, i) => {
                return (
                  <TableRow
                    hover
                    role="button"
                    tabIndex={-1}
                    key={experience.id}
                    onClick={() => handleExperienceClick(experience)}
                  >
                    {columns.map((column) => {
                      const value = experience[column.id];
                      if (column.id === "inTrip") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <ExpInTripCheckbox
                              expId={experience.id}
                              tripId={tripId}
                              tripExperiences={tripExperiences}
                            />
                          </TableCell>
                        );
                      }
                      if (column.id === "rating") {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              backgroundColor:
                                i % 2 === 0 ? "white" : "#ebece8",
                            }}
                          >
                            <RatingDisplay value={value} />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              backgroundColor:
                                i % 2 === 0 ? "white" : "#ebece8",
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={experiences.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: "#bfc8ad", borderTop: "solid black 2px" }}
      />
    </>
  );
}
