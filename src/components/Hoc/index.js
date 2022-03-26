import React from "react";
import { useParams, useNavigate } from "react-router-dom";
const withRouter = (WrappedComponent) => (props) => {
  const history = useNavigate();
  const { id } = useParams();

  return <WrappedComponent {...props} id={id} history={history} />;
};
export default withRouter;
