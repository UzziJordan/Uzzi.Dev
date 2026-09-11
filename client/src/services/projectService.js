import api from "./api";

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

export const getProjects = async () => {
  const response = await api.get("/projects");

  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post(
    "/projects",
    projectData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateProject = async (
  id,
  projectData
) => {
  const response = await api.put(
    `/projects/${id}`,
    projectData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(
    `/projects/${id}`
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

export const getPublishedProjects = async () => {
  const response = await api.get(
    "/projects/public"
  );

  return response.data;
};

export const getHomepageProjects = async () => {
  const response = await api.get(
    "/projects/homepage"
  );

  return response.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await api.get(
    `/projects/slug/${slug}`
  );

  return response.data;
};