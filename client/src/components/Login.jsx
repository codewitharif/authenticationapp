import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://authenticationappbackend.vercel.app/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      //console.log(data);
      if (res.status == 200) {
        dispatch({ type: "USER", payload: true });
        window.alert("login successfull ");
        //console.log("login successfull");
        navigate("/");
      } else {
        window.alert("invalid credentials");
        //console.log("invalid credentials");
      }
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form method="POST">
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-email" /> Username
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock" /> Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={loginUser}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
