"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getSchoolProjects, deleteSchoolProject } from '@/app/actions'
import type { SchoolProject } from '@/app/actions'
import GradientBackground from '@/components/ui/background'

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<SchoolProject[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getSchoolProjects()
      if (response.data) {
        setProjects(response.data)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (deleteConfirmation !== id) {
      setDeleteConfirmation(id)
      return
    }

    const response = await deleteSchoolProject(id)
    if (!response.error) {
      setProjects(projects.filter(project => project.id !== id))
    }
    setDeleteConfirmation(null)
  }

  if (loading) {
    return (
      <main className="relative min-h-screen">
        <GradientBackground />
        <div className="relative z-30 container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen">
      <GradientBackground />
      <div className="relative z-30 container mx-auto px-4 py-12">
        <div className="relative border-4 border-black bg-white p-6 rounded-xl mb-12">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
          
          <div className="relative mb-6">
            <div className="absolute -top-8 left-4 transform rotate-3 z-10">
              <div className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm">
                Administration
              </div>
            </div>
            <div className="flex justify-between items-start mt-4">
              <h1 className="text-4xl font-bold">Projets</h1>
              <Link
                href="/admin/projects/new"
                className="relative inline-block group"
              >
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                <div className="relative px-4 py-2 bg-[#f67a45] text-white border-2 border-black rounded-xl font-medium inline-flex items-center space-x-2 transition-transform group-hover:-translate-y-0.5">
                  <span className="text-xl">+</span>
                  <span>Nouveau projet</span>
                </div>
              </Link>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm mb-4">
                Aucun projet
              </div>
              <p className="text-gray-600 mb-6">Vous n'avez pas encore créé de projet.</p>
              <Link
                href="/admin/projects/new"
                className="relative inline-block group"
              >
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                <div className="relative px-6 py-3 bg-[#f67a45] text-white border-2 border-black rounded-xl font-medium inline-flex items-center space-x-2 transition-transform group-hover:-translate-y-0.5">
                  <span className="text-xl">+</span>
                  <span>Créer votre premier projet</span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10"></div>
                  <div className="relative border-3 border-black rounded-xl bg-white overflow-hidden">
                    <div className="p-6" style={{ backgroundColor: `${project.color}30` }}>
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">{project.title}</h2>
                        {project.featured && (
                          <span className="bg-[#FFD2BF] px-3 py-1 rounded-full text-sm border-2 border-black">
                            Mis en avant
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full border border-black"
                            style={{ backgroundColor: `${project.color}30` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end items-center gap-3">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="relative inline-block group"
                        >
                          <div className="absolute inset-0 bg-black translate-x-0.5 translate-y-0.5 rounded-lg transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                          <div className="relative px-3 py-1.5 bg-white border-2 border-black rounded-lg font-medium inline-flex items-center space-x-1 transition-transform group-hover:-translate-y-0.5">
                            <span>Modifier</span>
                          </div>
                        </Link>

                        {deleteConfirmation === project.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="px-3 py-1.5 bg-red-500 text-white border-2 border-black rounded-lg font-medium hover:bg-red-600"
                            >
                              Confirmer
                            </button>
                            <button
                              onClick={() => setDeleteConfirmation(null)}
                              className="px-3 py-1.5 bg-gray-200 border-2 border-black rounded-lg font-medium hover:bg-gray-300"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmation(project.id)}
                            className="relative inline-block group"
                          >
                            <div className="absolute inset-0 bg-black translate-x-0.5 translate-y-0.5 rounded-lg transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                            <div className="relative px-3 py-1.5 bg-white border-2 border-black rounded-lg font-medium inline-flex items-center space-x-1 transition-transform group-hover:-translate-y-0.5 text-red-500">
                              <span>Supprimer</span>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 