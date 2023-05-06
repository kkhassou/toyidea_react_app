import React, { useState, useEffect } from "react";
import { get_five_w_one_h } from "../../../api/five_w_one_h_client";
import {
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SimpleSecondStepPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get_five_w_one_h()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching sky rain umbrella list:", error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead key="table-head">
          <TableRow key="table-row">
            <TableCell key="who-cell">Who</TableCell>
            <TableCell key="where-cell">Where</TableCell>
            <TableCell key="when-cell">When</TableCell>
            <TableCell key="what-cell">What(ニーズ)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.who_st}</TableCell>
              <TableCell>{item.where_st}</TableCell>
              <TableCell>{item.when_st}</TableCell>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                // height="100%"
                minHeight="100px"
              >
                <TextField
                  multiline
                  inputProps={{
                    maxLength: 30,
                    style: { whiteSpace: "pre-wrap", wordWrap: "break-word" },
                    wrap: "soft",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px 10px",
                    },
                  }}
                />
              </Box>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleSecondStepPage;
