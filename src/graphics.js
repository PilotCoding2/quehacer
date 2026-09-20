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
        <input type="text" id="name" name="project-name" required>
        <label for="description">What's this project about?</label>
        <input type="text" id="description" name="project-desc">
        <input type="submit" id="create-project" value="Let's go">
    </form>
    `;
    document.body.appendChild(formBody);
}

// this function allows to remove the project creation form
export const removeProjectsForm = (form) => {
    form.remove();
}

// this function allows to 'paint' the projects each time a project is added or modified
export const paintProjects = (projectsContainer, projects) => {
    
    projectsContainer.innerHTML = '';
    projectsContainer.innerHTML += `<button id="new-project">Add Project</button>`
    projects.forEach(project => {
        projectsContainer.innerHTML += 
        `
        <div id="${project.id}" class="project-card">
            <h2 class="project-title">${project.name}</h2>
            ${project.description ? `<p class="project-desc">${project.description}</p>` : ''}
            <button class="edit-project">Edit</button>
            <button class="delete-project">Delete</button>
        </div>
        `
    });
}

// this function allows to go to the project details each time they're clicked
export const goToProject = (projectsArray, projectId, projectsContainer = projectsContainer, individualProjectContainer) => {
    if(document.querySelector('.form') || document.querySelector('.accept-btn')){
        return;
    }
    projectsContainer.innerHTML = '';
    const project = projectsArray.find(p => p.id === projectId);
    if(project){
        projectsContainer.innerHTML = '';
        individualProjectContainer.innerHTML = '';
        individualProjectContainer.innerHTML += `<button id="create-task">New Task</button>`
        individualProjectContainer.innerHTML += `<h2 id="project-name">${project.name}</h2>`
        individualProjectContainer.id = projectId;
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

// this function allows to go back to the projects area
export const returnToProjects = (projectsArray, projectsContainer, individualProjectContainer) => {
    if(!individualProjectContainer){
        return;
    }
    individualProjectContainer.innerHTML = '';
    paintProjects(projectsContainer, projectsArray);
}

// this function allows to modify the project area
export const modifyProject = (projects, projectId, projectTitle, projectDescription, editBtn, deleteBtn) => {
    // removes the edit and delete project buttons
    editBtn.remove();
    deleteBtn.remove();
    // creates an accept button
    const projectCard = document.getElementById(`${projectId}`);
    const acceptBtn = document.createElement('button');
    acceptBtn.classList.add('accept-btn');
    acceptBtn.textContent= 'Accept';
    projectCard.appendChild(acceptBtn);
    // creates a cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.textContent = 'Cancel';
    projectCard.appendChild(cancelBtn);

    // filters the project
    const project = projects.find(p => p.id === projectId);
    if(project){
        // convert the h2 title into an input
        const title = projectTitle;
        const titleInput = document.createElement('input');
        titleInput.id = `title-${projectId}`;
        titleInput.value = title.textContent;
        title.replaceWith(titleInput);
        // convert the description p into an input
        const description = projectDescription;
        const descriptionInput = document.createElement('input');
        descriptionInput.id = `desc-${projectId}`;
        if(description){
            descriptionInput.value = projectDescription.textContent;
            description.replaceWith(descriptionInput);
        } else {
            descriptionInput.value = '';
            titleInput.after(descriptionInput);
        }
    }
}

// function that creates a form to add todos
export const createTodoForm = (individualProjectContainer) => {
    individualProjectContainer.innerHTML += 
    `
    <div class="todo-form-container">
        <form class="todo-form">
            <h2 class="form-title">New Task</h2>
            <label for="todo-name">Task Name:</label>
            <input type="text" id="todo-name" name="todo-name" required>
            <label for="todo-date">Task Date:</label>
            <input type="date" id="todo-date" name="todo-date" required>
            <label for="todo-desc">Descroption:</label>
            <input type="text" id="todo-desc" name="todo-desc">
        </form>        
    </div>
    `
}


    


