import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";

const Subforum = (props) => {
  const forumContext = useContext(ForumContext);
  const [subforums, setSubforums] = useState([]);

  useEffect(() => {
    fetchAllSubforums();
  }, []);

  const fetchAllSubforums = async () => {
    // await forumContext.fetchAllSubforums();
    let allSubforums = await fetch("http://localhost:3000/api/subforums");
    console.log(allSubforums);
    setSubforums(await allSubforums.json());
  };

  useEffect(() => {
    console.log(subforums, " ", forumContext.subforums);
  }, [subforums]);

  return (
    subforums.map((s, i) =>(
      <Container className="themed-container" fluid="sm">{s.title}</Container>
    ))
  );
};
export default Subforum;
