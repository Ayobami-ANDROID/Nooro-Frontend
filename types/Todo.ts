import { COLOR_PALETTE } from "@/lib/validation/Form";

interface TaskFormValues  {
    title: string;
    color: typeof COLOR_PALETTE[number];
  };
  
  // Type for Form Status
  interface FormStatus {
    success?: string;
    error?: string;
  };
  
  // Type for Formik Text Input Props
  interface FormikTextInputProps {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    className?: string;
    labelClassName?: string;
  };
  
  // Type for Formik Color Picker Props
  interface FormikColorPickerProps {
    name: string;
    label?: string;
    palette?: readonly string[];
  };