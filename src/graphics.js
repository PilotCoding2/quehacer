// this function opens a form to add new projects to the projects array
export const addProjectsForm = () => {
    if(document.querySelector('.form')){
        return;
    }
    const formBody = document.createElement('div');
    formBody.classList.add('form');
    formBody.innerHTML += 
    `
    <form id="project-creation-form">
    <h3>Let's build a project</h3>
        <label for="name">Project name:</label>
        <input type="text" id="name" required>
        <label for="description">What's this project about?</label>
        <input type="text" id="description">
        <input type="submit" id="create-project" value="Let's go">
    </form>
    `;
    document.body.appendChild(formBody);
}

// t
export const removeProjectsForm = (form) => {
    form.remove();
}

export const paintProjects = (projectsContainer, projects) => {
    
    projectsContainer.innerHTML = '';
    projectsContainer.innerHTML += `<button id="new-project">Add Project</button>`
    projects.forEach(project => {
        if(project.description){
            projectsContainer.innerHTML += 
            `
            <div id="${project.id}" class="project-card">
                <h2 class="project-title">${project.name}</h2>
                <p class="project-desc">${project.description}</p>
            </div>
            `
        }

        projectsContainer.innerHTML += 
        `
        <div id="${project.id}" class="project-card">
            <h2 class="project-title">${project.name}</h2>
        </div>
        `
    });
}

export const goToProject = (projectsArray, projectId, projectsContainer = projectsContainer, individualProjectContainer) => {
    if(document.querySelector('.form')){
        return;
    }
    projectsContainer.innerHTML = '';
    const project = projectsArray.find(p => p.id === projectId);
    if(project){
        projectsContainer.innerHTML = '';
        individualProjectContainer.innerHTML = '';
        individualProjectContainer.innerHTML += `<button id="create-task">New Task</button>`
        individualProjectContainer.innerHTML += `<h2 id="project-name">${project.name}</h2>`
        if(project.description){
            individualProjectContainer.innerHTML += `<p id="project-description">${project.description}</p>`
        }
        if(!project.todo){
            individualProjectContainer.innerHTML += '';
        } else {
             project.todo.forEach(todo => {
                individualProjectContainer.innerHTML += 
                `
                <div id="${todo.id}" class="todo-card">
                    <h2 class="task-name">${todo.name}</h2>
                    <p class="task-date">${todo.todoDate}</p>
                    <p class="task-desc">${todo.description}</p>
                </div>
                `
            });
        }
    }
}

export const returnToProjects = (projectsArray, projectsContainer, individualProjectContainer, homeBtn) => {
    if(!individualProjectContainer){
        return;
    }
    individualProjectContainer.innerHTML = '';
    paintProjects(projectsContainer, projectsArray);
}