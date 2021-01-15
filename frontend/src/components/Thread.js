import React, { useEffect, useState } from "react";
import "../index.css";

const Thread = (props) => {
  const [creator, setCreator] = useState([]);
  const [date, setDate] = useState("");

  useEffect(()=>{
    getCreator();
    formatDate();
    console.log(props);
  },[])

  const formatDate = () => {
    let date_ob = new Date(props.thread.date);

    let date = ("0" + date_ob.getDate()).slice(-2);

    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();

    let hours = date_ob.getHours();

    let minutes = date_ob.getMinutes();

    setDate(year + "-" + month + "-" + date + " " + hours + ":" + minutes);
  };


  const getCreator = async() =>{
        let fetchedCreator = await fetch("/api/users/" + props.thread.creator,{
          method: 'GET',
          credentials: 'include'
        });
        setCreator(await fetchedCreator.json());
  }


  return (
    <div className="thread-div">
      <p className="thread-title">{props.thread.title}</p>
      <div className="thread-bottom-row">
        <p className="thread-date">{date}</p>
        <p className="thread-creator">{creator.username}</p>
      </div>
    </div>
  );

}
export default Thread; 