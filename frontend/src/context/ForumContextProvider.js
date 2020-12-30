import React, { createContext, useState } from "react";
export const ForumContext = createContext();


const ForumContextProvider = (props) => {
  const [subforums, setSubforums] = useState([]); 
  const [threads, setThreads] = useState([]); 
  const [currentSubforum, setCurrentSubforum] = useState(null);

  const fetchAllSubforums = async () => {
    let subforums = await fetch("localhost:3000/api/subforums");
    console.log("context ", subforums);
    subforums = await subforums.json(); 

    console.log("context ", subforums);
    setSubforums(subforums)
  };

  const values = {
    subforums,
    currentSubforum, 
    fetchAllSubforums,
    setCurrentSubforum,
  };

  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  );



};

export default ForumContextProvider;