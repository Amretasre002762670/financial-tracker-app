import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Select,
  MenuItem,
  Button,
  TextField,
  TablePagination
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isAdding, setIsadding] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    type: "",
    description: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  let countRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      const userId = sessionStorage.getItem("userid");
      const token = sessionStorage.getItem("token");
      try {
        if (!token) {
          navigate("/");
          return;
        }

        if (!userId) {
          navigate("/");
          return;
        }

        const response = await axios.get(
          `http://localhost:5001/transactions/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.Transactions);

        if (response.status === 200) {
          setTransactions(response.data.Transactions);
          countRef.current = response.data.Transactions.length;
        } else if (response.status === 404) {
          setTransactions([]);
          countRef.current = 0;
        }
      } catch (e) {
        console.error("Error fetching transactions:", e);
        navigate("/serverError");
      }
    };

    fetchTransactions();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTransaction = async () => {
    try {
      if (!sessionStorage.getItem("token")) {
        navigate("/login");
        return;
      }
      const response = await axios.post(
        "http://localhost:5001/transactions/",
        newTransaction,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        setTransactions((prev) => [...prev, response.data.transaction]);
        setNewTransaction({ amount: "", type: "income", description: "" });
        countRef.current++;
      } else {
        navigate("/serverError");
      }
    } catch (e) {
      console.log(e);
      navigate("/serverError");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    // Paper is a mui component that has a subtle shadowand rounded corners instead of a general div
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          width: "60%",
          height: "auto",
          border: "1px solid #e549ff",
          borderRadius: "20px",
          boxShadow: "0px 0px 20px #45007e",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#45007e",
                color: "white",
                "&:last-child td, &:last-child th": { border: 0 },
              }}>
              <TableCell sx={{color:"white"}}>S. No</TableCell>
              <TableCell sx={{color:"white"}}>Amount</TableCell>
              <TableCell sx={{color:"white"}}>Type</TableCell>
              <TableCell sx={{color:"white"}}>Description</TableCell>
              <TableCell sx={{color:"white"}}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, idx) => {
              const absoluteIdx = page * rowsPerPage + idx;
              return (
                <TableRow key={absoluteIdx}>
                  <TableCell sx={{backgroundColor:absoluteIdx%2 === 0? "#8300e6": "#e549ff", color: "white"}}>{absoluteIdx + 1}</TableCell>
                  <TableCell sx={{backgroundColor:absoluteIdx%2 === 0? "#8300e6": "#e549ff", color: "white"}}>${transaction.amount}</TableCell>
                  <TableCell sx={{backgroundColor:absoluteIdx%2 === 0? "#8300e6": "#e549ff", color: "white"}}>{transaction.type}</TableCell>
                  <TableCell sx={{backgroundColor:absoluteIdx%2 === 0? "#8300e6": "#e549ff", color: "white"}}>{transaction.description}</TableCell>
                  <TableCell sx={{backgroundColor:absoluteIdx%2 === 0? "#8300e6": "#e549ff", color: "white"}}>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
            {!isAdding ? (
              <TableRow
                onClick={() => setIsadding(true)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell sx={{backgroundColor: "#ededed"}}>
                  <IconButton sx={{ color: "#45007e" }}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell colSpan={4} align="center" sx={{ color:"#45007e", backgroundColor: "#ededed"}}>
                  Add Transaction
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell align="left">{countRef.current}</TableCell>
                <TableCell align="left">
                  <TextField
                    name="amount"
                    type="number"
                    value={newTransaction.amount}
                    onChange={handleInputChange}
                    size="small"
                    sx={{ width: "70px", height: "30px" }}
                    autoFocus
                  />
                </TableCell>
                <TableCell align="left">
                  <Select
                    name="type"
                    value={newTransaction.type}
                    onChange={handleInputChange}
                    size="small"
                    sx={{ width: "100px", height: "40px" }}
                  >
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="left">
                  <TextField
                    name="description"
                    value={newTransaction.description}
                    onChange={handleInputChange}
                    size="small"
                  />
                </TableCell>
                <TableCell align="left">
                  <Button
                    onClick={handleAddTransaction}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#e549ff",
                      "&:hover": { backgroundColor: "#45007e" },
                      borderRadius: "20px",
                    }}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TransactionTable;
