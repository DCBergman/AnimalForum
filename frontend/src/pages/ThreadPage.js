import React, { useContext, useEffect, useState } from "react";
import { ForumContext } from "../context/ForumContextProvider";
import Post from "../components/Post";
import "../index.css";
import { Button, Col, Input, Label, Row } from "reactstrap";

const ThreadPage = (props) => {
  const forumContext = useContext(ForumContext);
  const [user, setUser] = useState([]);
  const [content, setContent] = useState("");
  const [allowed, setAllowed] = useState("");
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await forumContext.fetchPostsByThreadId(props.match.params.threadId);
    setUser(await forumContext.fetchLoggedInUser());
  }

  async function createPost(e) {
    e.preventDefault();

    let type="";
    if(warning){
      type="warning";
    }else{
      type="normal";
    }

    let userId = user.id;
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

      {user ? (
        <div className="post-form">
          <Row>
            <Col sm={7}>
              <Input
                type="textarea"
                onChange={(e) => setContent(e.target.value)}
                className="post-input"
              />
            </Col>
            <Col className="checkbox-col" sm={{ size: "auto", offset: 7 }}>
              {(user.userRole === "moderator" || "admin") && (
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={() => setWarning(!warning)}
                  />{" "}
                  Check to create warning post
                </Label>
              )}
            </Col>
          </Row>
          <Col sm={{ size: 10 }}>
            <Button className="post-button" onClick={createPost}>
              Submit
            </Button>
          </Col>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ThreadPage;
