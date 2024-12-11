import * as yup from "yup";




export const COLOR_PALETTE:string[] = [
    '#FF3B30', // Red
    '#FF9500', // Teal
    '#FFCC00', // Blue
    '#34C759', // Yellow
    '#007AFF',
    '#5856D6',
    '#AF52DE',
    '#FF2D55',
    '#A2845E'
    
  ];

  export const validationSchema = yup.object({
    title: yup.string()
        .required("Task title is required")
        .min(3, "Title must be at least 3 characters"),
    color: yup.string().required("Please select a color for your task"),
});
