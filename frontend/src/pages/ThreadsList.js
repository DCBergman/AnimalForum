import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Thread from "../components/Thread";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const ThreadsList = (props) => {
  const forumContext = useContext(ForumContext);
  const history = useHistory();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetchAllThreadsFromSubforum();
  }, []);

  async function goToPage(t) {
    await forumContext.fetchThreadById(t.id);
    console.log("clicked");
    history.push({
      pathname: "/threads/" + props.match.params.subforumId + "/" + t.id,
      state:{
        thread:t,
      },
    });
  }

  const fetchAllThreadsFromSubforum = async () => {
    let threads = await fetch(
      "/api/subforums/threads/" + props.match.params.subforumId,
      {
        method: "GET",
        credentials: "include",
      }
    );
    console.log("context ", threads);
    threads = await threads.json();

    console.log(threads);
    setThreads(threads);
  };

  useEffect(() => {
    console.log(threads);
  }, [threads]);

  return (
    <div className="threads-list">
      {threads.map((t, i) => (
        <div key={i} onClick={() => goToPage(t)}>
          <Thread
            thread={t}
          />
        </div>
      ))}
    </div>
  );
};
export default ThreadsList;
