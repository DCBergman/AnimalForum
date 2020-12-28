import React, { useContext, useEffect, useState } from "react";
import { Card  } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const Subforum = (props) => {
  const forumContext = useContext(ForumContext);
  const [subforums, setSubforums] = useState([]);

  useEffect(() => {
    fetchAllSubforums();
  }, []);

  const fetchAllSubforums = async () => {
    let allSubforums = await fetch("http://localhost:3000/api/subforums");
    console.log(allSubforums);
    setSubforums(await allSubforums.json());
  };

  useEffect(() => {
    console.log(subforums, " ", forumContext.subforums);
  }, [subforums]);

  return (
    <div className="sf-div">
      {subforums.map((s, i) => (
        <Card body outline color="secondary" key={i} className="subforum-card" >
          {s.title}
        </Card>
      ))}
    </div>
  );
};
export default Subforum;
