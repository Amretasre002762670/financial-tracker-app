import React from "react";
import Budget from "../Budget/Budget";
import { Link } from "react-router-dom";

const Transaction = () => {
    const username = sessionStorage.getItem("username");
    return (
        <div className="bg-[#ededed]">
            <h2 className="font-bold text-[30px]">Welcome <Link to="/" className="text-[#8300e6] hover:text-[#8401e7] hover:underline" onClick={() => sessionStorage.clear()}> {username}! </Link> </h2>
            <Budget />
        </div>
    )
}

export default Transaction;