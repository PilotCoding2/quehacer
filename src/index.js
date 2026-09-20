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

projectsContainer.addEventListener('click', (event) => {
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
            GUI.removeProjectsForm(formContainer);
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
            const isTitleChanged = title.value !== project.title;
            const isDescriptionChanged = description.value !== (project.description || '');
            if(isTitleChanged || isDescriptionChanged){
                LogicalController.modifyProject(title.value, description.value, projectId);
                GUI.paintProjects(projectsContainer, LogicalController.getProjects());
            } else {
                return;
            }
        }
    }
});

individualProjectContainer.addEventListener('click', (event) => {
    if(event.target.id === "create-task"){
        GUI.createTodoForm(individualProjectContainer);
    }
})

homeBtn.addEventListener('click', () => {
    GUI.returnToProjects(LogicalController.getProjects(), projectsContainer, individualProjectContainer, homeBtn);
});
