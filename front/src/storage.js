export const getStoredTasks = () => {
  const storedTasksJSON = localStorage.getItem('tasks')
  let storedTasks
  if (!storedTasksJSON) {
    return []
  }
  try {
    storedTasks = JSON.parse(storedTasksJSON)
    // storedTasks.forEach((task, index) => {
    //   if(! task.id) task.id = index + 1
    // })
    // storeTasks(storedTasks)
  } catch(e) {
    localStorage.removeItem('tasks')
    return []
  }
  console.log(storedTasks)
  return storedTasks
}

export const storeTasks = tasks => {
  const tasksJSON = JSON.stringify(tasks)
  localStorage.setItem('tasks', tasksJSON)
}