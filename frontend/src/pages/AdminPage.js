import React, { useEffect, useState, useContext } from "react";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";
import Card  from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import User from "../components/User";
import { Alert } from "reactstrap";

const AdminPage = (props) => {
  const forumContext= useContext(ForumContext);
  const [users, setUsers] = useState([]);
  const [allowed, setAllowed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState([]);

  useEffect(()=>{
    forumContext.fetchAllUsers();
    
    getLoggedInUser();
  },[]);
  

  const getLoggedInUser = async()=> {

    setLoggedInUser(await forumContext.fetchLoggedInUser());

  }

  useEffect(()=>{

    console.log(loggedInUser);
    checkUser();
  },[loggedInUser])

  const checkUser =()=>{
    if(loggedInUser!== null){
      if(loggedInUser.userRole ==="admin"){
        setAllowed(true);
      }
      else{
        setAllowed(false);
      }
    }else{
      setAllowed(false);
    }
  }

  useEffect(()=>{
    console.log(allowed);
  },[allowed])
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
        {allowed ?
        <Accordion>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              className="acc-header"
              eventKey="0"
            >
              Users
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card>
                {users.map((u, i) => (
                  <User user={u} key={i} />
                ))}
              </Card>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              className="acc-header"
              as={Card.Header}
              eventKey="1"
            >
              Subforums
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        :
        <Alert className="admin-warning" color="warning">
          Stopp och belägg! Denna sidan är till för administratörer!
        </Alert>        }
      </div>
    );
}
export default AdminPage;