import React from 'react';
import { Link } from "react-router-dom";

const Card = (internship) => {
    const {title, genre, pay,link} = internship;
    return ( 
        <div className="card" style="width: 18rem;">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{genre}</li>
                <li className="list-group-item">{pay}</li>
                <li className="list-group-item">{}</li>
            </ul>
            <div className="card-body">
                <a href="#" className="card-link">Card link</a>
            </div>
        </div>
    );
}
 
export default Card;