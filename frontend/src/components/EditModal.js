import React, { useContext, useEffect, useState } from "react";
import {
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const EditModal =(props)=>{
  const fc = useContext(ForumContext);
  const [editType, setEditType] = useState("");
  const [modForum, setModForum] = useState([]);
  const { className } = props;

  useEffect(() => {
    console.log(props.user);
    fc.fetchAllSubforums();
  }, []);

  useEffect(()=>{
    console.log(modForum);
  },[modForum])

  const handleChange=(event)=>{

    console.log(event.target.value);

  };

  const editUser=()=>{
    console.log(modForum);
    let userId = props.user.id;
    if(editType==="admin"){
      fc.changeUserRole(userId, editType);
    }else if(editType ==="moderator"){
      console.log(modForum);
      fc.addModeratorToSubforum(userId, modForum);
    }else if(editType==="delete"){
      fc.deleteUser(userId);

    }
    props.toggle();

  }

  const optionsArray = () => {
    const options = [];
    fc.subforums.map((sf, i) => (
      options.push(
        <option key={sf.id} value={sf.id}>
          {sf.title}
        </option>
      )
    ));
    return options;
  };

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
      <ModalHeader toggle={props.toggle}>Edit user</ModalHeader>
      <ModalBody>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="radio1"
              onChange={() => setEditType("admin")}
            />
            Make user admin
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="radio1"
              onChange={() => setEditType("moderator")}
            />
            Make user moderator of
          </Label>
          <FormGroup>
            <Label for="exampleSelect">subforum:</Label>
            <Input type="select" onChange={e=>setModForum(e.target.value)}>
              {optionsArray()}
            </Input>
          </FormGroup>
        </FormGroup>
        <Badge color="danger" className="danger-badge">
          <FormGroup className="delete-radio-btn" check>
            <Label check>
              <Input
                type="radio"
                name="radio1"
                onChange={() => setEditType("delete")}
              />
              Delete user
            </Label>
          </FormGroup>
        </Badge>
        <FormGroup>
          <Button
            className="confirm-btn"
            color="secondary"
            onClick={() => editUser()}
          >
            Confirm
          </Button>
        </FormGroup>
      </ModalBody>
    </Modal>
  );
}
export default EditModal;