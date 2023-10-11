import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/main.css";
function Main() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    fetch("https://taskbackend-265a.onrender.com/users/me", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(data)
        setName(data.Name);
        setEmail(data.email);
        setDob(data.age);
        setCheck(true);
      });
  }, []);

  function logout() {
    // console.log(localStorage.getItem('token'))
    let con = window.confirm("are you sure you want to logout?");
    if (con) {
      fetch("https://taskbackend-265a.onrender.com/users/logout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((data) => {
        localStorage.removeItem("token");
        navigate("/");
      });
    }
  }

  return (
    <div  className="main-box">
      <div id="lad">
        <span onClick={logout}>Logout </span>&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      {name!==""&&<div id="info" className="container">
        <h1 id="head">My-Task</h1>
        <hr />
       
          <h3>User Details</h3>
          <h5>First Name : {name.split(" ")[0]}</h5>
          <h5>Last Name : {name.split(" ")[1]}</h5>
          <h5>Email : {email}</h5>
          <h5>Dob : {dob}</h5>
        
      </div>}
    </div>
  );
}

export default Main;
