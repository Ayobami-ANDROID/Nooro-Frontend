"use client"
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/lib/axios';

interface TaskCardProps {
    id: number;
    title: string;
    completed: boolean;
    onTaskUpdate: (id: number, completed: boolean) => void;
    onTaskDelete: (id: number) => void;
}

const TaskCard: FC<TaskCardProps> = ({ id, title, completed, onTaskUpdate, onTaskDelete }) => {
   const router = useRouter()

    const handleComplete = async () => {
        try {
            await axiosInstance.put(`/tasks/${id}`, {
                completed: !completed,
            });
            onTaskUpdate(id, !completed);
            toast.success(`Task ${!completed ? 'completed' : 'marked as incomplete'}`);
        } catch (error: any) {
            toast.error(error.response?.data?.msg || 'Failed to update task');
        }
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            onTaskDelete(id);
            toast.success('Task deleted successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.msg || 'Failed to delete task');
        }
    };

    const navigateToUpdateTask = () => {
        router.push(`/UpdateTask/${id}`);
    };

    return (
        <div
            onClick={navigateToUpdateTask}
            className={`cursor-pointer  w-full flex justify-between items-center p-[16px] rounded-[8px] border border-[#333333] ${
                completed ? 'bg-[rgba(38,38,38,1)]' : 'bg-[rgba(51,51,51,1)]'
            }`}
        >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleComplete}
                    className="
                        appearance-none 
                        h-[24px] 
                        w-[24px] 
                        border-2 
                        border-[rgba(78,168,222,1)] 
                        rounded-full 
                        cursor-pointer 
                        transition-all 
                        duration-300 
                        ease-in-out
                        checked:bg-[rgba(94,96,206,1)] 
                        checked:border-[rgba(94,96,206,1)]
                        hover:border-opacity-70
                        hover:scale-105
                    "
                />
                {completed && (
                    <svg
                        className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 5L5 9L13 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
            <span
                className={`w-full px-3 font-[400] text-[14px] ${
                    completed ? 'line-through text-[#808080]' : 'text-[rgba(242,242,242,1)]'
                }`}
            >
                {title}
            </span>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                }}
                className="
                    group 
                    transition-all 
                    duration-300 
                    ease-in-out 
                    hover:scale-110 
                    hover:rotate-6 
                    active:scale-95 
                    active:rotate-12
                "
            >
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                        transition-colors 
                        duration-300 
                        group-hover:fill-red-500
                    "
                >
                    <path d="M14.2021 9.98547H12.8716V15.5073H14.2021V9.98547Z" fill="#808080" />
                    <path d="M11.4623 9.98547H10.1318V15.5073H11.4623V9.98547Z" fill="#808080" />
                    <path
                        d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696H14.2868C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696H6.63911C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418H6.45162C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19H15.7867C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696H11.547C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904H8.68332C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123H16.715L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z"
                        fill="#808080"
                    />
                </svg>
            </button>
        </div>
    );
};

export default TaskCard;
