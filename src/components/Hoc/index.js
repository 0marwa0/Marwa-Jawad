import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const withRouter = (WrappedComponent) => {
  const ComponentHistory = (props) => {
    const history = useNavigate()
    const { id } = useParams()
    return <WrappedComponent id={id} {...props} history={history} />
  }
  return ComponentHistory
}

export default withRouter
