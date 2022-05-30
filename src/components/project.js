const Project = (title) => {
    const items = []
    const getTitle = () => title;
    const setTitle = (input) => {
        title = input;
    }
    const createNewItem = (title, date, description, priority) => {
        let newItem = Todo(title, date, description, priority);
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