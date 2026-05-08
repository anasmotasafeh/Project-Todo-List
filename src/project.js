
class Project{
  constructor(name){
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }

  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getTodos(){
    return this.todos.slice();
  }

  addTodo(todo){
    this.todos.push(todo);
  }
  updateDetales(name){
    this.name = name;
  }
  removeTodo(todo){
    let index = this.todos.findIndex(t => t.getId() === todo.getId())
    this.todos.splice(index, 1);
  }
  markTodoAsComplete(todo){
    todo.markAsComplete();
  }
}

export{Project};