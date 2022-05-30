import format from 'date-fns/format';
import Project from './project';
import ProjectManager from './projectManager';
import Todo from './todo';
import LocalStorage from './localStorage';
const content = document.querySelector('#content');

const TodoUi = (() => {
    //make card
    const createItem = (element, id, projectId) => {
        let isExpanded = false;
        //create elements
        const card = document.createElement('div');
        const name = document.createElement('h3');
        const date = document.createElement('span');
        const description = document.createElement('p');
        const editBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        const toggleBtn = document.createElement('button');

        //add content
        card.classList.add('itemCard');
        name.textContent = element.getTitle();
        date.textContent = element.getDate()
        description.textContent = element.getDescription()

        removeBtn.setAttribute('type', 'button');
        removeBtn.classList.add('remove');
        removeBtn.classList.add(id);
        removeBtn.textContent = 'Delete Todo';

        editBtn.setAttribute('type', 'button');
        editBtn.classList.add('edit');
        editBtn.classList.add(id);
        editBtn.textContent = 'Edit Todo';

        toggleBtn.setAttribute('type', 'button');
        toggleBtn.classList.add('toggle');
        toggleBtn.classList.add(id);
        toggleBtn.textContent = 'Expand Todo';

        //append some things
        card.append(name, date, removeBtn, toggleBtn);
        const project = document.getElementById(projectId);
        project.appendChild(card);

        //event listeners
        removeBtn.addEventListener('click', () => {
            ProjectManager.projects.at(projectId).removeItem(id);
            card.parentNode.removeChild(card);

            LocalStorage.resetStorage();
            LocalStorage.saveData();
        });

        toggleBtn.addEventListener('click', () => {
            if(isExpanded) {
                card.removeChild(description);
                card.removeChild(editBtn);
                toggleBtn.textContent = 'Expand Todo';
                isExpanded = false;
                console.log(isExpanded)
            }else {
                card.removeChild(removeBtn);
                card.removeChild(toggleBtn);
                card.append(description, editBtn, removeBtn, toggleBtn);
                toggleBtn.textContent = 'Collapse Todo';
                isExpanded = true;
                console.log(isExpanded)
            }
        });

        editBtn.addEventListener('click', () => {
            //create edit elements
            const titleI = document.createElement('input');
            const dateI = document.createElement('input');
            const descriptionI = document.createElement('textarea');
            
            titleI.setAttribute('type', 'text');
            titleI.setAttribute('name', 'title');
            titleI.setAttribute('placeholder', element.getTitle());
            titleI.setAttribute('minlength', '1');

            dateI.setAttribute('type', 'date');
            dateI.setAttribute('name', 'date');

            descriptionI.setAttribute('name', 'description');
            descriptionI.textContent = element.getDescription();

            const saveBtn = document.createElement('button')
            saveBtn.setAttribute('type', 'button');
            saveBtn.classList.add('save');
            saveBtn.textContent = 'Save Changes';

            //clear card
            while (card.firstChild) {
                card.removeChild(card.firstChild);
            }

            //add edit form
            card.append(titleI, dateI, descriptionI, saveBtn);

            //event listeners for values
            titleI.addEventListener('change', (e) => {
                element.setTitle(e.target.value);
            });

            dateI.addEventListener('change', (e) => {
                element.setDate(format(e.target.valueAsNumber, 'MM/dd/yyyy'));
            });

            descriptionI.addEventListener('change', (e) => {
                element.setDescription(e.target.value)
            });

            //event listener for submit
            saveBtn.addEventListener('click', () => {
                name.textContent = element.getTitle();
                date.textContent = element.getDate();
                description.textContent = element.getDescription();

                LocalStorage.saveData();
                //clear card
                while (card.firstChild) {
                    card.removeChild(card.firstChild);
                }

                //add normal contents
                card.append(name, date, description, removeBtn, editBtn, toggleBtn);
            });
        })
    }

    const render = (projectId) => {
        ProjectManager.projects.at(projectId).items.forEach((e, i) => {
            createItem(e, i, projectId);
        });
    }

    const clearTodos = (projectId) => {
        const project = document.getElementById(projectId);

        while (project.childNodes.length > 1) {
            project.removeChild(project.lastChild);
        }
    }

    return { render, clearTodos };
})();

