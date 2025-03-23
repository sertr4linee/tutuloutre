"use client"

import { useState } from "react";
import { updateAbout } from "@/app/actions";

interface AboutEditorProps {
  setToast: (toast: { show: boolean; message: string; type: 'success' | 'error' }) => void;
}

export default function AboutEditor({ setToast }: AboutEditorProps) {
  const [formData, setFormData] = useState({
    myApproach: "",
    education: {
      degree: "",
      school: "",
      years: ""
    },
    skills: [] as string[]
  })

  const handleSave = async () => {
    try {
      const result = await updateAbout(formData)
      
      if (result.error) {
        throw new Error(result.error)
      }
      
      setToast({
        show: true,
        message: 'Changements sauvegardés avec succès',
        type: 'success'
      })
    } catch (error) {
      setToast({
        show: true,
        message: 'Erreur lors de la sauvegarde',
        type: 'error'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Éditer la page About</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Sauvegarder
        </button>
      </div>

      <div className="space-y-6">
        {/* My Approach */}
        <div>
          <label className="block mb-2 font-medium">Mon Approche</label>
          <textarea
            value={formData.myApproach}
            onChange={(e) => setFormData(prev => ({ ...prev, myApproach: e.target.value }))}
            className="w-full p-3 border-2 border-black rounded-lg"
            rows={4}
            placeholder="Décrivez votre approche..."
          />
        </div>

        {/* Education */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-medium">Diplôme</label>
            <input
              type="text"
              value={formData.education.degree}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                education: { ...prev.education, degree: e.target.value }
              }))}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">École</label>
            <input
              type="text"
              value={formData.education.school}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                education: { ...prev.education, school: e.target.value }
              }))}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Années</label>
            <input
              type="text"
              value={formData.education.years}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                education: { ...prev.education, years: e.target.value }
              }))}
              className="w-full p-3 border-2 border-black rounded-lg"
              placeholder="ex: 2020-2023"
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-2 font-medium">Compétences</label>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 border-2 border-black rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    skills: prev.skills.filter((_, i) => i !== index)
                  }))}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={() => {
                const skill = prompt('Ajouter une compétence')
                if (skill) {
                  setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, skill]
                  }))
                }
              }}
              className="px-3 py-1 border-2 border-black rounded-full text-sm"
            >
              + Ajouter une compétence
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 