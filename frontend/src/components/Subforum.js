import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card  } from "reactstrap";
import "../index.css";

const Subforum = (props) => {
  const [subforums, setSubforums] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchAllSubforums();
  }, []);

  const fetchAllSubforums = async () => {
    let allSubforums = await fetch("/api/subforums", {
      method: 'GET',
      credentials: 'include'
    });
    setSubforums(await allSubforums.json());
  };

  function redirect (id) {
    
    history.push('/threads/' + id);

  }


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
