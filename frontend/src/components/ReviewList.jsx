import * as React from "react";
import {
  CircularProgress,
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
import timeAgo from "../utilities/TimeAgo";

/*
    Adapted from Material UI Documentation Examples
*/

export default function ReviewList({ reviews, reviewsLoading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let columns = [
    { id: "createdAt", label: "Added", minWidth: 100 },
    { id: "review_text", label: "Review", minWidth: 150 },
    { id: "rating", label: "Rating", minWidth: 100 },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: "2rem" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
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
            {reviewsLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress sx={{ m: "2rem " }} />
                </TableCell>
              </TableRow>
            ) : (
              reviews
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((review, i) => {
                  return (
                    <TableRow
                      hover
                      role="button"
                      tabIndex={-1}
                      key={review.id}
                      sx={{
                        backgroundColor: i % 2 === 0 ? "white" : "#ebece8",
                      }}
                    >
                      {columns.map((column) => {
                        const value = review[column.id];

                        if (column.id === "rating") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <RatingDisplay value={value} />
                            </TableCell>
                          );
                        } else if (column.id === "createdAt") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {timeAgo(value)}
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
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reviews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: "#bfc8ad", borderTop: "solid black 2px" }}
      />
    </Paper>
  );
}
