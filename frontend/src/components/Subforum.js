import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Card  } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const Subforum = (props) => {
  const forumContext = useContext(ForumContext);
  const [subforums, setSubforums] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchAllSubforums();
  }, []);

  const fetchAllSubforums = async () => {
    let allSubforums = await fetch("http://localhost:3000/api/subforums");
    console.log(allSubforums);
    setSubforums(await allSubforums.json());
  };

  function redirect (id) {
    console.log(id);
    history.push('/threads/' + id);

  }

  useEffect(() => {
    console.log(subforums, " ", forumContext.subforums);
  }, [subforums]);

  return (
    <div className="sf-div">
      {subforums.map((s, i) => (
        <Card
          body
          outline
          color="secondary"
          key={i}
          className="subforum-card"
          onClick={() => redirect(s.id)}
        >
          {s.title}
        </Card>
      ))}
    </div>
  );
};
export default Subforum;
