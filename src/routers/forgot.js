import React from 'react'
import '../style/forgot.css' 
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'

function Forgot(){
   const navigate=useNavigate()
   function handler1(e){
      e.preventDefault()
      let email=document.querySelector('#input1').value
      
      fetch(`https://task-app-backendcode.herokuapp.com/forget`, {
      method: "post",headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      email
    }),
  }).then(data=>{
     if(data.status===400)
     return window.alert('account not found for this email')
     if(data.status===200)
     window.alert('we send an otp on your email!')
     localStorage.setItem('email',email)
     document.querySelector('.container').style.display='none'
     document.querySelector('.head1').style.display='none'
     document.querySelector('#form2').style.display='block'
  })
   }

   function handler2(e){
       e.preventDefault()
       const newpassword=document.querySelector('#input2').value
       const otp=document.querySelector('#otpvalue').value
       const email=localStorage.getItem('email')
      fetch(`https://task-app-backendcode.herokuapp.com/setnewpassword`, {
      method: "post",headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      email,newpassword,otp
    })
  }).then(data=>{
     if(data.status!==200){
     window.alert('invalid otp')
     return
     }
     window.alert("Password updated successfully press 'ok' to go to login page!")
     navigate('/')
  })
   }
   return(
       <div className="main-box">
          <h1 className="head1">todo-app</h1>
          <div className="container">
            <h1 id="head">Find your account</h1>
            <hr/>
            <p id="para">Please enter your email address to search for your account.</p>
            <br/>
            <form id="form1" onSubmit={handler1}>
            <input id="input1" type="text" required placeholder="Email adress"/><br/><hr/>
            <input id="otp" type="submit" value="Send OTP"/>
            </form>
            <Link className="link" to="/">Already have an Account?</Link>
            <p>or</p>
            <Link className="link" to="/signup">Create Account</Link><br/>
          </div>
          <form className="design" id="form2" onSubmit={handler2}>
            <input id="input2" type="text" minLength={7} required placeholder="enter new password"/>
            <input id="otpvalue" type="number" min="1000" max="9999" placeholder="enter otp" required/>
            <input id="submit2" type="submit" value="Update Password"/>
          </form>
       </div>
   )
}
export default Forgot;