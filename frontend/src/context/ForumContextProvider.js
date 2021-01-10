import React, { createContext, useState } from "react";
export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const [subforums, setSubforums] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState([]);
  const [thread, setThread] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentSubforum, setCurrentSubforum] = useState(null);

  const fetchAllSubforums = async () => {
    let subforums = await fetch("/api/subforums", {
      method: "GET",
      credentials: "include",
    });
    subforums = await subforums.json();

    setSubforums(subforums);
  };

  const fetchLoggedInUser = async() => {
      let response = await fetch("/api/login", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      try {
        response = await response.json();
        if (response !== null) {
          return response;
        } else {
          console.log("add alert for wrong user info");
          return null; 
        }
      } catch {
        console.log("Bad credentials");
      }
  }

  const fetchPostsByThreadId = async (threadId) => {
    let posts = await fetch("/api/posts/" +
            threadId, {
      method: "GET",
      credentials: "include",
    });
    posts = await posts.json();
    setPosts(posts);
  }

    const fetchThreadById = async (id) => {
      let response = await fetch("/api/threads/" + id, {
        method: "GET",
        credentials: "include",
      });
      response = await response.json();


      setThread(response);
    };
    const changeThreadStatus = async (id, isOpen) => {
      console.log(JSON.stringify({isOpen: isOpen}));

        let response = await fetch("/api/threads/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOpen: isOpen }),
        });
        try {
          localStorage.setItem('thread-status', isOpen)
          response = await response.json();
          console.log(response);
           //setThread(response);
        } catch {
          console.log("Bad credentials");
        }
    };


  const values = {
    subforums,
    currentSubforum,
    isLoggedIn,
    posts,
    thread,
    fetchAllSubforums,
    setCurrentSubforum,
    fetchPostsByThreadId,
    fetchLoggedInUser,
    setIsLoggedIn,
    fetchThreadById,
    changeThreadStatus
  };

  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  );
};

export default ForumContextProvider;
