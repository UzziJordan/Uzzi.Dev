import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProjectForm from "../../components/admin/ProjectForm";

import {
  getProjects,
  updateProject,
} from "../../services/projectService";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projects =
          await getProjects();

        const foundProject =
          projects.find(
            (item) => item._id === id
          );

        if (!foundProject) {
          navigate("/admin/projects");
          return;
        }

        setProject(foundProject);
      } catch (error) {
        console.error(
          "Load project error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);

      await updateProject(
        id,
        formData
      );

      navigate("/admin/projects");
    } catch (error) {
      console.error(
        "Update project error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update project."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-[10px] font-mono tracking-[0.3em] text-gray-600">
        LOADING PROJECT...
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <p className="text-[10px] font-mono tracking-[0.3em] text-blue-500">
          EDIT PROJECT
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          {project.title}
        </h1>
      </div>

      <ProjectForm
        initialData={project}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </div>
  );
};

export default EditProject;