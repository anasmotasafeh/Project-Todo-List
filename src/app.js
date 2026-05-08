import {Project} from "./project.js";
import {Todo} from "./todo.js";


export const App = (() => {
  let projects = [];
  projects.push(new Project("default"))

  // if ()
  let currentProject = projects[0];
  let currentTodo = null;

  function getProjects(){
    return projects.slice();
  };

  function getCurrentProject(){
    return currentProject;
  }

  function setCurrentProject(project) {
    // let index = projects.findIndex(p => p.getId() === projectId);
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

  function addTodoToCurrentProject(todo){
    currentProject.addTodo(todo);
  };

  function removeTodoFromCurrentProject(todo){
    currentProject.removeTodo(todo);
  };

  function markTodoAsComplete(todo){
    currentProject.markTodoAsComplete(todo);
  }

  return {getProjects, getCurrentProject, setCurrentProject, getCurrentTodo, setCurrentTodo, createNewProject, addTodoToCurrentProject, removeTodoFromCurrentProject, markTodoAsComplete};
})();