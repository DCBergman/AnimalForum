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

  const editUser=()=>{
    console.log(modForum);
    let userId = props.user.id;
    if(editType==="admin"){
      fc.changeUserRole(userId, editType);
    }else if(editType ==="moderator"){
      console.log(modForum);
      fc.addModeratorToSubforum(userId, modForum);
    }else if(editType==="removeModerator"){
      console.log(modForum);
      fc.removeModeratorfromSubforum(modForum, userId);
      fc.fetchAllModerators();
    }else if(editType==="delete"){
      fc.deleteUser(userId);

    }
    props.toggle();

  }
  useEffect(()=>{
    console.log(fc.moderators);
    isUserModerator(props.user.id);
  },[fc.moderators])

  const isUserModerator=(id)=>{
    fc.moderators.forEach(mod => {
      if(mod.userId===id){
        return;
      }else{
        fc.changeUserRole(id, "basicUser");
      }
      
    });
  }

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