const project = (title) => {
    const items = []
    const getTitle = () => title;
    const addItem = (item) => {
        items.push(item);
    }
    const removeItem = (e) => {
        items.splice(e.target.id, 1);
    }

    return {items, getTitle, addItem, removeItem }
}

export default project;