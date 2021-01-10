import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroupItem } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const Post = (props) => {
  const forumContext = useContext(ForumContext);
  const [user, setUser] = useState([]);
  const [date, setDate] = useState([]);
  


  useEffect(() => {
   formatDate();
   fetchData();
    
  }, []);

  const formatDate =() =>{
    let date_ob = new Date(props.post.date);

    let date = ("0" + date_ob.getDate()).slice(-2);

    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();

    let hours = date_ob.getHours();

    let minutes = date_ob.getMinutes();


    setDate(
      year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes 
    );
  }

  async function deletePost(){
      await fetch("/api/posts/" + props.post.id, {
       method: "DELETE"
     });
     forumContext.fetchPostsByThreadId(props.post.threadId);
  }

  async function fetchData(){

     let response = await fetch("/api/users/" + props.post.userId, {
       method: "GET",
       headers: { "Content-Type": "application/json" },
     });
     try {
       response = await response.json();
       setUser(response);
     } catch {
       console.log("Bad credentials");
     }


  }


  return (
    <ListGroupItem className={props.post.type}>
      <div className="post-top-row">
        <p className="post-creator">{user.username}</p>
        <p className="post-date">{date}</p>
      </div>
      <div className="post-bottom-row">
        <p className="post-text">{props.post.content}</p>
        <Button className="post-delete-btn" onClick={deletePost}>Delete</Button>
      </div>
    </ListGroupItem>
  );
};
export default Post;
