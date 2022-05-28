import Project from "./project";

const ProjectManager = (() => {
    const projects = [];

    const addProject = () => {
        newProject = new Project('New Project');
        projects.push(newProject);
    }
    const removeProject = (id) => {
        projects.splice(id, 1);
    }

    return { projects, addProject, removeProject };
})();

export default ProjectManager;