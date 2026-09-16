import "./styles.css";

import * as LogicalController from "./logic.js";
import * as GUI from './graphics.js';

// DOM variables
const newProjectBtn = document.getElementById('new-project');
const projectsContainer = document.getElementById('projects-container');

// Function calling
window.addEventListener('load', (event) => {
    event.preventDefault();
    GUI.paintProjects(projectsContainer, LogicalController.getProjects());
})

newProjectBtn.addEventListener('click', () => {
    GUI.addProjectsForm();

    const projectCreationForm = document.getElementById('project-creation-form');
    const projectName = document.getElementById('name');
    const projectDesc = document.getElementById('description');
    const formContainer = document.querySelector('form');

    projectCreationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        LogicalController.newProject(projectName.value, projectDesc.value);
        GUI.removeProjectsForm(formContainer);
        GUI.paintProjects(projectsContainer, LogicalController.getProjects());
    });
});



