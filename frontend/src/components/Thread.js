import React, { useContext, useEffect, useState } from "react";
import { Card  } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const Thread = (props) => {
  const [creator, setCreator] = useState([]);

  useEffect(()=>{
    getCreator();
    console.log(props.thread);
  },[])

  const getCreator = async() =>{
        let fetchedCreator = await fetch("/api/users/" + props.thread.creator,{
          method: 'GET',
          credentials: 'include'
        });
        console.log(fetchedCreator.username);
        setCreator(await fetchedCreator.json());
  }


  return (
    <div className="thread-div">
      <p className="thread-title">{props.thread.title}</p>
      <div className="thread-bottom-row">
        <p className="thread-date">{props.thread.date}</p>
        <p className="thread-creator">{creator.username}</p>
      </div>
    </div>
  );

}
export default Thread; 