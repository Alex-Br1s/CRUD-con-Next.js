'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const NewPage = ({params}) => {
  console.log(params.id);
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [titleError, setTitleError] = useState(null); // Estado para el error del título
  const [descriptionError, setDescriptionError] = useState(null);

  useEffect(() => {
    if(params.id){
      fetch(`/api/tasks/${params.id}`)
      .then((res => res.json()))
      .then((data => {
        setTitle(data.title)
        setDescription(data.description)
      }))
    }
  }, [])

/*   const handlerChange = (event) => {
    const { name, value } = event.target

    if(name === 'title'){
      setTitle(value)
    }
    else if(name === 'description'){
      setDescription(value)
    }

  }; */

  const handleTitleChange = (event) => {
    const { value } = event.target;
  
    // Verificar si el título está vacío
    if (value.trim() === "") {
      setTitleError("El título no puede estar vacío");
    } else if (value.length > 25) {
      // Verificar si el título supera los 25 caracteres
      setTitleError("El título no debe tener más de 25 caracteres");
    } else {
      setTitleError(null); // Limpiar el error si es válido
    }
  
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    if (value.length > 150) {
      setDescriptionError("La descripción no debe tener más de 150 caracteres");
    } else {
      setDescriptionError(null);
    }
    setDescription(value);
  };


  const handlerSubmit = async (event) => {
    event.preventDefault()

    if (titleError || descriptionError) {
      setError("Por favor, corrige los errores antes de enviar el formulario.");
      return;
    }
    setError(null);

    if(params.id){
      const res = await fetch(`/api/tasks/${params.id}`,{
        method: 'PUT',
        body: JSON.stringify({title, description}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      console.log(data)
    }else{
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({title, description}),
        headers: {
         'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data);
 }
  setTitle('')
  setDescription('')
  router.refresh()//? Nos sirve para que a la hora de crear, actualizar o eliminar una tarea se vea refleja sin tener que actualizar la pagina
  router.push('/')//? Nos redirecciona al "home" una ves terminado la petición
}

  const deleteTask = async() => {
    const res = await fetch(`/api/tasks/${params.id}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    console.log(data);
    setTitle('');
    setDescription('');
    router.refresh()
    router.push('/');
  }


  return (
    <div className="flex justify-center items-center">
     <div className="mt-20 w-80 bg-slate-500 rounded-xl">
      <form className="flex flex-col items-center m-auto" onSubmit={handlerSubmit}>
        <label htmlFor="title" className="my-2 text-2xl text-slate-200 font-semibold">Title</label>
        <input
        id="title"
        type="text"
        name="title" 
        value={title} 
        className="mb-3 h-8 w-56" 
        placeholder="Add title" 
        onChange={handleTitleChange}  />
        {titleError && <p className="text-red-400">{titleError}</p>}

        <label htmlFor="description" className="mb-3 text-2xl text-slate-200 font-semibold">Description</label>
        <textarea
         id="description"
         rows='4'
         name="description" 
         value={description} 
         className="w-56"
         placeholder="Add description" 
         onChange={handleDescriptionChange}></textarea>
         {descriptionError && <p className="text-red-400">{descriptionError}</p>}

      <div className="flex">
      {params.id ? (
      <>
       <button type="submit" className="mx-16 mt-5 mb-3 bg-celeste h-10 w-20 rounded text-white">Update</button>
       <button type="button"className="mx-16 mt-5 mb-3 bg-red-400 h-10 w-20 rounded text-white"onClick={deleteTask}>Delete</button>
      </>
      ) : (
       <button type="submit" className="mx-16 mt-5 mb-2 bg-celeste h-10 w-20 rounded text-white">Create</button>
      )}
      </div>
      </form>
     </div>
    </div>
  );
}

export default NewPage