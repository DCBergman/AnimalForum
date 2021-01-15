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
    fc.fetchSubforumByModeratorId(props.user.id);
  }, []);

  useEffect(()=>{
    console.log(fc.currentModForums);
  },[fc.currentModForums])

  const editUser=async ()=>{
    console.log(modForum);
    let userId = props.user.id;
    if(editType==="admin"){
     await fc.changeUserRole(userId, editType);
    }else if(editType ==="moderator"){
      console.log(modForum);
     await fc.addModeratorToSubforum(userId, modForum);
    }else if(editType==="removeModerator"){
      console.log(modForum);
      await fc.removeModeratorfromSubforum(modForum, userId);
      await fc.fetchSubforumByModeratorId(userId);
      
    }else if(editType==="delete"){
     await fc.deleteUser(userId);

    }
    props.toggle();

  }
  useEffect(()=>{
    updateUserRole();
  },[fc.currentModForums])

  const updateUserRole= async ()=>{
    let forums = await fc.fetchAllModerators();
    console.log(forums);
    if(fc.currentModForums.length===0){
      fc.changeUserRole(props.user.id, "basicUser");
    }
  };


  const optionsArray = () => {
    const options = [
      <option disabled selected value>
        {" "}
        -- select an option --{" "}
      </option>,
    ];
    fc.subforums.map((sf, i) => (
      options.push(
        <option key={sf.id} value={sf.id}>
          {sf.title}
        </option>
      )
    ));
    return options;
  };

  const currentForumsArray = () => {
    const options = [
      <option disabled selected value>
        {" "}
        -- select an option --{" "}
      </option>,
    ];
    // console.log(fc.currentModForums.filter((f) => f.id));
    fc.currentModForums
      .filter((cf) => cf.id)
      .map((cf, i) =>
        options.push(
          <option key={cf.id} value={cf.id}>
            {cf.title}
          </option>
        )
      );
    return options;
  };

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
      <ModalHeader toggle={props.toggle}>Edit user</ModalHeader>
      <ModalBody>
        {props.user.userRole !== "admin" ?(
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
        ):("")}
        {props.user.userRole === "moderator" ? (
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio1"
                onChange={() => setEditType("removeModerator")}
              />
              Remove moderator role from user
            </Label>
            <FormGroup>
              <Label for="exampleSelect">for subforum:</Label>
              <Input
                type="select"
                onChange={(e) => setModForum(e.target.value)}
              >
                {currentForumsArray()}
              </Input>
            </FormGroup>
          </FormGroup>
        ) : ("")}
        {props.user.userRole !== "admin" ? (
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
              <Input
                type="select"
                onChange={(e) => setModForum(e.target.value)}
              >
                {optionsArray()}
              </Input>
            </FormGroup>
          </FormGroup>
          ):("")}
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