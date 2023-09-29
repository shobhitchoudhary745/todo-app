import React from 'react'
import '../style/signup.css' 
import {Link,useNavigate} from 'react-router-dom'

function Signup(){
  const navigate=useNavigate()
   
   function handler(e){
      e.preventDefault();
      let fName=document.querySelector('#fName').value.trim();
      let sName=document.querySelector('#sName').value.trim();
      let Name=fName+" "+sName;
      let email=document.querySelector('#email').value;
      let password= document.querySelector('#password').value;
      let date=document.querySelector('#date').value;
      let month=document.querySelector('#month').value;
      let year=document.querySelector('#year').value;
      let age=date+"/"+month+"/"+year;
    
      fetch(`https://taskappbackend-ik2h.onrender.com/users`,{
         method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
         Name,email,password,age
      })
     
      }).then(data=>{
         return data.json()
      }).then(data=>{
          if(data.token){
        
              localStorage.setItem('token',data.token)
              window.alert('your account is successfully created')
              navigate('/main');
             
          }
          console.log(data)
          if(data.code===11000){
          window.alert('this email is already used')
          return;
          }
          if(data.errors.password&&data.errors.email){
            window.alert('invalid email and password')
            return
          }
          if(data.errors.password){
           window.alert('use upassword with min length seven')
           return
          }
          if(data.errors.email){
          window.alert('invalid email')
          return;
        }
           
      }).catch(e=>{
      })
       
   }
   return (
     <div className="s-main-box">
       <h1 className="s-head">todo-app</h1>
       <div className="s-container">
         <p id="top">Create a new account</p>
         <p id="quick">it's quick and easy</p>
         <br />
         <hr />
         <br />
         <form onSubmit={handler} id="sel">
           <input
             id="fName"
             className="jmp"
             type="text"
             placeholder="First name"
             required
           />
           &nbsp;&nbsp;&nbsp;
           <input
             id="sName"
             className="jmp"
             type="text"
             placeholder="Surname"
             required
           />
           <input
             id="email"
             className="imp"
             type="text"
             placeholder="Email adress"
             required
           />
           <input
             id="password"
             className="imp"
             type="text"
             placeholder="New password"
             required
             autoComplete="off"
           />
           <p id="dob">Date of birth:</p>
           <select id="date">
             <option>01</option>
             <option>02</option>
             <option>03</option>
             <option>04</option>
             <option>05</option>
             <option>06</option>
             <option>07</option>
             <option>08</option>
             <option>09</option>
             <option>10</option>
             <option>11</option>
             <option>12</option>
             <option>13</option>
             <option>14</option>
             <option>15</option>
             <option>16</option>
             <option>17</option>
             <option>18</option>
             <option>19</option>
             <option>20</option>
             <option>21</option>
             <option>22</option>
             <option>23</option>
             <option>24</option>
             <option>25</option>
             <option>26</option>
             <option>27</option>
             <option>28</option>
             <option>29</option>
             <option>30</option>
             <option>31</option>
           </select>
           <select id="month">
             <option>Jan</option>
             <option>Feb</option>
             <option>Mar</option>
             <option>Apr</option>
             <option>May</option>
             <option>Jun</option>
             <option>Jul</option>
             <option>Aug</option>
             <option>Sep</option>
             <option>Oct</option>
             <option>Nov</option>
             <option>Dec</option>
           </select>
           <select id="year">
             <option>1983</option>
             <option>1984</option>
             <option>1985</option>
             <option>1986</option>
             <option>1987</option>
             <option>1988</option>
             <option>1989</option>
             <option>1990</option>
             <option>1991</option>
             <option>1992</option>
             <option>1993</option>
             <option>1994</option>
             <option>1995</option>
             <option>1996</option>
             <option>1997</option>
             <option>1998</option>
             <option>1999</option>
             <option>2000</option>
             <option>2001</option>
             <option>2002</option>
             <option>2003</option>
             <option>2004</option>
             <option>2005</option>
             <option>2006</option>
             <option>2007</option>
             <option>2008</option>
             <option>2009</option>
             <option>2010</option>
             <option>2011</option>
             <option>2012</option>
             <option>2013</option>
             <option>2014</option>
             <option>2015</option>
             <option>2016</option>
             <option>2017</option>
             <option>2018</option>
             <option>2019</option>
             <option>2020</option>
             <option>2021</option>
             <option>2022</option>
           </select>
           <input id="sign-up" type="submit" value="Sign Up" />
         </form>
         <br />
         <Link to="/" id="Link">
           Already have an account?
         </Link>
         <br />
         <br />
       </div>
     </div>
   );
}
export default Signup;