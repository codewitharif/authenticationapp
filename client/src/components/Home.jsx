import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Home = () => {
  const token = Cookies.get("jwtoken");
  //console.log(token);
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");

  const userContact = async () => {
    try {
      const res = await fetch("https://authenticationapp-two.vercel.app/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log("my data is ", data.status);

      if (data.status === 401) {
        setShow(false); // handle unauthorized case
      } else {
        setUserName(data); // set userName if data is present
        setShow(true);
      }
    } catch (error) {
      //console.log(error);
      setShow(false);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  return (
    <div className="homecontainer">
      <div className="home-div">
        <p>
          WELCOME <b>{userName ? userName.name : ""}</b>
        </p>
        <h1>{show ? "Happy to see you back!" : "We Are MERN Developer"}</h1>
      </div>
    </div>
  );
};

export default Home;
