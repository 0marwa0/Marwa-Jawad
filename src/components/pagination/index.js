import React from 'react'
import LeftIcon from '../../assets/Icons/left.svg'
import RightIcon from '../../assets/Icons/right.svg'
import './index.css'
import PaginationBtn from './paginationBtn'
class index extends React.Component {
  render() {
    const current = this.props.currentPage
    const total = this.props.totalPage
    const leftAllowed = current > 1
    const rightAllowed = current !== total
    return (
      <div className="flex">
        <PaginationBtn
          clickHandle={this.props.onPrev}
          disable={leftAllowed}
          icon={LeftIcon}
        />
        <div>
          {current}
          {' / '}
          {total}
        </div>
        <PaginationBtn
          clickHandle={this.props.onNext}
          disable={rightAllowed}
          icon={RightIcon}
        />
      </div>
    )
  }
}

export default index
