import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <>
      <Spinner
        animation="border"
        role="status"
        style={{ height: "100px", width: "100px", display: "block" }}
      ></Spinner>
      <span>Loading</span>
    </>
  );
}


export default Loader;
