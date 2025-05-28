import axios from 'axios';

export const createProject = async (projectData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            'https://sunuagri-backend.onrender.com/projects/create-project',
            projectData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Erreur lors de la création du projet :", error);
        throw error;
    }
};

export const getProjects = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
            'https://sunuagri-backend.onrender.com/projects/',
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
        throw error;
    }
};

export const getProjectDetails = async (projectId) => {
    try {
        const response = await axios.get(
            `https://sunuagri-backend.onrender.com/projects/${projectId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du projet :", error);
        throw error;
    }
};

export const getAllProjects = async () => {
    try {
        const response = await axios.get(
            'https://sunuagri-backend.onrender.com/projects/all',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
        throw error;
    }
};

