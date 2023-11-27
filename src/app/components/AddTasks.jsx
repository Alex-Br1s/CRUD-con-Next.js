'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

const AddTask = () => {
    const router = useRouter()
    return (
      <div className='h-72 w-80 mt-10 mx-3 border-2 border-slate-500 flex justify-center items-center cursor-pointer rounded-xl' onClick={() => router.push('/new')}>
      <p className='text-7xl text-slate-400'>+</p>
      </div>
    )
}
export default AddTask