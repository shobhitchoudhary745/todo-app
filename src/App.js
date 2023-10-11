import React from 'react'
import { HashRouter, Route,Routes } from 'react-router-dom'
import Login from './routers/login'
import Signup from './routers/signup'

import Main from './routers/main'
function App(){
    return(
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/main" element={<Main />}/>
        </Routes>
    </HashRouter> 
    )
}

export default App;