import React from 'react';
import { addToList, removeFromList } from '../services/userService';

const AddListButton = ({internship, user, updateUser}) => {
    let classes = "btn btn-sm";
    let text = "";
    let add = true;
    if(user.interestList.includes(internship._id)){
        classes  += " btn-danger";
        text = "Remove";
        add = false;
    } 
    else {
        classes += " btn-primary";
        text = "Add";
    }

    const handleClick = async() => {
        let newUser;
        if (add) newUser = await addToList(internship._id, user._id);
        else newUser = await removeFromList(internship._id, user._id);
        updateUser(newUser);
        //console.log(newUser);
    }
    
    return (
        <button 
            className={classes} 
            onClick={()=> handleClick()}
            style={{ cursor: "pointer" }}
        >
            {text}
        </button>
    );
}
 
export default AddListButton;