import * as React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Collapse,
  Box,
  Chip,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import RatingDisplay from "./RatingDisplay";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

/*
    Adapted from Material UI Documentation Examples
*/

export default function SlimExperienceList({
  experiences,
  tripId = null,
  tripExperiences = null,
  loading,
  experienceClick = null,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openIndex, setOpenIndex] = React.useState(null);
  const [selectedExp, setSelectedExp] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let columns = [
    { id: "title", label: "Title" },
    { id: "rating", label: "Rating", minWidth: "30%" },
  ];

  if (tripId) {
    columns = [{ id: "inTrip", label: "In Trip", minWidth: 50 }, ...columns];
  }

  return (
    <>
      <TableContainer sx={{ flex: 1, flexBasis: 0 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#bfc8ad",
                  borderBottom: "solid black 2px",
                  minWidth: "10%",
                }}
              />
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{
                    minWidth: column.minWidth,
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ border: "none" }}>
                  <CircularProgress sx={{ m: "2rem " }} />
                </TableCell>
              </TableRow>
            ) : (
              experiences
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((experience, i) => {
                  return (
                    <CollapsibleRow
                      key={experience.id}
                      experience={experience}
                      experienceClick={experienceClick}
                      i={i}
                      openIndex={openIndex}
                      setOpenIndex={setOpenIndex}
                    />
                  );
                })
            )}
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

function CollapsibleRow({
  experience,
  i,
  experienceClick,
  openIndex,
  setOpenIndex,
}) {
  const handleCollapseClick = () => {
    if (openIndex === i) {
      setOpenIndex(null);
      return;
    }
    setOpenIndex(i);
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: i % 2 === 0 ? "white" : "#ebece8",
        }}
        onClick={() => handleCollapseClick()}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {openIndex === i ? (
              <KeyboardArrowRightIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {experience.title}
        </TableCell>
        <TableCell align="right">
          <RatingDisplay value={experience.rating} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openIndex === i} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <p>
                <b>{experience.location}</b>
              </p>
              <p>{experience.description}</p>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "nowrap",
                }}
              >
                {experience.keywords && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap", flexGrow: 2, rowGap: 1 }}
                  >
                    {experience.keywords.map((keyword, i) => (
                      <Chip key={i} label={keyword} variant="outlined" />
                    ))}
                  </Stack>
                )}
                <Box>
                  <Button
                    variant="text"
                    sx={{ whiteSpace: "nowrap" }}
                    onClick={() => experienceClick(experience)}
                  >
                    Learn more
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
