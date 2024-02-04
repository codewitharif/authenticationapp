import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "../App";

const Logout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const token = Cookies.get("jwtoken");
  useEffect(() => {
    fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status != 200) {
          //console.log(res);
        }
        dispatch({ type: "USER", payload: false });
        navigate("/login");
      })
      .catch((err) => {
        //console.log(err);
      });
  });
  return (
    <>
      <h1>logout successfully</h1>
    </>
  );
};

export default Logout;
