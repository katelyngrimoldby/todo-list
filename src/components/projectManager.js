import Project from "./project";

const ProjectManager = (() => {
    const projects = [];

    const addProject = (title) => {
        let newProject = Project(title);
        projects.push(newProject);
    }
    const removeProject = (id) => {
        projects.splice(id, 1);
    }

    return { projects, addProject, removeProject };
})();

export default ProjectManager;