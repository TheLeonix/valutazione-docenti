import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Pag/Home";
import Login from "./Pag/Login";
import Vote from "./Pag/Vote";
import "./CSS/SideMenu.css"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/" element={<Login />} />
                <Route path="/Vote/:professorName/:professorSurname" element={<Vote />} />
                
            </Routes>
        </Router>
    );
}
 
export default App;