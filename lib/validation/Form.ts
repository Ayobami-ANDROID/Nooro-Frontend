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

export const formValidate = yup.object().shape({
    title:yup.string().min(1, 'Title must be at least 3 characters').required('Task title is required'),

    color: yup.string()
    .oneOf(COLOR_PALETTE, 'Please select a valid color')
    .required('Color selection is required')
})
