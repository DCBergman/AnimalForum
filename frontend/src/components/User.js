import React, { useContext, useEffect, useState } from "react";
import { ListGroupItem, Button } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";
import EditModal from "./EditModal";

const User = (props) => {
  const fc = useContext(ForumContext);
  const [editType, setEditType] = useState("");
  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // useEffect(() => {
  //   console.log(props.user);
  //   fc.fetchAllSubforums();
  // }, []);

  // const editUser=(props)=>{
  //   console.log(editType);
  // }
  // const optionsArray = () => {
  //   const options = [];
  //   fc.subforums.forEach((sf) => {
  //     options.push(<option key={sf.id}>{sf.title}</option>);
  //   });
  //   return options;
  // };

  if (props.user) {
    return (
      <div>
        <ListGroupItem className="user-li">
          <span className="user-li-name">{props.user.username}</span>
          <Button className="edit-user-btn" onClick={toggle}>
            Edit
          </Button>
        </ListGroupItem>

        {modal ? <EditModal user={props.user} modal={modal} toggle={toggle} /> : ""}
      </div>
    );
  } else {
    return null;
  }
};
export default User;
