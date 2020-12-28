import React, { useContext, useEffect, useState } from "react";
import { Card  } from "reactstrap";
import { ForumContext } from "../context/ForumContextProvider";
import "../index.css";

const Thread = (props) => {


  return (
    <div className="thread-div">
      <p className="thread-title">Title</p>
      <p className="thread-bottom-row">
        <p className="thread-date">date</p>
        <p className="thread-creator">creator</p>
      </p>
    </div>
  );

}
export default Thread; 