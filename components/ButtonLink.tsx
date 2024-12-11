import { FC } from 'react'
import { motion } from 'framer-motion';
import Link from "next/link";
import { LinkProps } from 'next/link';

interface ButtonLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonLink: FC<ButtonLinkProps> = ({ href, children, className, ...props }) => {
  return (
    <Link href={href} {...props}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={className}
      >
        {children}
      </motion.div>
    </Link>
  )
}

export default ButtonLink