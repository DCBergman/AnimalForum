import React, { useEffect, useState, useContext } from "react";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";
import Card  from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import User from "../components/User";

const AdminPage = (props) => {
  const forumContext= useContext(ForumContext);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    forumContext.fetchAllUsers();
  },[]);

  // const fetchAllUsers = async ()=>{
  //   let response = await fetch("/api/users", {
  //     method: "GET",
  //     credentials: "include",
  //   });
  //   response = await response.json();

  //   setUsers(response);

  // }

  useEffect(()=> {
    setUsers(forumContext.users)
    console.log(forumContext.users)
  },[forumContext.users]);

    return (
      <div className="accordion-div">
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Users
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card>
                {users.map((u, i) => (
                  <User user={u} key={i} />
                ))}
                <User />
              </Card>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
}
export default AdminPage;