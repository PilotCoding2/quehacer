import "./styles.css";

import * as LogicalController from "./logic.js";
import * as GUI from './graphics.js';

// DOM variables
const projectsContainer = document.getElementById('projects-container');
const individualProjectContainer = document.getElementById('individual-project-container');
const homeBtn = document.getElementById('quehacer');

// Function calling
window.addEventListener('load', (event) => {
    event.preventDefault();
    GUI.paintProjects(projectsContainer, LogicalController.getProjects());
    const newProjectBtn = document.getElementById('new-project');
    newProjectBtn.addEventListener('click', () => {
    GUI.addProjectsForm();

    const projectCreationForm = document.getElementById('project-creation-form');
    const projectName = document.getElementById('name');
    const projectDesc = document.getElementById('description');
    const formContainer = document.querySelector('.form');

    projectCreationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        LogicalController.newProject(projectName.value, projectDesc.value);
        GUI.removeProjectsForm(formContainer);
        GUI.paintProjects(projectsContainer, LogicalController.getProjects());
        });
    });
});

projectsContainer.addEventListener('click', (event) => {
    if(event.target.className === "project-card"){
        GUI.goToProject(LogicalController.getProjects(), event.target.id, projectsContainer, individualProjectContainer);
    }
    if(event.target.id === 'new-project'){
        GUI.addProjectsForm();
    }
});

homeBtn.addEventListener('click', () => {
    GUI.returnToProjects(LogicalController.getProjects(), projectsContainer, individualProjectContainer, homeBtn);
});
