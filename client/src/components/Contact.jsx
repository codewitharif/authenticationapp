import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Contact = () => {
  const token = Cookies.get("jwtoken");
  //console.log(token);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  //console.log(userData);

  const userContact = async () => {
    try {
      //console.log("entering try bock");
      const res = await fetch(
        "https://authenticationappbackend.vercel.app/contactdata",
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
      setUserData({
        ...userData,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      });

      if (res.status == 200) {
        //console.log("working fine");
        setUserData(data); // Parse JSON response
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const handleForm = async (e) => {
    try {
      e.preventDefault();

      const { name, email, phone, message } = userData;
      const res = await fetch(
        "https://authenticationappbackend.vercel.app/contact",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
          },
          credentials: "include",
          body: JSON.stringify({ name, email, phone, message }),
        }
      );

      const data = await res.json();
      //console.log(data);
      if (res.status == 200) {
        window.alert("message sent successfully");
        setUserData({ ...userData, message: "" });
      } else {
        window.alert("Please login first...");
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="contactcontainer">
      <div className="ourcontact my-4 text-center">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">
                    <label htmlFor="email">
                      <i className="fas fa-phone" /> Phone
                    </label>
                  </h5>
                  <p className="card-text">+91 7667653500</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">
                    <label htmlFor="email">
                      <i className="fas fa-envelope" /> Email
                    </label>
                  </h5>
                  <p className="card-text">aatif149209@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">
                    <label htmlFor="email">
                      <i className="fas fa-home" /> Address
                    </label>
                  </h5>
                  <p className="card-text">Bokaro, Jharkhand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="getintouch my-12">
        <div className="container text-center">
          <div className="contact_form_container py-5">
            <div className="contact_form_title">Get In Touch With Us</div>
            <form id="contact_form" method="POST">
              <div className="row my-4">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={userData && userData.name}
                    placeholder="Your Name"
                    onChange={handleInputs}
                  />
                </div>
                <div className="col">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userData && userData.email}
                    placeholder="Your Email"
                    onChange={handleInputs}
                  />
                </div>
                <div className="col">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={userData && userData.phone}
                    placeholder="Your Phone"
                    onChange={handleInputs}
                  />
                </div>
              </div>
              <div className="row my-10">
                <div className="col">
                  <textarea
                    name="message"
                    id="messagebox"
                    placeholder="Enter your message"
                    className="form-control"
                    cols="30"
                    rows="5"
                    onChange={handleInputs}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleForm}
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
