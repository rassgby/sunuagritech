'use client';
import { useState, useEffect } from 'react';
import { getProjectDetails } from '@/app/services/projects';
import { X } from 'lucide-react';

interface ProjectDetailsModalProps {
  projectId: string;
  onClose: () => void;
}

interface Project {
  project_name: string;
  description: string;
  project_type: string;
  start_date: string;
  end_date: string;
  budget: number;
  location: string;
  objectives: string[];
  risks: string[];
}

const ProjectDetailsModal = ({ projectId, onClose }: ProjectDetailsModalProps) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const result = await getProjectDetails(projectId);
        if (result) {
          setProject(result);
        } else {
          console.error("Error fetching project details: No data received");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <div>Chargement ...</div>;
  }

  if (!project) {
    return <div>Aucun projet trouvé</div>;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Détails du projet</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900">{project.project_name}</h2>
          <p className="mt-2 text-gray-600">{project.description}</p>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Type de projet</span>
              <span>{project.project_type}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Date de début</span>
              <span>{new Date(project.start_date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Date de fin</span>
              <span>{new Date(project.end_date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Budget</span>
              <span>{project.budget.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Localisation</span>
              <span>{project.location}</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Objectifs</h4>
            <ul className="list-disc pl-5">
              {project.objectives.map((objective, index) => (
                <li key={index} className="text-gray-600">{objective}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Risques</h4>
            <ul className="list-disc pl-5">
              {project.risks.map((risk, index) => (
                <li key={index} className="text-gray-600">{risk}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;


