import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ArcElement is required to create a doughnut chart and piechart; it is required when displaying Segments
// Legend allows user to understand what each color represents; shows the labels for each segment
ChartJS.register(ArcElement, Tooltip, Legend);

const Budget = () => {
  const [summary, setSummary] = useState({
    expense: 0,
    income: 0,
  });

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const userid = sessionStorage.getItem("userid");
  // const tokenStore = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTransaction = async () => {
    if (!token) {
        navigate("/");
        return;
    }
      try {
        const response = await axios.get(
          `http://localhost:5001/transactions/${userid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const transactions = response.data.Transactions;

          const expense = transactions
            .filter((transaction) => transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

          const income = transactions
            .filter((transaction) => transaction.type === "income")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

          setSummary({ income, expense });
        } else if (response.status === 404) {
          setSummary({ income: 0, expense: 0 });
        }
      } catch (e) {
        console.error("Error fetching transactions:", e);
        setSummary({ income: 0, expense: 0 });
      }
    };

    if (userid && token) fetchTransaction();
  }, [userid, token]);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary.income, summary.expense],
        backgroundColor: ["#e549ff", "#45007e"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    cutout: "50%",
  };

  return (
    <div className="flex justify-center p-[20px]">
      <div className="w-[300px] h-[300px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default Budget;
