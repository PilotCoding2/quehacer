import "./styles.css";

import * as LogicalController from "./logic.js";
import * as GUI from './graphics.js';

// DOM variables
const projectsContainer = document.getElementById('projects-container');
const individualProjectContainer = document.querySelector('.individual-project-container');
const homeBtn = document.getElementById('quehacer');

// Function calling
window.addEventListener('load', (event) => {
    event.preventDefault();
    GUI.paintProjects(projectsContainer, LogicalController.getProjects());
});

document.body.addEventListener('click', (event) => {
    if(event.target.className === 'project-card'){
        GUI.goToProject(LogicalController.getProjects(), event.target.id, projectsContainer, individualProjectContainer);
    }
    if(event.target.id === 'new-project'){
        GUI.addProjectsForm();
        const projectCreationForm = document.getElementById('project-creation-form');
        const formContainer = document.querySelector('.form');

        projectCreationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const name = formData.get("project-name");
            const desc = formData.get("project-desc");
            LogicalController.newProject(name, desc);
            GUI.removeForm(formContainer);
            GUI.paintProjects(projectsContainer, LogicalController.getProjects());
        });
    }
    if(event.target.className === 'edit-project'){
        const card = event.target.closest('.project-card');
        const projectTitle = card.querySelector('.project-title');
        const projectDesc = card.querySelector('.project-desc');
        const editProject = card.querySelector('.edit-project');
        const deleteProject = card.querySelector('.delete-project');
        GUI.modifyProject(LogicalController.getProjects(), card.id, projectTitle, projectDesc, editProject, deleteProject);
    }
    if(event.target.className === 'cancel-btn'){
        GUI.paintProjects(projectsContainer, LogicalController.getProjects());
    }
    if(event.target.className === 'delete-project'){
        const card = event.target.closest('.project-card');
        LogicalController.deleteProject(card.id);
        GUI.paintProjects(projectsContainer, LogicalController.getProjects());
    }
    if(event.target.className === 'accept-btn'){
        const projectId = event.target.parentElement.id;
        const project = LogicalController.getProjects().find(p => p.id === projectId);
        if(project){
            const title = document.querySelector(`#title-${projectId}`);
            const description = document.querySelector(`#desc-${projectId}`);

            const trimmedTitle = title.value.trim();

            if(!trimmedTitle){
                alert("The title name can't be empty.");
                title.focus();
                return;
            }
            const isTitleChanged = trimmedTitle !== project.name;
            const isDescriptionChanged = description.value !== (project.description || '');
            if(isTitleChanged || isDescriptionChanged){
                LogicalController.modifyProject(trimmedTitle, description.value, projectId);
                GUI.paintProjects(projectsContainer, LogicalController.getProjects());
            } else {
                GUI.paintProjects(projectsContainer, LogicalController.getProjects());
            }
        }
    }
    if(event.target.className === 'cancel-form'){
        const formContainer = document.querySelector('.form');
        GUI.removeForm(formContainer);
    }
});

individualProjectContainer.addEventListener('click', (event) => {
    if(event.target.id === "create-task"){
        GUI.createTodoForm(individualProjectContainer);
        const todoForm = document.querySelector('.todo-form');
        const todoCreationFormContainer = document.querySelector('.todo-form-container');
        todoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const name = formData.get("todo-name");
            const date = formData.get("todo-date");
            const desc = formData.get("todo-desc");
            const urgency = formData.get("todo-urgency");
            LogicalController.addTodoToProjects(name, date, desc, urgency, individualProjectContainer.id);
            GUI.removeForm(todoCreationFormContainer);
            GUI.paintTodoInProjects(LogicalController.getProjects(), individualProjectContainer.id, individualProjectContainer);
        });
    }
    if(event.target.className === "cancel-todo-form"){
        const todoCreationFormContainer = document.querySelector('.todo-form-container');
        GUI.removeForm(todoCreationFormContainer);
    }
    if(event.target.className === 'delete-todo'){
        const projectId = individualProjectContainer.id;
        const todoId = event.target.parentElement.id;
        LogicalController.deleteTodo(projectId, todoId);
        GUI.paintTodoInProjects(LogicalController.getProjects(), projectId, individualProjectContainer);
    }
    if(event.target.className === 'edit-todo'){
        const card = event.target.closest('.todo-card');
        const todoId = card.id;
        const projectId = individualProjectContainer.id;
        const todoTitle = card.querySelector('.todo-title');  
        const todoDate = card.querySelector('.todo-due-date');
        const todoDesc = card.querySelector('.todo-description');
        const editBtn = card.querySelector('.edit-todo');
        const deleteBtn = card.querySelector('.delete-todo');
        GUI.modifyTodos(LogicalController.getProjects(), projectId, todoId, editBtn, deleteBtn, todoTitle, todoDate, todoDesc);
    }
    if(event.target.className === 'todo-cancel-btn'){
        GUI.paintTodoInProjects(LogicalController.getProjects(), individualProjectContainer.id, individualProjectContainer);
    }
    if(event.target.className === 'todo-accept-btn'){
        const todoId = event.target.parentElement.id;
        const projectId = individualProjectContainer.id;
        const project = LogicalController.getProjects().find(p => p.id === projectId);
        const todo = project.todos.find(t => t.id === todoId);
        if(project){
            if(todo){
                const title = document.querySelector(`#title-${todoId}`);
                const date =  document.querySelector(`#date-${todoId}`);
                const desc = document.querySelector(`#desc-${todoId}`);
                const urgency = document.querySelector(`#urgency-${todoId}`);

                const trimmedTitle = title.value.trim();
                if(!trimmedTitle){
                    alert("The task title can't be empty");
                    title.focus();
                    return;
                }

                const isTitleChanged = trimmedTitle !== todo.name;
                const isDateChanged = date.value !== (todo.todoDate || '');
                const isDescChanged = desc.value !== (todo.description || '');
                const isUrgencyChanged = urgency !== todo.urgency;
                if(isTitleChanged || isDateChanged || isDescChanged || isUrgencyChanged){
                    LogicalController.modifyTodo(trimmedTitle, date.value, desc.value, urgency.value, projectId, todoId);
                    GUI.paintTodoInProjects(LogicalController.getProjects(), projectId, individualProjectContainer);
                } else {
                    GUI.paintTodoInProjects(LogicalController.getProjects(), projectId, individualProjectContainer);
                }
            }
        }
    }
    if(event.target.className === 'todo-checkbox'){
        const card = event.target.closest('.todo-card');
        const todoId = card.id;
        const projectId = individualProjectContainer.id;
        const checkBtn = document.querySelector(`#checked-${todoId}`);
        LogicalController.checkUncheckTodo(projectId, todoId, checkBtn);
        GUI.graphicalCheckUncheck(LogicalController.getProjects(), projectId, checkBtn, individualProjectContainer);
    }
});

homeBtn.addEventListener('click', () => {
    GUI.returnToProjects(LogicalController.getProjects(), projectsContainer, individualProjectContainer, homeBtn);
});
