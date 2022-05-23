const todoFactory = (title, date, description, priority) => {
    const getTitle = () => title;
    const getDate = () => date;
    const getDescription = () => description;
    const getPriority = () => priority;

    return { getTitle, getDate, getDescription, getPriority };
};

export default todoFactory;