export const getStoredTasks = () => {
  const storedTasksJSON = localStorage.getItem('tasks')
  let storedTasks
  if (!storedTasksJSON) {
    return []
  }
  try {
    storedTasks = JSON.parse(storedTasksJSON)
  } catch(e) {
    localStorage.removeItem('tasks')
    return []
  }
  return storedTasks
}

export const storeTasks = tasks => {
  const tasksJSON = JSON.stringify(tasks)
  localStorage.setItem('tasks', tasksJSON)
}