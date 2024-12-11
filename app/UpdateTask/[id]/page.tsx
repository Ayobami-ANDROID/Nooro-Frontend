"use client";
import { FC, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import FormInput from "@/components/FormInput";
import ColorPicker from "@/components/ColorPicker";
import Button from "@/components/Button";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, backButtonVariants, pageVariants, formVariants, inputVariants } from '@/lib/animation';
import { validationSchema } from '@/lib/validation/Form';
import axiosInstance from "@/lib/axios";


interface TaskFormValues {
    title: string;
    color: string;
}


const UpdateTaskPage: FC = () => {
    const router = useRouter();
    const params = useParams();
    const taskId = params?.id; // Get the task id from params

    const formik = useFormik<TaskFormValues>({
        initialValues: {
            title: "",
            color: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                // Update task
                await axiosInstance.put(`/tasks/${taskId}`, values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // Show success and redirect
                toast.success("Task updated successfully!");
                router.push("/");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message || "Failed to update task.");
                } else {
                    toast.error("An unexpected error occurred.");
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Fetch task details on load
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axiosInstance.get(`/tasks/${taskId}`);
                formik.setValues({
                    title: data.title,
                    color: data.color,
                });
            } catch (error) {
                toast.error("Failed to fetch task details.");
            }
        };

        if (taskId) fetchTask();
    }, [taskId]);

    return (
        <motion.div
            className='w-full mt-[70px] flex flex-col gap-[48px]'
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >

            <Link href="/" className="">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>


            <motion.form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-8"
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                {/* Title Input */}
                <motion.div variants={inputVariants}>
                    <FormInput
                        label="Title"
                        name="title"
                        placeHolder="Enter task title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && !!formik.errors.title}
                        errorText={formik.touched.title ? formik.errors.title : ''}
                    />
                </motion.div>

                {/* Color Picker */}
                <motion.div variants={inputVariants}>
                    <ColorPicker
                        name="color"
                        label="Select Task Color"
                        value={formik.values.color}
                        onChange={(color) => formik.setFieldValue('color', color)}
                        error={formik.touched.color && !!formik.errors.color}
                        errorText={formik.touched.color ? formik.errors.color : ''}
                    />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={inputVariants}>
                    <Button
                        type="submit"
                        loading={formik.isSubmitting}
                        disabled={formik.isSubmitting}
                    >
                        <div className="flex items-center">
                            <p className="mr-2 font-[700] text-[14px]">Save</p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.49995 17.0167L2.32495 11.8417L4.68328 9.48333L7.49995 12.3083L15.7333 4.06667L18.0916 6.425L7.49995 17.0167Z" fill="white" />
                            </svg>
                        </div>

                    </Button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

export default UpdateTaskPage;
