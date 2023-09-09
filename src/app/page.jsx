import {prisma} from '@/app/libs/prisma'
import TaskCard from './components/TaskCard'

async function getTasksPrisma(){//?Dos formas de traer las tareas de la base de datos
  const res = await prisma.task.findMany()
  return res
}

//export const revalidate = 60 //? actualiza las tarea luego de 1min de ser creadas
export const dynamic = 'force-dynamic'

/* async function getTasks(){//?Dos formas de traer las tareas de la base de datos
  const res = await fetch('http://localhost:3000/api/tasks')
  const data = await res.json()
  console.log(data)
} */
async function HomePage() {
  const tasks = await getTasksPrisma()
  //getTasks()

  return (
    <section className='container mx-auto'>
    <div className='grid grid-cols-3 gap-3 mt-10'>
    {tasks.map((task)=>(
     <TaskCard task={task} key={task.id}/>
    ))}
    </div>
    </section>
  )
}

export default HomePage;
