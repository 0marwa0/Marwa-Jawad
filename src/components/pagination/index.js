import React from 'react'
import LeftIcon from '../../assets/Icons/left.svg'
import RightIcon from '../../assets/Icons/right.svg'
import './index.css'
class index extends React.Component {
  render() {
    const current = this.props.currentPage
    const total = this.props.totalPage
    const leftAllowed = current > 1
    const rightAllowed = current !== total
    return (
      <div className="flex">
        <button
          className={leftAllowed ? 'pagination-btn-active' : 'pagination-btn'}
          onClick={(e) => {
            e.stopPropagation()
            this.props.onPrev()
          }}
        >
          <img src={LeftIcon} alt="icon" />
        </button>
        <div>
          {current}
          {' / '}
          {total}
        </div>
        <button
          className={rightAllowed ? 'pagination-btn-active' : 'pagination-btn'}
          onClick={(e) => {
            this.props.onNext()
            e.stopPropagation()
          }}
        >
          <img src={RightIcon} alt="icon" />
        </button>
      </div>
    )
  }
}

export default index
