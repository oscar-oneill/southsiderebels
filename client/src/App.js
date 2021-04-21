import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Roster from './routes/Roster';
import { RosterContextProvider } from './context/RosterContext';
import Add from './routes/Add';
import EditPlayer from './routes/EditPlayer';
import Home from './routes/Home';
import Edit from './routes/Edit';
import Login from './routes/Login';
import Register from './routes/Register';
import Navigation from './Components/Navigation';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:8980/auth/verified", {
        method: "GET",
        headers: { token : localStorage.token }
      });

      const data = await response.json();
      
      data === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

      if (data === true) {
        const response = await fetch("http://localhost:8980/user", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            
        const user = await response.json();
        setRole(user.credentials);

      } else {
        setRole(null)
      }

    } catch (error) {
        console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth()
  });

  return (
    <RosterContextProvider>
      <Router>
        <div className="App">
            <Route exact path="/" component={Home}/>
            <Route exact path="/auth/login" render={props => !isAuthenticated ? <Login {...props} setAuth = {setAuth} /> : <Redirect to="/roster"/>}/>
            <Navigation render={props => isAuthenticated ? <Navigation {...props} setAuth = {setAuth}/> : ""}/>
            <Route exact path="/roster" render={props => isAuthenticated ? <Roster {...props} setAuth = {setAuth} /> : <Redirect to="/auth/login"/>}/>
            <Route exact path="/add" render={props => isAuthenticated && (role === "master" || role === "admin") ? <Add {...props} setAuth = {setAuth} /> : <Redirect to="/auth/login"/>}/>
            <Route exact path="/edit" render={props => isAuthenticated && (role === "master" || role === "admin") ? <EditPlayer {...props} setAuth = {setAuth} /> : <Redirect to="/auth/login"/>}/>
            <Route exact path="/edit/:id/update" render={props => isAuthenticated && (role === "master" || role === "admin") ? <Edit {...props} setAuth = {setAuth} /> : <Redirect to="/auth/login"/>}/>
            <Route exact path="/auth/register" render={props => isAuthenticated && (role === "master") ? <Register {...props} setAuth = {setAuth} /> : <Redirect to="/auth/login"/>}/>
        </div>
      </Router>
    </RosterContextProvider>
  );
}

export default App;
