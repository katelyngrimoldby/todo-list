const Project = (title) => {
    const items = []
    const getTitle = () => title;
    const setTitle = (input) => {
        title = input;
    }
    const addItem = (item) => {
        items.push(item);
    }
    const removeItem = (id) => {
        items.splice(id, 1);
    }

    return {items, getTitle, setTitle, addItem, removeItem }
}

export default Project;