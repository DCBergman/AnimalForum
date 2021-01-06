import React, { useContext, useEffect, useState } from "react";
import { Card, ListGroupItem } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const Post = (props) => {
  const [user, setUser] = useState([]);
  const [date, setDate] = useState([]);
  


  useEffect(() => {
    setDate(new Date(props.post.date).toISOString().substring(0, 10));
   fetchData();
    
  }, []);

  async function fetchData(){

     //console.log("date ", date.toISOString().substring(0, 10));
     let response = await fetch("/api/users/" + props.post.userId, {
       method: "GET",
       headers: { "Content-Type": "application/json" },
     });
     console.log(response);
     try {
       response = await response.json();
       setUser(response);
     } catch {
       console.log("Bad credentials");
     }

  }


  return (
    <ListGroupItem className="post-div">
      <div className="post-top-row">
        <p className="post-creator">{user.username}</p>
        <p className="post-date">{date}</p>
      </div>
      <p className="post-text">{props.post.content}</p>
    </ListGroupItem>
  );
};
export default Post;
