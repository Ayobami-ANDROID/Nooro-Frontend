'use client'
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import FormInput from '@/components/FormInput';
import ColorPicker from '@/components/ColorPicker';
import Button from '@/components/Button';
import { toast } from 'react-hot-toast'
import { pageTransition, backButtonVariants, pageVariants, formVariants, inputVariants } from '@/lib/animation';
import { validationSchema } from '@/lib/validation/Form';
import axiosInstance from '@/lib/axios';

// Define interface for form values
interface TaskFormValues {
    title: string;
    color: string;
}


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
                const response = await axiosInstance.post('/tasks/', values, {
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

    // Animation variants
    // 

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
                        placeHolder="Ex. Brush you teeth"
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
                        <div className='flex items-center'>
                            <p className="mr-2 font-[700] text-[14px]">Add Task</p>
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

                    </Button>
                </motion.div>
            </motion.form>
        </motion.div>
    )
}

export default AddTaskPage;