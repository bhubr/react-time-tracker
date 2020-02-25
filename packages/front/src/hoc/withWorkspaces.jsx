import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchWorkspaces as fetchWorkspacesAction } from '../store/workspaces/actions';

function withWorkspaces(WrappedComponent) {
  const ComponentWithWorkspaces = ({ fetchWorkspaces }) => {
    useEffect(() => {
      fetchWorkspaces();
    }, []);
    return (
      <WrappedComponent />
    );
  };
  ComponentWithWorkspaces.propTypes = {
    fetchWorkspaces: PropTypes.func.isRequired,
  };
  return ComponentWithWorkspaces;
}

const mapDispatchToProps = {
  fetchWorkspaces: fetchWorkspacesAction,
};

export default compose(
  connect(null, mapDispatchToProps),
  withWorkspaces,
);
