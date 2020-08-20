import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import TodoList from "./components/todo-list.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";

class App extends Component {
  state = {  }
  render() { 
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="container">
          <Navbar />
          <div className="main">
            <Route path="/" exact component={TodoList} />
            <Route path="/edit/:id" exact component={EditTodo} />
            <Route path="/create" exact component={CreateTodo} />
          </div>
        </div>
      </Router>
    );
  }
}
 
export default App;