import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './routers/login'
import Signup from './routers/signup'
import Forgot from './routers/forgot'
import Main from './routers/main'
function App(){
    return(
      <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forgot" element={<Forgot />}/>
          <Route exact path="/main" element={<Main />}/>
      </Routes>
    </BrowserRouter> 
    )
}

export default App;