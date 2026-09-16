export const addProjectsForm = () => {
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
        <input type="submit" id="description" value="Let's go">
    </form>
    `;
    document.body.appendChild(formBody);
}

export const removeProjectsForm = (form) => {
    form.remove()
}

export const paintProjects = (projectsContainer, projects) => {
    projectsContainer.innerHTML = '';
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
    projectsContainer.innerHTML = '';
    const project = projectsArray.find(p => p.id === projectId);
    if(project){
        projectsContainer.innerHTML = '';
        
    }
}