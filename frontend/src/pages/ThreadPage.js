import React, { useContext, useEffect, useState } from "react";
import { ForumContext } from "../context/ForumContextProvider";
import Post from "../components/Post";
import "../index.css";
import { Button, Col, Input, Label } from "reactstrap";

const ThreadPage = (props) => {
  const forumContext = useContext(ForumContext);
  const [user, setUser] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await forumContext.fetchPostsByThreadId(props.match.params.threadId);
    setUser(await forumContext.fetchLoggedInUser());
  }

  async function createPost(e) {
    e.preventDefault();

    // console.log(user.id);
    // setUserId(user.id);
    // setType("normal");
    // setThreadId(props.match.params.threadId);
    // setDate(Date.now());

    let userId = user.id;
    let type = "normal";
    let threadId = props.match.params.threadId;
    let date = Date.now();

    const credentials = {
      threadId,
      userId,
      content,
      type,
      date,
    };
    console.log("creds", credentials);

    let response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    try {
      response = await response.json();
      console.log(response);
      //setUser(response)
      // props.history.push("/");
    } catch {
      console.log("Bad credentials");
    }
    await forumContext.fetchPostsByThreadId(props.match.params.threadId);
  }
  useEffect(() => {
    console.log(forumContext.posts);
  }, [forumContext.posts]);

  return (
    <div className="thread-page-div">
      {forumContext.posts.map((p, i) => (
        <Post post={p} key={i} />
      ))}

      <div className="post-form">
        <Col sm={7}>
          <Input
            type="textarea"
            onChange={(e) => setContent(e.target.value)}
            className="post-input"
          />
        </Col>
        <Col sm={{ size: 10 }}>
          <Button className="post-button" onClick={createPost}>
            Submit
          </Button>
        </Col>
      </div>
    </div>
  );
};
export default ThreadPage;
