import React from 'react'
import Navbar from './components/navbar'
import { connect } from 'react-redux'
import { closeDropdown } from './store/dropdownSlice'
import { closeModal } from './store/modalSlice'
class index extends React.Component {
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, true)
  }

  onScroll = () => {
    if (window.scrollY > 0) {
      this.close()
    }
  }

  render() {
    return (
      <div
        onClick={() => {
          this.props.closeModal()
          this.props.hideDropdown()
        }}
        onScroll={this.onScroll}
      >
        <div className="app-container">
          <Navbar />
          {this.props.children}
        </div>
      </div>
    )
  }
}

const dispatch = (dispatch) => {
  return {
    hideDropdown: () => dispatch(closeDropdown()),
    closeModal: () => dispatch(closeModal()),
  }
}
export default connect(null, dispatch)(index)
