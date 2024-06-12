import React from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
function Rating({ rating}) {
  return (
    <div className="d-flex align-items-center">
      
        {rating >= 1 ? (
          <IoIosStar style={{ color: "E6E735" }} />
        ) : rating >= 0.5 ? (
          <IoIosStarHalf style={{ color: "E6E735" }} />
        ) : (
          <IoIosStarOutline style={{ color: "D1D233" }} />
        )}
        {rating >= 2 ? (
          <IoIosStar style={{ color: "E6E735" }} />
        ) : rating >= 1.5 ? (
          <IoIosStarHalf style={{ color: "E6E735" }} />
        ) : (
          <IoIosStarOutline style={{ color: "D1D233" }} />
        )}
        {rating >= 3 ? (
          <IoIosStar style={{ color: "E6E735" }} />
        ) : rating >= 2.5 ? (
          <IoIosStarHalf style={{ color: "E6E735" }} />
        ) : (
          <IoIosStarOutline style={{ color: "D1D233" }} />
        )}
        {rating >= 4 ? (
          <IoIosStar style={{ color: "E6E735" }} />
        ) : rating >= 3.5 ? (
          <IoIosStarHalf style={{ color: "E6E735" }} />
        ) : (
          <IoIosStarOutline style={{ color: "D1D233" }} />
        )}
        {rating >= 5 ? (
          <IoIosStar style={{ color: "E6E735" }} />
        ) : rating >= 4.5 ? (
          <IoIosStarHalf style={{ color: "E6E735" }} />
        ) : (
          <IoIosStarOutline style={{ color: "D1D233" }} />
        )}
      
      
    </div>
  );
}

export default Rating;
