import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo from "../assets/images/temp-logo.png";

class Navbar extends Component {
    state = {  }
    render() { 
        return (
            <div className="navbar">
                <Link to="/" className="nav-link">
                    <img src={ logo } alt="Main logo" className="nav-logo" />
                </Link>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Task List</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create" className="nav-link">Create Task</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default Navbar;