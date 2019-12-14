import React from 'react'
import {
    Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Sidebar</h3>
                </div>

                <ul className="list-unstyled components">
                    <li>
                     <Link to="/">   <a href="#">Home</a> </Link>
                    </li>
                    <li>
                    <Link to="/visitors">       <a href="#">Visitors</a> </Link>
                    </li>
                </ul>
              
            </nav>
        </div>
    )
}
