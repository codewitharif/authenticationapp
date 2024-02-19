import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    //console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    try {
      const res = await fetch(
        "https://authenticationappbackend.vercel.app/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            work,
            password,
            cpassword,
          }),
        }
      );
      const data = await res.json();
      //console.log(data);
      if (res.status === 422 || !data) {
        window.alert("invalid registration");
        //console.log("invalid registration");
      } else {
        window.alert("successfull registration");
        //console.log("successfull registration");
        navigate("/login");
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
                <label htmlFor="name">
                  <i className="fas fa-user" /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <i className="fas fa-phone" /> Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="work">
                  <i className="fas fa-briefcase" /> Work
                </label>
                <input
                  type="text"
                  name="work"
                  value={user.work}
                  className="form-control"
                  id="work"
                  placeholder="Enter your work"
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock" /> Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <i className="fas fa-lock" /> Confirm Password
                </label>
                <input
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  onChange={handleInputs}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={PostData}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
