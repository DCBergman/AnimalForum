import React, { useContext, useEffect, useState } from "react";
import {ListGroupItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Badge} from "reactstrap";
import "../index.css";

const User =(props)=>{

    const { className } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

  useEffect(() =>{
    console.log(props.user);
  },[])
if(props.user){
  return (
    <div>
      <ListGroupItem className="user-li">
        <span className="user-li-name">{props.user.username}</span>
        <Button className="edit-user-btn" onClick={toggle}>
          Edit
        </Button>
      </ListGroupItem>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit user</ModalHeader>
        <ModalBody>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />
              Make user admin
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />
              Make user moderator
            </Label>
            <FormGroup>
              <Label for="exampleSelect">Select subforum:</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
          </FormGroup>
          <Badge color="danger" className="danger-badge">
            <FormGroup className="delete-radio-btn" check>
              <Label check>
                <Input type="radio" name="radio1" />
                Delete user
              </Label>
            </FormGroup>
            </Badge>
          <FormGroup>
            <Button className="confirm-btn" color="secondary">
              Confirm
            </Button>
          </FormGroup>
        </ModalBody>
      </Modal>
    </div>
  );
}else{return null;}
}
export default User;