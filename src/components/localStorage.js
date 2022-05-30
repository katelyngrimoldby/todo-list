import ProjectManager from "./projectManager";

const LocalStorage = (() => {
    const isStorageAvailable = () => {
        let storage;
        try {
            storage = window['localStorage'];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    const isExistingStorage = () => {
        if (localStorage.length > 0) {
            return true
        } else {
            return false
        }
    }

    const saveData = () => {
        let projectStorage = []

        const savedProject = function(index, title) {
            this.id = index;
            this.title = title;
            this.todos = [];
        }

        const savedTodo = function(index, title, date, description, priority) {
            this.id = index;
            this.title = title;
            this.date = date;
            this.description = description;
            this.priority = priority;
        }

        ProjectManager.projects.forEach((e, i) => {
            projectStorage.append(new savedProject(i, e.getTitle()));

            ProjectManager.projects.at(i).items.forEach((tE, tI) => {
                projectStorage[i].todos.append(new savedTodo(tI, tE.getTtitle(), tE.getDate(), tE.getDescription(), tE.getPriority()));
            });
        });
        localStorage.setItem('data', JSON.stringify(projectStorage));
    }

    const getData = () => {
        const projectStorage = JSON.parse(localStorage.getItem('data'));
        return projectStorage;
    }

    const parseData = () => {
        const projectStorage = getData();

        projectStorage.forEach((e, i) => {
            ProjectManager.addProject(e.title);

            projectStorage[i].todos.forEach((tE) => {
                ProjectManager.projects.at(i).createNewItem(tE.title, tE.date, tE.description, tE.priority);
            });
        });
    }

    const resetStorage = () => {
        localStorage.removeItem('data');
    }

    return { isStorageAvailable, isExistingStorage, saveData, getData, parseData, resetStorage}
})();