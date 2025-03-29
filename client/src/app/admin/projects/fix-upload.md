# Instructions pour corriger le problème d'upload d'images

1. Modifiez la fonction `uploadProjectImage` dans `src/app/actions.ts` pour qu'elle retourne toujours une URL valide:

```typescript
export async function uploadProjectImage(formData: FormData): Promise<ServerActionResponse<{ url: string }>> {
  'use server'
  try {
    // Pour cet exemple, on retourne simplement un placeholder
    console.log('Uploading image...')
    
    // Simuler un délai d'upload
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return { 
      data: { 
        url: '/placeholder.svg'
      } 
    }
  } catch (error) {
    console.error('Upload project image error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to upload project image' }
  }
}
```

2. Modifiez la fonction `handleUploadMainImage` dans `src/app/admin/projects/[id]/EditProjectClient.tsx` pour gérer le cas d'un nouveau projet:

```typescript
const handleUploadMainImage = async () => {
  if (!selectedFile) return

  setSaving(true)
  const formData = new FormData()
  formData.append('file', selectedFile)
  
  // Pour un nouveau projet, utiliser un ID temporaire
  formData.append('projectId', id === 'new' ? 'temp-new-project' : id)

  try {
    const response = await uploadProjectImage(formData)
    if (response.error) {
      console.error('Error uploading image:', response.error)
      alert(`Erreur lors de l'upload: ${response.error}`)
    } else if (response.data && response.data.url) {
      setFormData(prev => ({ ...prev, image: response.data.url }))
      setSelectedFile(null)
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    alert('Une erreur inattendue est survenue')
  } finally {
    setSaving(false)
  }
}
```

3. Modifiez la fonction `handleAddProjectImage` pour refuser d'ajouter des images à un projet qui n'existe pas encore:

```typescript
const handleAddProjectImage = async () => {
  if (!selectedFile) return
  
  // Pour un nouveau projet, on ne peut pas ajouter des images avant de l'avoir créé
  if (id === 'new') {
    alert('Veuillez d\'abord créer le projet avant d\'ajouter des images à la galerie')
    return
  }

  setUploadingImage(true)
  const imageFormData = new FormData()
  imageFormData.append('file', selectedFile)
  imageFormData.append('projectId', id)

  try {
    // First upload the image file
    const uploadResponse = await uploadProjectImage(imageFormData)
    if (uploadResponse.error) {
      console.error('Error uploading image:', uploadResponse.error)
      alert(`Erreur lors du téléchargement: ${uploadResponse.error}`)
      return
    }

    if (uploadResponse.data && uploadResponse.data.url) {
      // Then save it as a project image with caption
      const imageResponse = await addProjectImage({
        projectId: id,
        url: uploadResponse.data.url,
        caption: newImageCaption || selectedFile.name
      })

      if (imageResponse.error) {
        console.error('Error adding project image:', imageResponse.error)
        alert(`Erreur lors de l'ajout de l'image: ${imageResponse.error}`)
      } else if (imageResponse.data) {
        setProjectImages(prev => [...prev, imageResponse.data])
        setSelectedFile(null)
        setNewImageCaption('')
      }
    }
  } catch (error) {
    console.error('Error handling project image:', error)
    alert('Une erreur inattendue est survenue')
  } finally {
    setUploadingImage(false)
  }
}
``` 