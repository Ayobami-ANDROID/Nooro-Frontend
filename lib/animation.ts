export const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
};

export const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};

export const backButtonVariants = {
    hover: { 
        scale: 1.1,
        rotate: 180,
        transition: { duration: 0.3 }
    }
};

export const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
};

export const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3 }
    }
};
