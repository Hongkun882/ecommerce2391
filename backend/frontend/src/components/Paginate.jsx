import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";

function Paginate({ pages, page, keyword, isAdmin }) {
  const currentPage = parseInt(page, 10);
  const navigate = useNavigate();
  const goToPage = (i) => {
    if (isAdmin) {
      navigate(`/admin/products/?page=${i}`);
    } else {
      if (keyword) {
        navigate(`/?keyword=${keyword}&page=${i}`);
      } else {
        navigate(`/?page=${i}`);
      }
    }
  };
  return (
    <Pagination>
      {[...Array(pages).keys()].map((i) => (
        <Pagination.Item
          active={currentPage === i + 1}
          onClick={() => {
            goToPage(i + 1);
          }}
        >
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}

export default Paginate;
