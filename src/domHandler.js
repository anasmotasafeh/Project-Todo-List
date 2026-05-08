import {App} from "./app.js"
import {Todo} from "./todo.js"
// DOM Elements:
const addProjectButton = document.createElement("button");
addProjectButton.textContent = "Create new Project"
document.body.appendChild(addProjectButton);
addProjectButton.addEventListener("click", e => {
  projectForm.reset();
  App.setCurrentProject(null);
  projectDilogEle.showModal();
})
const todoDilogEle = document.querySelector(".todoDialog");
const todoForm = createTodoForm();
todoDilogEle.appendChild(todoForm);

const projectDilogEle = document.createElement("dialog");
const projectForm = createProjectForm();
projectDilogEle.appendChild(projectForm);
document.body.appendChild(projectDilogEle);




function createInputField(title, defaultValue="") {
  // container
  const wrapper = document.createElement("div");

  // label
  const label = document.createElement("label");
  label.textContent = title;

  // input
  const input = document.createElement("input");
  input.type = "text";
  input.value = defaultValue;
  input.name = title;

  // add to wrapper
  wrapper.append(label, input);

  return wrapper;
}

// Todo Form
function createTodoForm(){
  const todoForm = document.createElement("form");
  const titleField = createInputField("Title")
  const descriptionField = createInputField("Description")
  const dueDateField = createInputField("DueDate", "")
  const priorityField = createInputField("Priority")
  const notesField = createInputField("Notes")
  const submetButton = document.createElement("button");
  submetButton.textContent = "Save";
  todoForm.append(titleField, descriptionField, dueDateField, priorityField, notesField, submetButton);
  return todoForm;
}
function fillTodoForm(todo){
  todoForm.Title.value = todo.getTitle();
  todoForm.Description.value = todo.getDescription();
  todoForm.DueDate.value = todo.getDueDate();
  todoForm.Priority.value = todo.getPriority();
  todoForm.Notes.value = todo.getNotes();
}

todoForm.addEventListener("submit", e =>{
  e.preventDefault();
  const newTodo = new FormData(todoForm);
  if (App.getCurrentTodo() === null){
    const todo = new Todo(newTodo.get("Title"), newTodo.get("Description"),
    newTodo.get("DueDate"), newTodo.get("Priority"), newTodo.get("Notes"))
    App.getCurrentProject().addTodo(todo);
  }
  else{
    App.getCurrentTodo().updateDetales(newTodo.get("Title"), newTodo.get("Description"),
    newTodo.get("DueDate"), newTodo.get("Priority"), newTodo.get("Notes"))
  }
  todoDilogEle.close();
  todoForm.reset();
  render();
})


function createProjectForm(){
  const projectForm = document.createElement("form");
  const nameField = createInputField("Name")
  const submetButton = document.createElement("button");
  submetButton.textContent = "Save";
  projectForm.append(nameField, submetButton);
  return projectForm;
}
function fillProjectForm(project){
  projectForm.Name.value = project.getName();
}

projectForm.addEventListener("submit", e => {
  e.preventDefault();
  const newProject = new FormData(projectForm);
  if (App.getCurrentProject() === null){
    App.createNewProject(newProject.get("Name"));
  }
  else{
    App.getCurrentProject().updateDetales(newProject.get("Name"));
  }
  projectDilogEle.close();
  projectForm.reset();
  render();
})


// Create DOM element with event handlers for a todo
function createTodoEle(todo) {
  const todoEle = document.createElement("div");
  todoEle.textContent = todo.getTitle() + " due at " + todo.getDueDate();
  todoEle.dataset.id = todo.getId();

  const deleteEle = document.createElement("button");
  deleteEle.dataset.id = todo.getId();
  deleteEle.textContent = "Delete";
  todoEle.appendChild(deleteEle);

  // Event Handlers:
  todoEle.addEventListener("click", e => {
    App.setCurrentTodo(todo);
    fillTodoForm(todo);
    todoDilogEle.showModal();
  })
  deleteEle.addEventListener("click", e => {
    e.stopPropagation();
    const index = App.getCurrentProject().getTodos().findIndex(t => t.getId() === e.target.dataset.id);
    App.removeTodoFromCurrentProject(App.getCurrentProject().getTodos()[index]);
    render();
  })
  
  return todoEle;
}

// Create DOM element with event handler for a project
function createProjectEle(project) {
  const projectEle = document.createElement("div");
  projectEle.textContent = "Project: " + project.getName();
  const addTodoButton = document.createElement("button");
  addTodoButton.textContent = "Add new Todo";
  projectEle.appendChild(addTodoButton);

  projectEle.addEventListener("mouseenter", e => {
    App.setCurrentProject(project);
  })
  projectEle.addEventListener("click", e => {
    fillProjectForm(project);
    projectDilogEle.showModal();
    
  })
  addTodoButton.addEventListener("click", e => {
    e.stopPropagation();
    App.setCurrentTodo(null);
    todoForm.reset();
    todoDilogEle.showModal();
  })
  
  return projectEle;
}

export function render(){

  const projectsEle = document.querySelector(".projects");
  projectsEle.innerHTML = "";

  App.getProjects().forEach(project => {
    const projectEle = createProjectEle(project);

    project.getTodos().forEach(todo => {
      const todoEle = createTodoEle(todo);
      projectEle.appendChild(todoEle);
    })

    projectsEle.appendChild(projectEle);
  });


}


