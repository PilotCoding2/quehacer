// this function opens a form to add new projects to the projects array
export const addProjectsForm = () => {
    if(document.querySelector('.form')){
        return;
    }
    const formBody = document.createElement('div');
    formBody.classList.add('form');
    formBody.innerHTML += 
    `
    <button class="cancel-form">X</button>
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

// this function allows to remove forms
export const removeForm = (form) => {
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
        }
        paintTodoInProjects(projectsArray, projectId, individualProjectContainer);
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
        // adds the label for the title input
        const titleLabel = document.createElement('label');
        titleLabel.htmlFor = `title-${projectId}`;
        titleLabel.classList.add('edit-input-label');
        titleLabel.textContent = 'Project Name';
        // convert the h2 title into an input
        const title = projectTitle;
        const titleInput = document.createElement('input');
        titleInput.id = `title-${projectId}`;
        titleInput.value = title.textContent;
        title.replaceWith(titleInput);
        titleInput.before(titleLabel);
        // adds the label for the description input
        const descLabel = document.createElement('label');
        descLabel.htmlFor = `desc-${projectId}`;
        descLabel.classList.add('edit-input-label');
        descLabel.textContent = 'Description';
        // convert the description p into an input
        const description = projectDescription;
        const descriptionInput = document.createElement('input');
        descriptionInput.id = `desc-${projectId}`;
        if(description){
            descriptionInput.value = projectDescription.textContent;
            description.replaceWith(descriptionInput);
            descriptionInput.before(descLabel);
        } else {
            descriptionInput.value = '';
            titleInput.after(descriptionInput);
            descriptionInput.before(descLabel);
        }
    }
}

// function that creates a form to add todos
export const createTodoForm = (individualProjectContainer) => {
    individualProjectContainer.innerHTML += 
    `
    <div class="todo-form-container">
        <button class="cancel-todo-form">X</button>
        <form class="todo-form">
            <h2 class="form-title">New Task</h2>
            <label for="todo-name">Task Name:</label>
            <input type="text" id="todo-name" name="todo-name" required>
            <label for="todo-date">Task Date:</label>
            <input type="date" id="todo-date" name="todo-date" required>
            <label for="todo-desc">Description:</label>
            <input type="text" id="todo-desc" name="todo-desc">
            <input type="submit" id="create-todo" value="Add Task">
        </form>        
    </div>
    `
}

// function that paints the currently viewed project todos
export const paintTodoInProjects = (projects, projectId, todoContainer) => {
    const project = projects.find(p => p.id === projectId);
    const allTodoCards = document.querySelectorAll('.todo-card');
    if(project){
        if(project.todos.length > 0){
            const allTodoCards = document.querySelectorAll('.todo-card');
            if(allTodoCards){
                allTodoCards.forEach(card => {
                    card.remove();
                });
            }
            project.todos.forEach(todo => {
                todoContainer.innerHTML += 
                `
                <div class="todo-card" id="${todo.id}">
                    <h2 class="todo-title" id="title-${todo.id}">${todo.name}</h2>
                    <p class="todo-due-date" id="date-${todo.id}">${todo.todoDate}</p>
                    <p class="todo-description" id="desc-${todo.id}">${todo.description}</p>
                    <button class="delete-todo">Delete</button>
                    <button class="edit-todo">Edit</button>
                </div>
                `
            });
        } else {
            allTodoCards.forEach(card => {
                card.remove();
            })
        }
    }
}

export const modifyTodos = (projects, projectId, todoId, editBtn, deleteBtn, todoTitle, todoDate, todoDesc) => {
    editBtn.remove();
    deleteBtn.remove();

    // creates an accept button
    const todoCard = document.getElementById(`${todoId}`);
    const acceptBtn = document.createElement('button');
    acceptBtn.classList.add('todo-accept-btn');
    acceptBtn.textContent = 'Accept';
    todoCard.appendChild(acceptBtn);

    // creates a cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('todo-cancel-btn');
    cancelBtn.textContent = 'Cancel';
    todoCard.appendChild(cancelBtn);

    // filters the todo and project
    const project = projects.find(p => p.id === projectId);
    if(project){
        // filters the desired todo
        const todo = project.todos.find(t => t.id === todoId);
        if(todo){
            // create labels for the todo elements
            const titleLabel = document.createElement('label');
            const dateLabel = document.createElement('label');
            const descLabel = document.createElement('label');
            // add the for and inner text
            titleLabel.htmlFor = `title-${todoId}`;
            titleLabel.textContent = 'Task Name';

            dateLabel.htmlFor = `date-${todoId}`;
            dateLabel.textContent = 'Task Due Date';

            descLabel.htmlFor = `desc-${todoId}`;
            descLabel.textContent = 'Task Description';
            // convert the text into inputs
            const titleText = todoTitle;
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.id = `title-${todoId}`;
            titleInput.value = titleText.textContent;
            titleText.replaceWith(titleInput);
            titleInput.before(titleLabel);

            const dateText = todoDate;
            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.id = `date-${todoId}`;
            dateInput.value = dateText.textContent;
            dateText.replaceWith(dateInput);
            dateInput.before(dateLabel);
            
            const descText = todoDesc;
            const descInput = document.createElement('input');
            descInput.type = 'text';
            descInput.id =  `desc-${todoId}`;
            if(descText){
                descInput.value = descText.textContent;
                descText.replaceWith(descInput);
                descInput.before(descLabel);
            } else {
                descInput.value = '';
                dateInput.after(descInput);
                descInput.before(descLabel);
            }

        }
    }
}


    


