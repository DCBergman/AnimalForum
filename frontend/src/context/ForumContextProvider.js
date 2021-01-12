import React, { createContext, useState } from "react";
export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const [subforums, setSubforums] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState([]);
  const [thread, setThread] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [currentModForums, setCurrentModForums] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentSubforum, setCurrentSubforum] = useState(null);

  const fetchAllSubforums = async () => {
    let subforums = await fetch("/api/subforums", {
      method: "GET",
      credentials: "include",
    });
    subforums = await subforums.json();

    setSubforums(subforums);
  };
  const fetchAllUsers = async () => {
    let response = await fetch("/api/users", {
      method: "GET",
      credentials: "include",
    });
    response = await response.json();

    setUsers(response);
  };
  const fetchAllModerators = async () => {
    let response = await fetch("/api/moderators", {
      method: "GET",
      credentials: "include",
    });
    response = await response.json();

    setModerators(response);
  };

  const fetchLoggedInUser = async () => {
    let response = await fetch("/api/login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    try {
      response = await response.json();
      if (response !== null) {
        return response;
      } else {
        return null;
      }
    } catch {
      console.log("Bad credentials");
    }
  };

  const fetchPostsByThreadId = async (threadId) => {
    let posts = await fetch("/api/posts/" + threadId, {
      method: "GET",
      credentials: "include",
    });
    posts = await posts.json();
    setPosts(posts);
  };
  // const fetchThreadsBySubforumId = async (subforumId) => {
  //   let posts = await fetch("/api/posts/" + threadId, {
  //     method: "GET",
  //     credentials: "include",
  //   });
  //   posts = await posts.json();
  // };

  const fetchThreadById = async (id) => {
    let response = await fetch("/api/threads/" + id, {
      method: "GET",
      credentials: "include",
    });
    response = await response.json();

    setThread(response);
  };

  const fetchSubforumByModeratorId = async (id) => {
    let response = await fetch("/api/subforums/user/" + id, {
      method: "GET",
      credentials: "include",
    });
    try{
      response = await response.json();
      console.log(response.filter((r) => r.id));
      setCurrentModForums(response.filter((r) => r.id));
    }catch{
      console.log("error");
    }

  }
  const addModeratorToSubforum = async (userId, subforumId) => {
    let response = await fetch("/api/moderators/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({subforumId:subforumId, userId: userId}),
    });
    try {
      response = await response.json();
      console.log(response);
      changeUserRole(userId, "moderator");
    } catch {
      console.log("Error");
    }
  };

  const deleteUser = async (id) => {
    let response = await fetch("/api/users/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    try {
      response = await response.json();
      console.log(response);
    } catch {
      console.log("Error");
    }
  };

  const removeModeratorfromSubforum = async (subforumId, userId) => {
    let response = await fetch("/api/moderators/" + subforumId + "/" + userId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    try {
      response = await response.json();
      console.log(response);
    } catch {
      console.log("Error");
    }
  };

  const changeUserRole = async (id, userRole) => {
    let response = await fetch("/api/users/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userRole: userRole }),
    });
    try {
      response = await response.json();
      console.log(response);
      //setThread(response);
    } catch {
      console.log("Bad credentials");
    }
  };
  const changeThreadStatus = async (id, isOpen) => {
    let response = await fetch("/api/threads/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOpen: isOpen }),
    });
    try {
      localStorage.setItem("thread-status", isOpen);
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
    users,
    moderators,
    currentModForums,
    fetchAllSubforums,
    fetchAllUsers,
    fetchAllModerators,
    setCurrentSubforum,
    fetchPostsByThreadId,
    fetchSubforumByModeratorId,
    fetchLoggedInUser,
    setIsLoggedIn,
    fetchThreadById,
    addModeratorToSubforum,
    deleteUser,
    changeUserRole,
    changeThreadStatus,
    removeModeratorfromSubforum
  };

  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  );
};

export default ForumContextProvider;
