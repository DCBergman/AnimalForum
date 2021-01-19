import React, { useContext, useEffect, useState } from "react";
import { ForumContext } from "../context/ForumContextProvider";
import { FaLock, FaLockOpen } from "react-icons/fa";
import Post from "../components/Post";
import "../index.css";
import { Button, Col, Input, Label, ListGroupItem, Row } from "reactstrap";

const ThreadPage = (props) => {
  const forumContext = useContext(ForumContext);
  const [user, setUser] = useState([]);
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState("");
  const [thread, setThread] = useState([]);
  const [warning, setWarning] = useState(false);
  const [postEnabled, setPostEnabled] = useState("");
  const [isModAdmin, setIsModAdmin] = useState(false);
  const [threadDate, setThreadDate] = useState("");
  const [threadCreator, setThreadCreator] = useState("");

  useEffect(() => {
    if (forumContext.thread.isOpen !== undefined) {
      localStorage.setItem("thread-status", forumContext.thread.isOpen);
    }
    if (localStorage.getItem("thread-status") !== undefined) {
      setIsOpen(
        localStorage.getItem("thread-status", forumContext.thread.isOpen)
      );
    }
    setThread(props.location.state.thread);
    formatDate();
    fetchData();
  }, []);

  async function fetchData() {
    await forumContext.fetchPostsByThreadId(props.match.params.threadId);
    setUser(await forumContext.fetchLoggedInUser());

   

       let response = await fetch("/api/users/" + props.location.state.thread.creator, {
         method: "GET",
         credentials: "include",
       });
       response = await response.json();

        console.log(response);
       setThreadCreator(response);
  }

  const formatDate =() =>{
    let date_ob =  new Date(props.location.state.thread.date);

    let date = ("0" + date_ob.getDate()).slice(-2);

    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();

    let hours = date_ob.getHours();

    let minutes = date_ob.getMinutes();


    setThreadDate(
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


  const fetchModForums = async () => {
    if(user){
      await forumContext.fetchSubforumByModeratorId(user.id);
    }
  };

  useEffect(() => {
    fetchModForums();
  }, [user]);

  useEffect(() => {
    checkUserPriv();
  }, [forumContext.currentModForums]);



  const checkUserPriv = async () => {
     if (user) {
      // fetchModForums();
      if (user.userRole === "basicUser" && isOpen) {
        setPostEnabled(true);
      } else if (user.userRole === "admin") {
        setPostEnabled(true);
        setIsModAdmin(true);
      } else if (
        user.userRole === "moderator" &&
        forumContext.currentModForums.length > 0
      ) {
       let forums = forumContext.currentModForums;

       console.log(forumContext.currentModForums);
       for (let i = 0; i < forums.length; i++) {
         console.log(forums[i], props.match.params.subforumId);
         if (forums[i].id == props.match.params.subforumId) {
           console.log("check");
           setIsModAdmin(true);
            setPostEnabled(true);
         }
         else{
           setIsModAdmin(false);
           setPostEnabled(true);
         }
       }
       
      } else {
        setPostEnabled(false);
      }
    } else {
      setPostEnabled(false);
    }
  };

  async function updateStatus() {
    let status = localStorage.getItem("thread-status");
    let id = props.match.params.threadId;
    console.log(status);

    if (status === "true") {
      setIsOpen(false);
      forumContext.changeThreadStatus(id, "false");
    } else if (status === "false") {
      setIsOpen(true);
      forumContext.changeThreadStatus(id, "true");
    }
  }
  useEffect(() => {
    console.log("post", postEnabled, " user ", user);
    console.log(isOpen);
  }, [isOpen]);
  useEffect(() => {
    console.log(isModAdmin);
  }, [isModAdmin]);

  async function createPost(e) {
    e.preventDefault();

    let type = "";
    if (warning) {
      type = "warning";
    } else {
      type = "normal";
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
      setContent("");
      //setUser(response)
      // props.history.push("/");
    } catch {
      console.log("Bad credentials");
    }
    await forumContext.fetchPostsByThreadId(props.match.params.threadId);
  }
  useEffect(() => {
    console.log(props);
  }, [forumContext.currentModForums]);

  return (
    <div className="thread-page-div">
      <ListGroupItem className="thread-header list-group-item list-group-item-dark">
        <div className="post-top-row">
          <p className="thread-page-title">{thread.title}</p>
          <p className="post-date">{threadDate}</p>
        </div>
        <div className="post-bottom-row">
          <p className="post-text">{thread.description}</p>
          <p className="thread-page-creator">{threadCreator.username}</p>
        </div>
      </ListGroupItem>
      {forumContext.posts.map((p, i) => (
        <Post post={p} key={i} />
      ))}

      {postEnabled ? (
        <div className="post-form">
          <Row>
            <Col sm={{ size: 7, offset: 0 }}>
              <Input
                value={content}
                type="textarea"
                onChange={(e) => setContent(e.target.value)}
                className="post-input"
              />
            </Col>
            <Col className="checkbox-col" sm={{ size: "auto" }}>
              {isModAdmin && (
                <div>
                  <Row>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={() => setWarning(!warning)}
                      />{" "}
                      Check to create warning post
                    </Label>
                  </Row>
                  <Row>
                    <Button className="lock-btn" onClick={() => updateStatus()}>
                      {isOpen ? (
                        <div className="lock-btn-div">
                          Lock thread
                          <FaLockOpen className="lock-icon" />
                        </div>
                      ) : (
                        <div className="lock-btn-div">
                          Unlock thread
                          <FaLock className="lock-icon" />
                        </div>
                      )}
                    </Button>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
          <Col className="btn-col" sm={{ size: 10 }}>
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
