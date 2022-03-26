import React from "react";
import LeftIcon from "../../assets/Icons/left.svg";
import RightIcon from "../../assets/Icons/right.svg";
import "./index.css";
class index extends React.Component {
  state = {};
  render() {
    let current = this.props.currentPage;
    let total = this.props.totalPage;
    let leftAllowed = current > 1;
    let rightAllowed = current !== total;
    return (
      <div className="flex">
        <button
          className={leftAllowed ? "pagination-btn-active" : "pagination-btn"}
          onClick={(e) => {
            e.stopPropagation();
            this.props.onPrev();
          }}
        >
          <img src={LeftIcon} alt="icon" />
        </button>
        <div>
          {current}
          {" / "}
          {total}
        </div>
        <button
          className={rightAllowed ? "pagination-btn-active" : "pagination-btn"}
          onClick={(e) => {
            this.props.onNext();
            e.stopPropagation();
          }}
        >
          <img src={RightIcon} alt="icon" />
        </button>
      </div>
    );
  }
}

export default index;
