import format from 'date-fns/format';
import Project from './project';
import ProjectManager from './projectManager';
import Todo from './todo';
const content = document.querySelector('#content');

const ProjectUi = (() => {
    //make card
    const createProject = (element, id) => {
        //create elements
        const card = document.createElement('div');
        const name = document.createElement('h2');
        const addBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        const renameBtn = document.createElement('button');

        //add content
        card.classList.add('projectCard')
        name.textContent = element.getTitle();

        addBtn.setAttribute('type', 'button');
        addBtn.classList.add('add');
        addBtn.classList.add(id);
        addBtn.textContent = 'Add Todo';

        removeBtn.setAttribute('type', 'button');
        removeBtn.classList.add('remove');
        removeBtn.classList.add(id);
        removeBtn.textContent = 'Delete Project';

        renameBtn.setAttribute('type', 'button');
        renameBtn.classList.add('rename');
        renameBtn.classList.add(id);
        renameBtn.textContent = 'Rename Project';

        //append everything
        card.append(name, addBtn, removeBtn, renameBtn);
        content.appendChild(card);

        //event listeners
        addBtn.addEventListener('click', () => {
            element.createNewItem();
        });

        removeBtn.addEventListener('click', () => {
            ProjectManager.removeProject(id);
        });

        renameBtn.addEventListener('click', () => {
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
            while (card.firstChild) {
                card.removeChild(card.firstChild);
            }
            
            //add edit form
            card.append(input, saveBtn);

            //event listener for value
            input.addEventListener('change', (e) => {
                element.setTitle(e.target.value);
            });

            //event listener for submit
            saveBtn.addEventListener('click', () => {
                name.textContent = element.getTitle();

                //clear card
                while (card.firstChild) {
                    card.removeChild(card.firstChild);
                }

                //add normal contents
                card.append(name, addBtn, removeBtn, renameBtn);
            })
        })
    }
    // render projects
    const render = () => {
        ProjectManager.projects.forEach((e, i) => {
            createProject(e, i);
        })
    }
})();