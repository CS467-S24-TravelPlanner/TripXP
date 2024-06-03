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
import ExpInTripCheckbox from "./ExpInTripCheckbox";

export default function ExperienceList({
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
    { id: "title", label: "Title", minWidth: "25%" },
    { id: "description", label: "Description", minWidth: "40%" },
    { id: "location", label: "Location", minWidth: "15%" },
    { id: "rating", label: "Rating", minWidth: "15%" },
  ];

  if (tripId) {
    columns = [{ id: "checkbox", label: "", minWidth: "5%" }, ...columns];
  }

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{
          maxHeight: 440,
          minHeight: 440,
          minWidth: 850,
          width: "100%",
          maxWidth: "50vw",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: "#bfc8ad",
                    fontSize: "1.15em",
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
                    sx={{
                      cursor: "pointer",
                      backgroundColor: i % 2 === 0 ? "white" : "#ebece8",
                    }}
                  >
                    {columns.map((column) => {
                      const value = experience[column.id];
                      if (column.id === "checkbox") {
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
                          <TableCell key={column.id} align={column.align}>
                            <RatingDisplay value={value} />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
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
    </Paper>
  );
}
