"use client"
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import ColorPicker from '@/components/ColorPicker';
import Image from 'next/image';
import Button from '@/components/Button';
import { toast } from 'react-hot-toast'

// Define interface for form values
interface TaskFormValues {
    title: string;
    color: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
    title: Yup.string()
        .required('Task title is required')
        .min(3, 'Title must be at least 3 characters'),
    color: Yup.string()
        .required('Please select a color for your task')
});

const AddTaskPage: FC = () => {
    const router = useRouter()
    // Initial form values
    const initialValues: TaskFormValues = {
        title: '',
        color: ''
    };

    // Formik hook for form management
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
            try {
                // Submit to backend
                const response = await axios.post('http://localhost:3002/tasks/', values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                

                // Reset form and show success
                resetForm();
                
                toast.success('Task created successfully!')
                router.push('/')
            } catch (error) {
                // Handle error
                if (axios.isAxiosError(error)) {
                   
                    toast.error(error.response?.data?.message)
                } else {
                   
                    toast.error('An unexpected error occurred')
                }
            } finally {
                // Always set submitting to false
                setSubmitting(false);
            }
        }
    });

    return (
        <div className='w-full mt-[100px] flex flex-col gap-[48px]'>
            <Link href="/" className="">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>

            <form onSubmit={formik.handleSubmit} className=" flex flex-col gap-8">
                {/* Status messages */}
                

                {/* Title Input */}
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

                {/* Color Picker */}
                <ColorPicker
                    name="color"
                    label="Select Task Color"
                    value={formik.values.color}
                    onChange={(color) => formik.setFieldValue('color', color)}
                    error={formik.touched.color && !!formik.errors.color}
                    errorText={formik.touched.color ? formik.errors.color : ''}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    loading={formik.isSubmitting}
                    disabled={formik.isSubmitting}
                >
                    <p className="mr-2 font-[700] text-[14px]">Add Task</p>
                    <Image src="/assests/images/plus.svg" alt="plus" width={16} height={16} />
                </Button>
            </form>
        </div>
    )
}

export default AddTaskPage;