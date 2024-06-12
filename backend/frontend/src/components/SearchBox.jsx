import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function SearchBox() {

    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()
    const keyChange = (e)=>{
        setKeyword(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(keyword !== ""){
            navigate(`/?keyword=${keyword}`)
        }
    }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="d-flex">
          <Form.Control type="text" value={keyword} onChange={keyChange}></Form.Control>
          <Button type="submit" variant="secondary">
            <FaSearch />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SearchBox;
