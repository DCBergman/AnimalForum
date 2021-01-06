import React, { createContext, useState } from "react";
export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const [subforums, setSubforums] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState([]);
  const [threads, setThreads] = useState([]);
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
      console.log(response);
      try {
        response = await response.json();
        console.log(response);
        if (response !== null) {
          return response;
        } else {
          console.log("add alert for wrong user info");
          return "you must log in"; 
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

    console.log("posts ", posts);
    setPosts(posts);
  }


  const values = {
    subforums,
    currentSubforum,
    isLoggedIn,
    posts,
    fetchAllSubforums,
    setCurrentSubforum,
    fetchPostsByThreadId,
    fetchLoggedInUser,
    setIsLoggedIn,
  };

  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  );
};

export default ForumContextProvider;
