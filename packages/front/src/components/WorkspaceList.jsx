/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'class-names';
import { Button, Icon, Accordion } from 'semantic-ui-react';
import { fetchWorkspaces as fetchWorkspacesAction } from '../store/workspaces/actions';
import { updateTodaysTasks as updateTodaysTasksAction } from '../store/tasks/actions';
import workspacePropTypes from '../prop-types/workspace';

function WorkspaceList({ workspaces, fetchWorkspaces, todaysTasks, updateTodaysTasks }) {
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);
  const [openWorkspacesIds, setOpenWorkspacesIds] = useState([]);
  const [openProjectsIds, setOpenProjectsIds] = useState([]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const toggleSelected = (taskId) => {
    const nextSelectedTasksIds = selectedTasksIds.includes(taskId)
      ? selectedTasksIds.filter((id) => id !== taskId)
      : [...selectedTasksIds, taskId];
    setSelectedTasksIds(nextSelectedTasksIds);
  };

  const genericToggleSelected = (itemIds, setItemIds, itemId) => {
    const nextItemIds = itemIds.includes(itemId)
      ? itemIds.filter((id) => id !== itemId)
      : [...itemIds, itemId];
    setItemIds(nextItemIds);
  };

  const addToTodaysList = () => updateTodaysTasks(selectedTasksIds);

  return (
    <>
      <div>
        {
          todaysTasks.length
            ? todaysTasks.map(({ id, title }) => (
              <div key={`todays-tasks-${id}`}>{title}</div>
            ))
            : <p>no tasks...</p>
        }
      </div>
      {
        selectedTasksIds.length > 0 && (
          <Button color="teal" onClick={addToTodaysList}>Add {selectedTasksIds.length} tasks</Button>
        )
      }
      <Accordion exclusive={false} className="ProjectList" styled>
        {
        workspaces.map((workspace, index) => (
          <Fragment key={`workspace-${workspace.id}`}>
            <Accordion.Title
              active={openWorkspacesIds.includes(workspace.id)}
              index={index}
              onClick={() => genericToggleSelected(
                openWorkspacesIds, setOpenWorkspacesIds, workspace.id,
              )}
            >
              <Icon name="dropdown" />
              {workspace.title}
            </Accordion.Title>
            <Accordion.Content active={openWorkspacesIds.includes(workspace.id)}>
              <Accordion exclusive={false}>
                {workspace.projects.map((project) => (
                  <Fragment key={`project-${project.id}`}>
                    <Accordion.Title
                      active={openProjectsIds.includes(project.id)}
                      index={index}
                      onClick={() => genericToggleSelected(
                        openProjectsIds, setOpenProjectsIds, project.id,
                      )}
                    >
                      <Icon name="dropdown" />
                      {project.title}
                    </Accordion.Title>
                    <Accordion.Content active={openProjectsIds.includes(project.id)}>
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
                    </Accordion.Content>
                  </Fragment>
                ))}
              </Accordion>
            </Accordion.Content>

          </Fragment>
        ))
      }
      </Accordion>
    </>
  );
}

WorkspaceList.propTypes = {
  workspaces: PropTypes.arrayOf(workspacePropTypes).isRequired,
  fetchWorkspaces: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workspaces: state.workspaces.items,
  todaysTasks: state.tasks.todaysItems,
});

const mapDispatchToProps = {
  fetchWorkspaces: fetchWorkspacesAction,
  updateTodaysTasks: updateTodaysTasksAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceList);
