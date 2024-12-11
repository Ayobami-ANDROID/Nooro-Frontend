import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({ loading, children, className, disabled, ...props }) => {
    return (
        <motion.button
            {...props}
            disabled={loading || disabled}
            whileHover={!loading && !disabled ? {
                scale: 1.025,
                transition: { duration: 0.2 }
            } : {}}
            whileTap={!loading && !disabled ? {
                scale: 0.95,
                transition: { duration: 0.1 }
            } : {}}
            className={`
                w-full 
                bg-[#1E6F9F] 
                text-[#F2F2F2] 
                rounded-[8px] 
                p-[12px] 
                flex 
                justify-center 
                items-center 
                ${loading || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1A5F8A]'}
                transition-all 
                duration-200 
                ease-in-out 
                ${className || ''}
            `}
        >
            {loading ? (
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                    }}
                >
                    <Loader2 className="mr-2 h-4 w-4" />
                </motion.div>
            ) : (
                <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                >
                    {children}
                </motion.span>
            )}
        </motion.button>
    );
};

export default Button;