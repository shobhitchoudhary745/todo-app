import React from 'react';
import '../style/login.css';
import {Link,useNavigate} from 'react-router-dom'
function Login() {
  const navigate=useNavigate()
  function handler(e){
    e.preventDefault()
    let email=document.querySelector('#email').value
    let password=document.querySelector('#password').value
  fetch(`https://task-app-backendcode.herokuapp.com/users/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      localStorage.setItem('token',data.token)
      navigate("/main");
    })
    .catch((e) => {
      window.alert('user not found with this email and password')
    });

    }


  return (
    <div className="main-box">
      <h1 className="head">todo-app</h1>
      <div className="container">
        <p id="pp">Log in to Todo-App</p>
        <form onSubmit={handler}>
        <input  id="email" type="text" placeholder="Email adress" required/><br/><br/>
        <input autoComplete="off" id="password" type="password" placeholder="Password" required/><br/><br/>
        <input id="but" type="submit" value="Log In"/>
        </form>
        <br/>
        <Link className="Link" to="/forgot">Forgotten password?</Link><br/>
        <p id="ppp">or</p>
        <Link className="Link" id="create" to="/signup">Create an account</Link>
        <br/><br/>
      </div><br/>
    </div>
  );
}

export default Login ;
