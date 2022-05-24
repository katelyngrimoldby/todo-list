const Project = (title) => {
    const items = []
    const getTitle = () => title;
    const addItem = (item) => {
        items.push(item);
    }
    const removeItem = (id) => {
        items.splice(id, 1);
    }

    return {items, getTitle, addItem, removeItem }
}

export default Project;