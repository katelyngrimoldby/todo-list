import format from 'date-fns/format';
import Todo from './todo';

const Project = (title) => {
    const items = []
    const getTitle = () => title;
    const setTitle = (input) => {
        title = input;
    }
    const createNewItem = () => {
        let newItem
        newItem = new Todo('New Todo', format(Date.now(), 'MM/dd/yyyy'), 'Add Description', 0);
        addItem(newItem);
    }
    const addItem = (item) => {
        items.push(item);
    }
    const removeItem = (id) => {
        items.splice(id, 1);
    }

    return {items, getTitle, setTitle, createNewItem, addItem, removeItem }
}

export default Project;