import { motion, HTMLMotionProps } from 'framer-motion';

interface Button3DProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const Button3D = ({ children, className = '', ...props }: Button3DProps) => {
  return (
    <motion.button
      whileTap={{ y: 4, boxShadow: '0 2px 0 #FF6B2B' }}
      className={`
        relative
        px-6 
        py-3 
        text-white 
        text-lg
        font-medium
        bg-[#FF8656] 
        border
        border-[#FF9B75]
        rounded-md
        cursor-pointer
        shadow-[0_6px_0_#FF6B2B]
        transition-all
        duration-75
        active:shadow-[0_2px_0_#FF6B2B]
        active:translate-y-1
        hover:bg-[#FF8656]/90
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};