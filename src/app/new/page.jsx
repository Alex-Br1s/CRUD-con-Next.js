'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const NewPage = ({params}) => {
  console.log(params.id);
  const router = useRouter()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if(params.id){
      fetch(`/api/tasks/${params.id}`)//? No va http:localhost:3000, porque es componente cliente y no hace falta ponerlo
      .then((res => res.json()))
      .then((data => {
        setTitle(data.title);
        setDescription(data.description);
      }))
    }
  }, [])

  const handlerSubmit = async (event) => {
    event.preventDefault()

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
    router.refresh()
    router.push('/')
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <form className='bg-slate-800 p-10 w-1/4' onSubmit={handlerSubmit}>

        <label htmlFor="title" className='font-bold text-sm'>Titulo de la tarea</label>
        <input onChange={(e)=> setTitle(e.target.value)} value={title} type="text" id='title' className='border border-gray-400 p-2 mb-4 w-full text-black' placeholder='Titulo...'/>

        <label htmlFor="description" className='font-bold text-sm'>Descripción de la tarea</label>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows="3" id='description' className='border border-gray-400 p-2 mb-4 w-full text-black' placeholder='Describe tu tarea'></textarea>

      <div className='flex justify-between'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded'>Create</button>
        {params.id && (
        <button
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded'
        type='button'
        onClick={async () => {
          const res = await fetch(`/api/tasks/${params.id}`,{
            method: 'DELETE'
          })
          const data = await res.json()
          setTitle('')
          setDescription('')
          router.refresh()
          router.push('/')
        }}
        >Delete</button>
        )}
      </div>
      </form>
    </div>
  )
}

export default NewPage