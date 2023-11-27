'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const TaskCard = ({task}) => {
  const router = useRouter()
  return (
        <div className='h-72 w-80 flex items-center flex-col mt-10 m-3 border-2 border-slate-500 cursor-pointer rounded-xl'
         onClick={()=>{
            router.push('/tasks/edit/' + task.id)
        }}>
          <div className='m-3'>

          <h3 className='bg-slate-600 text-white w-72 py-2 rounded-xl text-center text-xl font-semibold'>{task.title}</h3>
          <p className='bg-slate-400 text-white w-72 h-48 mt-3 px-3 rounded-xl text-center text-xl whitespace-normal break-words'>{task.description}</p>
          <p>{task.createdAt.toLocaleDateString()}</p>{/* El metodo toLocaleDateString() hace que la fecha se muestre mas amigable y tambien para convertirlo en string para asi poder renderizarse */}
          </div>
        </div>
  )
}

export default TaskCard