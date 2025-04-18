import { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SCHOOL_PROJECTS } from '../../lib/constants';

export interface SchoolProject {
  id: string
  title: string
  description: string
  year: string
  category: string
  tags: string[]
  image: string | null
  objectives: string[]
  skills: string[]
  color: string
  featured: boolean
  slug?: string
}

interface ProjectCardProps {
  project: SchoolProject;
  activeProject: string | null;
  toggleProject: (id: string) => void;
}

// Composant de carte de projet isolé pour optimiser les re-rendus
const ProjectCard = memo(({ project, activeProject, toggleProject }: ProjectCardProps) => {
  const router = useRouter();
  const isActive = activeProject === project.id;

  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
      <div
        className={`border-3 border-black rounded-xl overflow-hidden bg-white transition-all ${
          isActive ? "transform -translate-y-1" : ""
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Project image */}
          <div className="md:col-span-5 relative">
            <div
              className="h-[200px] md:h-full overflow-hidden cursor-pointer"
              style={{ backgroundColor: `${project.color}30` }}
              onClick={() => router.push(`/work/project/${project.slug || project.id}`)}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={100}
                height={100}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-3 bg-white text-black font-bold px-2 py-1 rounded-full border-2 border-black text-xs">
              {project.year}
            </div>
          </div>

          {/* Project info */}
          <div className="md:col-span-7 p-4 sm:p-6">
            <h3 className="text-xl font-bold mb-2">
              <Link href={`/work/project/${project.slug || project.id}`} className="hover:text-[#f67a45] transition-colors">
                {project.title}
              </Link>
            </h3>
            <p className="text-[#3C3C3C] mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#FFE8DD] px-2 py-1 text-xs rounded-full border border-black"
                  style={{ backgroundColor: `${project.color}30` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleProject(project.id)}
                className="flex items-center font-medium text-[#f67a45]"
              >
                {isActive ? "Voir moins" : "Voir plus"}
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${isActive ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <Link href={`/work/project/${project.slug || project.id}`} className="relative inline-block group">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                <div className="relative px-4 py-2 bg-white border-2 border-black rounded-full font-medium flex items-center transition-transform group-hover:-translate-y-0.5 text-sm">
                  Voir le projet
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Expandable project details */}
        {isActive && (
          <div className="p-4 sm:p-6 border-t-2 border-black bg-[#FFFBF5]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">Objectifs du projet</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#3C3C3C]">
                  {project.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Compétences développées</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#3C3C3C]">
                  {project.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const ProjectsSection = memo(() => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  
  const toggleProject = (id: string) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <section id="projects" className="w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl mx-auto mb-16 sm:mb-24">
      <div className="relative">
        <div className="absolute -top-6 left-4 transform rotate-2 z-10">
          <div className="bg-[#F67A45] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm sm:text-base">
            Projets d'école
          </div>
        </div>

        <div className="relative border-4 sm:border-6 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 mt-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Mes projets académiques</h2>
            
            <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
              
              <Link href="/work/gallery">
                <div className="relative inline-block group">
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                  <button className="relative px-4 py-2 bg-white border-2 border-black rounded-full text-sm font-medium transition-transform group-hover:-translate-y-0.5 inline-flex items-center">
                    Albums photos
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </Link>
            </div>
          </div>

          {/* Interactive project cards */}
          <div className="space-y-8">
            {SCHOOL_PROJECTS.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">Aucun projet trouvé</h3>
                <p className="text-gray-600">Les projets apparaîtront ici une fois ajoutés.</p>
              </div>
            ) : (
              SCHOOL_PROJECTS.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  activeProject={activeProject} 
                  toggleProject={toggleProject}
                />
              ))
            )}
          </div>
          
          {/* View all projects and portfolio buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/gallery-view" className="relative inline-block group">
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div className="relative px-6 py-2 bg-white border-2 border-black rounded-full font-medium flex items-center transition-transform group-hover:-translate-y-0.5">
                Portfolio complet
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

ProjectCard.displayName = 'ProjectCard';
ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;