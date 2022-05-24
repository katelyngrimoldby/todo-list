const ProjectManager = (() => {
    const projects = [];

    const addProject = (project) => {
        projects.push(project);
    }
    const removeProject = (id) => {
        projects.splice(id, 1);
    }

    return { projects, addProject, removeProject };
})();

export default ProjectManager;