import { useNavigate } from "react-router-dom";
import ProjectForm from "../../components/admin/ProjectForm";
import { createProject } from "../../services/projectService";

const AddProject = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createProject(formData);

      navigate("/admin/projects");
    } catch (error) {
      console.error(
        "Create project error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to create project."
      );
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <p className="text-[10px] font-mono tracking-[0.3em] text-blue-500">
          NEW PROJECT
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          Add Project
        </h1>
      </div>

      <ProjectForm
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProject;