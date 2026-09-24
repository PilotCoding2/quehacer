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
export const modifyProject = (name, description, projectId) => {
    const project = returnProject(projectId);
    if(project){
        project.name = name;
        project.description = description;
        saveToLocalStorage();
    }
}

// function that deletes a project 
export const deleteProject = (projectId) => {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if(projectIndex !== -1){
        projects.splice(projectIndex, 1);
        saveToLocalStorage();
    }
}

// function that looks for the project and pushes the todo info
export const addTodoToProjects = (name, todoDate, description, urgency, projectId) => {
    const project = returnProject(projectId);
    if(project){
        project.todos.push({ id: crypto.randomUUID(), name, todoDate, description, urgency, completed: false });
        sortTodos(projectId);
        saveToLocalStorage();
    }
}

// function that allows to modify the todo parameters after it is created
export const modifyTodo = (name, todoDate, description, urgency, projectId, todoId) => {
    const project = returnProject(projectId);
    const todo = project.todos.find(t => t.id === todoId);
    if(todo){
        todo.name = name;
        todo.todoDate = todoDate;
        todo.description = description;
        todo.urgency = urgency;
        sortTodos(projectId);
        saveToLocalStorage();
    }
}

// function that allows to delete a todo inside a project
export const deleteTodo = (projectId, todoId) => {
    const project = returnProject(projectId);
    const todoIndex = project.todos.findIndex(t => t.id === todoId);
    if(project && todoIndex !== -1){
        project.todos.splice(todoIndex, 1);
        sortTodos(projectId);
        saveToLocalStorage();
    }
}

// function that sorts the todos inside a project
export const sortTodos = (projectId) => {
    const project = returnProject(projectId);
    if(project){
        project.todos.sort((a, b) => {
            if(a.completed !== b.completed){
                return a.completed ? 1 : -1;
            }
            return a.urgency > b.urgency ? 1 : b.urgency > a.urgency ? -1 : 0;
        })
    }
};

// function that checks the todo as done
export const checkUncheckTodo = (projectId, todoId, checkBtn) => {
    const isBtnChecked = checkBtn.checked;
    const project = returnProject(projectId);
    if(project){
        const todo = project.todos.find(t => t.id === todoId);
        if(isBtnChecked){
            todo.completed = isBtnChecked;
            sortTodos(projectId);
            saveToLocalStorage();
        } else {
            todo.completed = isBtnChecked;
            sortTodos(projectId);
            saveToLocalStorage();
        }
        
       
    }
}

// function that saves to localStorage
const saveToLocalStorage = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
}

// function that returns the desired project
const returnProject = (projectId) => {
    return projects.find(p => p.id === projectId);
}
