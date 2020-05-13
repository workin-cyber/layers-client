import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Users from './Users'
import Login from './Login'

function App() {
  return <main>
    <Switch>
      <Route path='/' exact component={Users} />
      <Route path='/login' component={Login} />
    </Switch>
  </main>
}

export default App;
