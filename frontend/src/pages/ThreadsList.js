import React, { useContext, useEffect, useState } from "react";
import { Card  } from "reactstrap";
import Thread from "../components/Thread";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const ThreadsList = (props) => {  
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetchAllThreadsFromSubforum();
  },[])

  const fetchAllThreadsFromSubforum = async () => {
        let threads = await fetch(
          "/api/subforums/threads/" +
            props.match.params.subforumId,
          {
            method: "GET",
            credentials: "include",
          }
        );
        console.log("context ", threads);
        threads = await threads.json();

        console.log(threads);
        setThreads(threads);
  }

  useEffect(() => {
    console.log(threads);
  },[threads])

return(
  <div className="threads-list">
    {threads.map((t, i) => (
      <Thread key={i} thread={t}/>
    ))}
  </div>
)
}
export default ThreadsList; 