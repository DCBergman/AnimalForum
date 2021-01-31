import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "reactstrap";
import Thread from "../components/Thread";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const ThreadsList = (props) => {
  const forumContext = useContext(ForumContext);
  const history = useHistory();
  const [threads, setThreads] = useState([]);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [user, setUser] = useState([]);

  useEffect(() => {
    fetchAllThreadsFromSubforum();
    fetchData();
  }, []);

  const fetchData=async()=>{
    
    setUser(await forumContext.fetchLoggedInUser());
  }

  async function createThread(e) {
    e.preventDefault();

    console.log(user);

    let creator = user.id;
    let subforumId = props.match.params.subforumId;
    let date = Date.now();
    let isOpen = "true";

    const credentials = {
      creator,
      title,
      description,
      date,
      isOpen,
      subforumId,
    };
    let response = await fetch("/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    try {
      response = await response.json();
      //console.log(response);
      setDescription("");
      setTitle("");
      //setUser(response)
      // props.history.push("/");
    } catch {
      console.log("Bad credentials");
    }
    fetchAllThreadsFromSubforum();
  }


  async function goToPage(t) {
    await forumContext.fetchThreadById(t.id);
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
    <div>
      <div className="threads-list">
        {threads.map((t, i) => (
          <div key={i} onClick={() => goToPage(t)}>
            <Thread thread={t} />
          </div>
        ))}
      </div>
      {user ? (
        <Form className="create-thread-form">
          <Row>
            <Input
              className="thread-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Thread title"
            />
          </Row>
          <Row>
            <Col sm={{ size: 7, offset: 0 }}>
              <Input
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add thread description"
                className="post-input"
              />
            </Col>
          </Row>
          <Col className="btn-col" sm={{ size: 10 }}>
            <Button className="post-button" onClick={createThread}>
             Skicka
            </Button>
          </Col>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};
export default ThreadsList;
