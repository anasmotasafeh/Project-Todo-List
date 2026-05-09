import {App} from "./app.js"
import {Todo} from "./todo.js"
import { saveToStorage } from "./localStorage.js";

// DOM Elements:
const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.textContent = "انشاء قائمة جديده"
const projectDilogEle = document.createElement("dialog");
const projectForm = createProjectForm();
const todoDilogEle = document.querySelector(".todoDialog");
const todoForm = createTodoForm();


function createInputField(title, name, defaultValue="") {
  // container
  const wrapper = document.createElement("div");

  // label
  const label = document.createElement("label");
  label.textContent = title;

  // input
  const input = document.createElement("input");
  input.type = "text";
  input.value = defaultValue;
  input.name = name;

  // add to wrapper
  wrapper.append(label, input);

  return wrapper;
}

// Todo Form
function createTodoForm(){
  const todoForm = document.createElement("form");
  const titleField = createInputField("الاسم", "title")
  const descriptionField = createInputField("الوصف", "description")
  const dueDateField = createInputField("يوم", "dueDate")
  const priorityField = createInputField("الاهمية", "priority")
  const notesField = createInputField("ملاحظات", "notes")
  const submetButton = document.createElement("button");
  submetButton.textContent = "حفظ";
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

function createProjectForm(){
  const projectForm = document.createElement("form");
  const nameField = createInputField("الاسم", "name")
  const submetButton = document.createElement("button");
  submetButton.textContent = "حفظ";
  projectForm.append(nameField, submetButton);
  return projectForm;
}
function fillProjectForm(project){
  projectForm.Name.value = project.getName();
}

// Create DOM element with event handlers for a todo
function createTodoEle(todo) {
  const todoEle = document.createElement("div");
  todoEle.textContent = todo.getTitle() + " مطلوب يوم:  " + todo.getDueDate();
  todoEle.dataset.id = todo.getId();

  const deleteEle = document.createElement("button");
  deleteEle.classList.add("deleteButton");
  deleteEle.dataset.id = todo.getId();
  deleteEle.textContent = "حذف";
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
    saveToStorage("projects", App.getProjects());
    render();
  })
  
  return todoEle;
}

// Create DOM element with event handler for a project
function createProjectEle(project) {
  const projectEle = document.createElement("div");
  const projectName = document.createElement("b");

  projectName.textContent = project.getName();
  projectEle.appendChild(projectName);

  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.classList.add("deleteButton");
  deleteProjectButton.textContent = "احذف هذه القائمة";
  projectEle.appendChild(deleteProjectButton);

  const addTodoButton = document.createElement("button");
  addTodoButton.textContent = "اضف مهمه";
  projectEle.appendChild(addTodoButton);

  projectEle.addEventListener("mouseenter", e => {
    App.setCurrentProject(project);
  })
  projectEle.addEventListener("click", e => {
    fillProjectForm(project);
    projectDilogEle.showModal();
    
  })
  deleteProjectButton.addEventListener("click", e => {
    e.stopPropagation();
    App.removeCurrentProject();
    saveToStorage("projects", App.getProjects());
    render();

  })
  addTodoButton.addEventListener("click", e => {
    e.stopPropagation();
    App.setCurrentTodo(null);
    todoForm.reset();
    todoDilogEle.showModal();
  })
  
  return projectEle;
}


export function init(){
  todoDilogEle.appendChild(todoForm);
  projectDilogEle.appendChild(projectForm);
  document.body.appendChild(projectDilogEle);
  setupGloabalListeners()
  render();
}

function setupGloabalListeners(){

  todoForm.addEventListener("submit", e =>{
  e.preventDefault();
  const newTodo = new FormData(todoForm);
  if (App.getCurrentTodo() === null){
    const todo = new Todo(newTodo.get("title"), newTodo.get("description"),
    newTodo.get("dueDate"), newTodo.get("priority"), newTodo.get("notes"))
    App.getCurrentProject().addTodo(todo);
  }
  else{
    App.getCurrentTodo().updateDetales(newTodo.get("title"), newTodo.get("description"),
    newTodo.get("dueDate"), newTodo.get("priority"), newTodo.get("notes"))
  }
  todoDilogEle.close();
  todoForm.reset();
  saveToStorage("projects", App.getProjects());
  render();
})

  projectForm.addEventListener("submit", e => {
    e.preventDefault();
    const newProject = new FormData(projectForm);
    if (App.getCurrentProject() === null){
      App.createNewProject(newProject.get("name"));
    }
    else{
      App.getCurrentProject().updateDetales(newProject.get("name"));
    }
    projectDilogEle.close();
    projectForm.reset();
    saveToStorage("projects", App.getProjects());
    render();
  })

  addProjectButton.addEventListener("click", e => {
    projectForm.reset();
    App.setCurrentProject(null);
    projectDilogEle.showModal();
  }) 

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
