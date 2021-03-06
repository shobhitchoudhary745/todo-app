import React from 'react'
import { HashRouter, Route,Switch } from 'react-router-dom'
import Login from './routers/login'
import Signup from './routers/signup'
import Forgot from './routers/forgot'
import Main from './routers/main'
function App(){
    return(
      <HashRouter>
        <Switch>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forgot" element={<Forgot />}/>
          <Route exact path="/main" element={<Main />}/>
        </Switch>
    </HashRouter> 
    )
}

export default App;