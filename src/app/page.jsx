import {prisma} from '@/app/libs/prisma'
import TaskCard from './components/TaskCard'
import AddTask from './components/AddTasks';

async function getTasksPrisma(){//?Dos formas de traer las tareas de la base de datos
  const res = await prisma.task.findMany()
  console.log(res);
  return res
}

//export const revalidate = 60 //? Actualiza las tarea luego de 1min de ser creadas
export const dynamic = 'force-dynamic'//? Lo actualiza al instante

/* async function getTasks(){//?Dos formas de traer las tareas de la base de datos
  const res = await fetch('http://localhost:3000/api/tasks')
  const data = await res.json()
  console.log(data)
} */
async function HomePage() {
  const tasks = await getTasksPrisma()
  //getTasks()

  return (
    <section className='flex flex-wrap'>
    <div  className='flex flex-row flex-wrap'>
    {tasks.map((task)=>(
     <TaskCard task={task} key={task.id}/>
    ))}
    </div>
    <AddTask />
    </section>
  )
}

export default HomePage;
