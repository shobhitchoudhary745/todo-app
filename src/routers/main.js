import React from 'react'
import { useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import  '../style/main.css'
function Main(){    
const navigate=useNavigate()
const [arr,setArr]=useState([])
const [check,setCheck]=useState(false)
const [id,setId]=useState('')
   useEffect(()=>{
       if(!localStorage.getItem('token'))
       navigate('/')
       fetch('https://todoappbackend-uwq1.onrender.com/tasks/me',{
           method:'get',headers:{'Content-Type':'application/json','Authorization':`${localStorage.getItem('token')}`}
       }).then(data=>{
           return data.json()
       }).then(data=>{
           setArr(data)
       }
       )
    },[check])
   

function logout(){
    let con=window.confirm('are you sure you want to logout?')
    if(con){
        fetch('https://todoappbackend-uwq1.onrender.com/users/logout',{
            method:'post',headers:{ "Content-Type": "application/json","Authorization":`${localStorage.getItem('token')}`},
        }).then(data=>{
            localStorage.removeItem('token')
            navigate('/')
        })
    }
}

function edittodo(e){
    
    setId(e.target.id)
    document.querySelector('#edi').value=e.target.title
    document.querySelector('#edittodos').style.display='block'
    document.querySelector('#lad').style.display='none'
    document.querySelector('.container').style.display='none'
    document.querySelector('#edi').focus()
}

function finaledit(e){
    e.preventDefault()
    
    let value=document.querySelector('#edi').value
    console.log(value)
    fetch(`https://todoappbackend-uwq1.onrender.com/taasks/${id}`,{
        method:'post',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({description:value})
    }).then(data=>{ 
        document.querySelector('#edittodos').style.display='none'
        document.querySelector('#lad').style.display='block'
        document.querySelector('.container').style.display='block'
        if(check===false)
        setCheck(true)
        setCheck(false)  
    })
}

function deletetodo(e){
  fetch(`https://todoappbackend-uwq1.onrender.com/tasks/${e.target.id}`,{
      method:'delete',headers:{'Content-Type':'application/json'},
      
  }).then(data=>{
      if(check===false)
      setCheck(true)
      setCheck(false)
  })
}

function closeedit(){
 document.querySelector('#edittodos').style.display='none'
 document.querySelector('#lad').style.display='block'
 document.querySelector('.container').style.display='block'

}

function logoutall(){
    let con=window.confirm('are you sure you want to logout from all devices?')
    if(con){
        fetch('https://todoappbackend-uwq1.onrender.com/users/logoutAll',{
            method:'post',headers:{ "Content-Type": "application/json","Authorization":`${localStorage.getItem('token')}`},
        }).then(data=>{
            localStorage.removeItem('token')
            navigate('/')
        })
    }
}

function deleted(){
    let con=window.confirm('are you sure you want to delete your account?')
    if(con){
        fetch('https://todoappbackend-uwq1.onrender.com/users/me',{
            method:'delete',headers:{ "Content-Type": "application/json","Authorization":`${localStorage.getItem('token')}`},
        }).then(data=>{
            localStorage.removeItem('token')
            navigate('/signup')
        })   
    }
}
   function handler(e){
       e.preventDefault()
       let description =document.querySelector('#todo').value
       document.querySelector('#todo').value=""
       fetch('https://todoappbackend-uwq1.onrender.com/tasks',{
           method:'post',headers:{ "Content-Type": "application/json","Authorization":`${localStorage.getItem('token')}`},
           body:JSON.stringify({description})
       }).then(data=>{
           return data.json()
       }).then(data=>{
           if(check===true)
           setCheck(false)
           setCheck(true)
           
       }).catch(e=>{
           
       })
   }
   return (
     <div className="main-box">
       <div id="lad">
         <span onClick={logout}>Logout </span>&nbsp;&nbsp;&nbsp;&nbsp;
         <span onClick={logoutall}> LogoutAll </span>&nbsp;&nbsp;&nbsp;&nbsp;
         <span onClick={deleted}> DeleteAccount</span>
       </div>
       <div className="container">
         <h1 id="head">todo-app</h1>
         <hr />
         <form onSubmit={handler}>
           <input id="todo" type="text" placeholder="Add todo's" required autoComplete="off"/>
           <input id="submit" type="submit" value="Add" />
         </form>
         
         <ul>
             {
                 arr.map(item=>{
                     return(<li key={item._id}>{item.description} &nbsp;&nbsp;
                     <i  id={item._id} title={item.description} onClick={edittodo}  className="fa fa-edit edit"></i>
                     <i onClick={deletetodo} id={item._id} className="fa fa-trash-o delete"></i>
                     </li>)
                 })
             }
         </ul>
         
         <br />
       </div>
       <form id="edittodos" onSubmit={finaledit}>
           <p onClick={closeedit} id="cross">&times;</p>
           <input id="edi" type="text" placeholder="edit todo" autoFocus required/>
           <input id="sub" type="submit" value="Update"/>
       </form>
     </div>
     
   );
}

export default Main