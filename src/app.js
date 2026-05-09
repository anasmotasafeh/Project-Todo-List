import {Project} from "./project.js";
import {Todo} from "./todo.js";


export const App = (() => {
  let projects = [];
  projects.push(new Project("default"))

  let currentProject = projects[0];
  let currentTodo = null;

  function getProjects(){
    return projects.slice();
  };

  function setProjects(newProjects){
    projects = newProjects;
  };

  function getCurrentProject(){
    return currentProject;
  }

  function setCurrentProject(project) {
    currentProject = project;
  };

  function getCurrentTodo() {
    return currentTodo;
  }
  function setCurrentTodo(todo) {
    currentTodo = todo;
  }
  
  function createNewProject(name){
    projects.push(new Project(name));
  };

  function removeCurrentProject(){
    let index = projects.findIndex(p => p.getId() === currentProject.getId());
    projects.splice(index, 1);
  }

  function addTodoToCurrentProject(todo){
    currentProject.addTodo(todo);
  };

  function removeTodoFromCurrentProject(todo){
    currentProject.removeTodo(todo);
  };

  function markTodoAsComplete(todo){
    currentProject.markTodoAsComplete(todo);
  }

  function hydrate(data){
    projects = [];

    data.forEach(pData => {
      const p = new Project(pData.name);

      pData.todos.forEach(tData => {
        const t = new Todo(tData.title, tData.description, tData.dueDate, 
          tData.priority, tData.notes );
          p.addTodo(t);
      })

      projects.push(p);
    })
    currentProject = projects[0];
  }

  return {getProjects, setProjects, getCurrentProject, setCurrentProject, getCurrentTodo, setCurrentTodo, createNewProject, removeCurrentProject, addTodoToCurrentProject, removeTodoFromCurrentProject, markTodoAsComplete, hydrate};
})();