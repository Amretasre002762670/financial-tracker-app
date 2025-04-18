import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Budget from "../Budget/Budget";
import TransactionTable from "../TransactionTable/TransactionTable";
import { Link } from "react-router-dom";

const Transaction = () => {
    const username = sessionStorage.getItem("username");
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate])

    return (
        <div className="bg-[#ededed]">
            <h2 className="font-bold text-[25px] p-[5px]">Welcome <Link to="/" className="text-[#8300e6] hover:text-[#8401e7] hover:underline" onClick={() => sessionStorage.clear()}> {username}! </Link> </h2>
            <Budget />
            <TransactionTable />
        </div>
    )
}

export default Transaction;