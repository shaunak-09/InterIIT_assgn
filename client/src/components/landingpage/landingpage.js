import React, { useEffect, useState } from "react";
import "./landingpage.css";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";

function Landingpage(props) {
    const handleclick = () => {
        props.setloginsignup(true);
      };
      const logout = () => {
        props.setLogstat(0);
        localStorage.removeItem("user_info");
        sessionStorage.removeItem("logstat");
    
        toast.success("Logged out successfully");
      };


  return (

        <div className="p-4 flex flex-col justify-center items-center">
      {props.logstat == 1 ? (
        <>
          <button
            class="p-3 bg-blue-500 left-5 top-2 absolute font-bold rounded-xl"
            onClick={logout}
          >
            LOGOUT
          </button>
          </>
      )
      :
      (
        <>
          <button
            class="p-3 bg-blue-500 left-5 top-2 absolute font-bold rounded-xl"
            onClick={handleclick}
          >
            SIGNIN
          </button>
        </>

      )
}
</div>
  )
}

export default Landingpage