//Import React to use JSX

import React from "react";
import "./styles/Badge.css";

//Define the badge component receive name, age and image as props 

const Badge = ({ name, age, image }) => {
    return (
        <div className="badge-container">
            <img src={`http://localhost:5000/${image}`} alt="{name}" className="Bade-image" />

            <h2 className="badge-name">{name}</h2>
            <p className="badge-age">Age:{age}</p>
        </div>
    );
};

export default Badge;