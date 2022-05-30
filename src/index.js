import format from 'date-fns/format';
import Project from './components/project';
import ProjectManager from './components/projectManager';
import Todo from './components/todo';
import {TodoUi, ProjectUi, WindowUi} from './components/ui';
import LocalStorage from './components/localStorage';

if(LocalStorage.isExistingStorage() && LocalStorage.isStorageAvailable()) {
    WindowUi.loadFromStorage();
} else {
    WindowUi.initLoad();
}