const ProjectUi = (() => {
    //make card
    const createProject = (element, id) => {
        //create elements
        const card = document.createElement('div');
        const wrapper = document.createElement('div');
        const name = document.createElement('h2');
        const addBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        //add content
        card.classList.add('projectCard');
        card.setAttribute('id', id);
        wrapper.classList.add('wrapper');
        name.textContent = element.getTitle();

        addBtn.setAttribute('type', 'button');
        addBtn.classList.add('add');
        addBtn.classList.add(id);
        addBtn.textContent = 'Add Todo';

        removeBtn.setAttribute('type', 'button');
        removeBtn.classList.add('remove');
        removeBtn.classList.add(id);
        removeBtn.textContent = 'Delete Project';

        editBtn.setAttribute('type', 'button');
        editBtn.classList.add('edit');
        editBtn.classList.add(id);
        editBtn.textContent = 'Rename Project';

        //append everything
        wrapper.append(name, addBtn, removeBtn, editBtn);
        card.appendChild(wrapper);
        content.appendChild(card);

        //event listeners
        addBtn.addEventListener('click', () => {
            element.createNewItem('New Todo', format(Date.now(), 'MM, dd, yyyy'), 'Add description', 0);
            TodoUi.clearTodos(id);
            TodoUi.render(id)

            LocalStorage.resetStorage();
            LocalStorage.saveData();
        });

        removeBtn.addEventListener('click', () => {
            ProjectManager.removeProject(id);
            content.removeChild(card);

            LocalStorage.resetStorage();
            LocalStorage.saveData();
        });

        editBtn.addEventListener('click', () => {
            //make edit elements
            const input = document.createElement('input')
            const saveBtn = document.createElement('button')
            input.setAttribute('type', 'text');
            input.setAttribute('name', 'title');
            input.setAttribute('placeholder', element.getTitle());
            input.setAttribute('minlength', '1');
            saveBtn.setAttribute('type', 'button');
            saveBtn.classList.add('save');
            saveBtn.textContent = 'Save Changes';

            //clear card
            while (wrapper.firstChild) {
                wrapper.removeChild(wrapper.firstChild);
            }
            
            //add edit form
            wrapper.append(input, saveBtn);

            //event listener for value
            input.addEventListener('change', (e) => {
                element.setTitle(e.target.value);
            });

            //event listener for submit
            saveBtn.addEventListener('click', () => {
                name.textContent = element.getTitle();

                LocalStorage.saveData();
                //clear card
                while (wrapper.firstChild) {
                    wrapper.removeChild(wrapper.firstChild);
                }

                //add normal contents
                wrapper.append(name, addBtn, removeBtn, editBtn);
            })
        })
    }
    // render projects
    const render = () => {
        ProjectManager.projects.forEach((e, i) => {
            createProject(e, i);
        })
    }

    const clearProjects = () => {
        while (content.childNodes.length > 1) {
            content.removeChild(content.lastChild);
        }
    }

    return { render, clearProjects }
})();

const WindowUi = (() => {
    const initLoad = () => {
        ProjectManager.addProject('New Project');
        ProjectUi.render();
        ProjectManager.projects.at(0).createNewItem('New Todo', format(Date.now(), 'MM, dd, yyyy'), 'Add description', 0);
        TodoUi.render(0);
    }

    const loadFromStorage = () => {
        LocalStorage.parseData()

        ProjectUi.render();

        ProjectManager.projects.forEach((e, i) => {
            TodoUi.render(i);
        })
    }

    const addBtn = document.getElementById('addP');

    addBtn.addEventListener('click', () => {
        ProjectManager.addProject('New Project');
        ProjectUi.clearProjects();
        ProjectUi.render();

        ProjectManager.projects.forEach((e, i) => {
            TodoUi.render(i);
        })

        LocalStorage.resetStorage();
        LocalStorage.saveData();
    });
    return { initLoad, loadFromStorage }
})();

export {TodoUi, ProjectUi, WindowUi};