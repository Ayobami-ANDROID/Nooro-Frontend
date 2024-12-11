"use client"
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast'
import NoTask from "@/components/NoTask";
import TaskCard from "@/components/TaskCard";
import ButtonLink from "@/components/ButtonLink";
import { motion } from 'framer-motion';
import SkeletonLoader from "@/components/SkeletonLoader";
import axiosInstance from "@/lib/axios";
import ClipLoader from "react-spinners/ClipLoader";

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
    axiosInstance.get('/tasks/')
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="w-full"
    >
      <ButtonLink href="/AddTask" className="bg-[rgba(30,111,159,1)] flex justify-center items-center text-[rgba(242,242,242,1)] rounded-[8px] p-[16px] mt-[-20px] w-full">
        <div className="flex items-center">
          <p className="text-[14px] font-[700] mr-2">Create Task</p>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_422_81)">
              <path d="M7.98367 1.45158C9.27559 1.45158 10.5385 1.83468 11.6127 2.55244C12.6869 3.27019 13.5241 4.29037 14.0185 5.48395C14.5129 6.67754 14.6423 7.99092 14.3902 9.25802C14.1382 10.5251 13.5161 11.689 12.6026 12.6026C11.689 13.5161 10.5251 14.1382 9.25801 14.3903C7.99091 14.6423 6.67753 14.5129 5.48394 14.0185C4.29036 13.5241 3.27018 12.6869 2.55243 11.6127C1.83467 10.5385 1.45157 9.2756 1.45157 7.98368C1.45826 6.25332 2.14861 4.59574 3.37217 3.37218C4.59573 2.14862 6.25331 1.45827 7.98367 1.45158ZM7.98367 5.77648e-06C6.40605 0.00645971 4.86572 0.480174 3.55711 1.36134C2.24851 2.24252 1.2303 3.49164 0.631045 4.95102C0.031785 6.4104 -0.121666 8.01461 0.190064 9.56114C0.501794 11.1077 1.26473 12.5272 2.38256 13.6404C3.50038 14.7537 4.92298 15.5108 6.47076 15.8162C8.01855 16.1217 9.62212 15.9617 11.079 15.3564C12.536 14.7512 13.7809 13.7279 14.6567 12.4158C15.5326 11.1036 16 9.5613 16 7.98368C16 6.93249 15.7924 5.89165 15.3892 4.92089C14.9859 3.95014 14.3949 3.06857 13.6501 2.32679C12.9053 1.58501 12.0213 0.997618 11.0489 0.598327C10.0765 0.199035 9.03484 -0.00429452 7.98367 5.77648e-06Z" fill="#F2F2F2" />
              <path d="M11.7069 7.38126H8.49534V4.16965H7.41391V7.38126H4.19867V8.46268H7.41391V11.6743H8.49534V8.46268H11.7069V7.38126Z" fill="#F2F2F2" />
            </g>
            <defs>
              <clipPath id="clip0_422_81">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </ButtonLink>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col w-full mt-[70px]"
      >
        <div className="flex justify-between mb-6">
          <div className="flex">
            <h4 className="text-[rgba(78,168,222,1)] mr-4 font-[700] text-[14px]">Tasks</h4>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-[25px] h-[19px] bg-[rgba(51,51,51,1)] rounded-full text-[rgba(217,217,217,1)] flex items-center justify-center"
            >
              {tasks.length}
            </motion.div>
          </div>
          <div className="flex justify-between">
            <h4 className="text-[rgba(130,132,250,1)] mr-4 font-[700] text-[14px]">Completed</h4>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="h-[19px] px-2 bg-[rgba(51,51,51,1)] rounded-full text-[rgba(217,217,217,1)] flex items-center justify-center"
            >
              {tasks.length === 0 ? '0' : `${completedTasksCount} de ${tasks.length}`}
            </motion.div>
          </div>
        </div>

        

        <div className="flex flex-col w-full">
          {isLoading ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.1
                  }
                }
              }}
              className="flex flex-col gap-[12px] w-full"
            >
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <SkeletonLoader />
                </motion.div>
              ))}
            </motion.div>
          ) : tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NoTask />
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.1
                  }
                }
              }}
              className="flex flex-col gap-[12px] w-full"
            >
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    completed={task.completed}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}