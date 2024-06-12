import React, { useEffect } from "react";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "../action/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

function UserListPage() {
  const dispatch = useDispatch();
  const { userList, loading, error } = useSelector((state) => state.userList);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {success: successDelete} = useSelector((state) => state.userDelete) 
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getUserList());
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const handleEdit = (_id) => {
    navigate(`/admin/user/${_id}`)
  };
  const handleDelete = (_id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(_id));
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message type={"danger"} message={error} />;
  }
  return (
    <Container>
      <Row>
        <h1>Users</h1>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? <FcCheckmark /> : <FaXmark />}</td>
                <td>
                  <Button
                    size="sm"
                    className="m-1"
                    onClick={() => {
                      handleEdit(user._id);
                    }}
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="m-1"
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                    <FaRegTrashCan />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default UserListPage;
