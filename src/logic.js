// function that loads data saved to localStorage
const retrieveFromLocalStorage = () => {
    const data = localStorage.getItem("projects");
    if(!data){
        return [];
    }
    return JSON.parse(data);
}

// projects array
const projects = retrieveFromLocalStorage();

// function that returns the projects array
export const getProjects = () => {
    return [... projects];
}

// function that creates a new project and pushes it to the projects array
export const newProject = (name, description) => {
    const newProject = { id: crypto.randomUUID(), name, description, todos: [] };
    projects.push(newProject);
    saveToLocalStorage();
    return newProject;
}

// function that modifies the project name
export const modifyProject = (name, projectId) => {
    const project = projects.find(p => p.id === projectId);
    if(project){
        project.name = name;
        saveToLocalStorage();
    }
}

// function that deletes a project 
export const deleteProject = (projectId) => {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if(projectIndex !== -1){
        projects.splice(index, 1);
        saveToLocalStorage();
    }
}

// function that looks for the project and pushes the todo info
export const addTodoToProjects = (name, todoDate, description, projectId) => {
    const project = projects.find(p => p.id === projectId);
    if(project){
        project.todos.push({ id: crypto.randomUUID(), name, todoDate, description });
        saveToLocalStorage();
    }
}

// function that allows to modify the todo parameters after it is created
export const modifyTodo = (name, todoDate, description, projectId, todoId) => {
    const project = projects.find(p => p.id === projectId);
    const todo = project.todos.find(t => t.id === todoId);
    if(project && todo){
        todo.name = name;
        todo.todoDate = todoDate;
        todo.description = description;
        saveToLocalStorage();
    }
}

// function that allows to delete a todo inside a project
export const deleteTodo = (projectId, todoId) => {
    const project = projects.find(p => p.id === projectId);
    const todoIndex = project.todos.findIndex(t => t.id === todoId);
    if(project && todoIndex !== -1){
        project.todos.splice(todoIndex, 1);
        saveToLocalStorage()
    }
}

// function that saves to localStorage
const saveToLocalStorage = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
}
