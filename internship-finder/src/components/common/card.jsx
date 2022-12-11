import React from 'react';
import { useEffect, useState } from 'react';
import { getInternship } from '../../services/internshipService';
import { Link } from "react-router-dom";
import {getColor} from "./tableBody"


const Card = ({internshipId}) => {
    console.log(internshipId);
    useEffect(() => {
        getInternship(internshipId).then((internship)=>setInternship(internship.data));
    }, [internshipId])
    const [internship, setInternship] = useState()
    if (!internship)return <div>Loading</div>
    const {tags,pay,title,link,provider,requirements} = internship;
    console.log(internship);
    return ( 
        <div className="card bg-light">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h1>{`Provided by ${provider} `}</h1>
                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                <ul className="list-group list-group-flush {}">
                    <li className={`list-group-item get${(pay)=>getColor(this.pay)}`}>{pay}</li>
                </ul>
                <h3>Tags</h3>
                <ul>
                    {tags?.map((item,idx) => (
                        <li key={`cardItem_${idx}${item}`}>{item}</li>
                    ))}
                </ul>
                <h3>Eligibility</h3>
                <ul>
                    {requirements?.map((item,idx) => (
                        <li key={`cardItem_${idx}${item}`}>{item}</li>
                    ))}
                </ul>
                <div className="card-body">
                    <a href={link} target="_blank"className="card-link">{link}</a>
                </div>
            </div>
            
        </div>
    );
}
 
export default Card;