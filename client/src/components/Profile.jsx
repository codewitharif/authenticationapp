import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  //console.log(userData);

  const callProfilePage = async () => {
    try {
      const token = Cookies.get("jwtoken");
      //console.log("entering try bock");
      const res = await fetch(
        "https://authenticationapp-two.vercel.app/profile",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      //console.log(data);

      if (res.status == 200) {
        //console.log("working fine");
        setUserData(data); // Parse JSON response
      } else {
        navigate("/login");
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    callProfilePage();
  }, []);
  return (
    <div className="container">
      <div className="aboutcontainer mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form method="GET">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="fas fa-user" /> Name :
                </label>
                <label htmlFor="name"> {userData && userData.name}</label>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope" /> Email :
                </label>
                <label htmlFor="name">{userData && userData.email}</label>
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <i className="fas fa-phone" /> Phone :
                </label>
                <label htmlFor="name">{userData && userData.phone}</label>
              </div>
              <div className="form-group">
                <label htmlFor="work">
                  <i className="fas fa-briefcase" /> Work :
                </label>
                <label htmlFor="name">{userData && userData.work}</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
