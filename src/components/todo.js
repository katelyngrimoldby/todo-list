const Todo = (title, date, description, priority) => {
    const getTitle = () => title;
    const getDate = () => date;
    const getDescription = () => description;
    const getPriority = () => priority;

    const setTitle = (input) => {
        title = input;
    }
    const setDate = (input) => {
        date = input;
    }
    const setDescription = (input) => {
        description = input;
    }
    const setPriority = (input) => {
        priority = input;
    }

    return { getTitle, getDate, getDescription, getPriority, setTitle, setDate, setDescription, setPriority };
};

export default Todo;