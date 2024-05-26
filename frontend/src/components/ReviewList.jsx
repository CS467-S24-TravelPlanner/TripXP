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

/*
    Adapted from Material UI Documentation Examples
*/

export default function ReviewList({ reviews }) {
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
    { id: "user_id", label: "User", minWidth: 100 },
    { id: "review_text", label: "Review", minWidth: 150 },
    { id: "rating", label: "Rating", minWidth: 100 },
  ];


  return (
    <Paper sx={{ width: "80%", overflow: "hidden"}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((review) => {
                return (
                  <TableRow
                    hover
                    role="button"
                    tabIndex={-1}
                    key={review.id}
                  >
                    {columns.map((column) => {
                      const value = review[column.id];

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
        count={reviews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
