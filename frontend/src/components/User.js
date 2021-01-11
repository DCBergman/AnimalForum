import React, { useContext, useEffect, useState } from "react";
import {ListGroupItem, Button} from "reactstrap";
import "../index.css";

const User =(props)=>{

  useEffect(() =>{
    console.log(props.user);
  },[])
if(props.user){
  return (
    <div>
      <ListGroupItem className="user-li">
        <span className="user-li-name">{props.user.username}</span>
        <Button className="edit-user-btn">Edit</Button>
      </ListGroupItem>
    </div>
  );
}else{return null;}
}
export default User;