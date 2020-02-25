/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'class-names';
import { fetchWorkspaces as fetchWorkspacesAction } from '../store/workspaces/actions';
import workspacePropTypes from '../prop-types/workspace';

function WorkspaceList({ workspaces, fetchWorkspaces }) {
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const toggleSelected = (taskId) => {
    const nextSelectedTasksIds = selectedTasksIds.includes(taskId)
      ? selectedTasksIds.filter((id) => id !== taskId)
      : [...selectedTasksIds, taskId];
    setSelectedTasksIds(nextSelectedTasksIds);
  };

  return (
    <div className="ProjectList">
      {
      workspaces.map((workspace) => (
        <div key={workspace.id}>
          <h4>{workspace.title}</h4>
          <ul>
            {workspace.projects.map((project) => (
              <li key={`project-${project.id}`}>
                {project.title}
                <ul>
                  {project.tasks.map((task) => (
                    <li
                      key={`task-${task.id}`}
                      className={classNames({
                        'task--done': task.done,
                        'task--selected': selectedTasksIds.includes(task.id),
                      })}
                      onClick={() => toggleSelected(task.id)}
                    >
                      <strong>#{task.id}</strong> {task.title}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))
    }
    </div>
  );
}

WorkspaceList.propTypes = {
  workspaces: PropTypes.arrayOf(workspacePropTypes).isRequired,
  fetchWorkspaces: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workspaces: state.workspaces.items,
});

const mapDispatchToProps = {
  fetchWorkspaces: fetchWorkspacesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceList);
