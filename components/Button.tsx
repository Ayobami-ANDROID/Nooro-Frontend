import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({ loading, children, className, ...props }) => {
    return (
        <button
            {...props}
            className={`w-full bg-[#1E6F9F] text-[#F2F2F2] rounded-[8px] p-[12px] flex justify-center items-center ${className || ''}`}
        >
            {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
