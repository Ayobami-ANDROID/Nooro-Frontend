"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import NoTask from "@/components/NoTask";
import TaskCard from "@/components/TaskCard";

interface Task {
  id: number,
  title: string,
  color: string,
  completed: boolean,
  createdAt: Date,
  updatedAt: Date
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    axios.get('http://localhost:3002/tasks/')
      .then((res) => {
        console.log(res.data)
        setTasks(res.data)
      })
      .catch((error) => {
        toast.error(error.response?.data?.msg || 'Failed to fetch tasks')
      }).finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleTaskUpdate = (id: number, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed } : task
    ))
  }

  const handleTaskDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <div className="w-full">
      <Link href="/AddTask" className="bg-[rgba(30,111,159,1)] flex justify-center items-center text-[rgba(242,242,242,1)] rounded-[8px] p-[16px] mt-[-20px] w-full">
        <p className="text-[14px] font-[700] mr-2">Create Task</p>
        <Image src='/assests/images/plus.svg' alt="plus" width={16} height={16}/>
      </Link>

      <div className="flex flex-col w-full mt-[100px]">
        <div className="flex justify-between mb-6">
          <div className="flex">
            <h4 className="text-[rgba(78,168,222,1)] mr-4 font-[700] text-[14px]">Tasks</h4>
            <div className="w-[25px] h-[19px] bg-[rgba(51,51,51,1)] rounded-full text-[rgba(217,217,217,1)] flex items-center justify-center">{tasks.length}</div>
          </div>
          <div className="flex justify-between">
            <h4 className="text-[rgba(130,132,250,1)] mr-4 font-[700] text-[14px]">Completed</h4>
            <div className="h-[19px] px-2 bg-[rgba(51,51,51,1)] rounded-full text-[rgba(217,217,217,1)] flex items-center justify-center">
              {tasks.length === 0 ? '0' : `${completedTasksCount} de ${tasks.length}`}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          {tasks.length === 0 ? (
            <NoTask/>
          ) : (
            <div className="flex flex-col gap-[12px] w-full">
              {tasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  id={task.id}
                  title={task.title} 
                  completed={task.completed}
                  onTaskUpdate={handleTaskUpdate}
                  onTaskDelete={handleTaskDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}