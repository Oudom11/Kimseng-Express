import { motion } from 'framer-motion';
import { pageTransition } from '../lib/transitions';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-background"
    >
      {children}
    </motion.div>
  );
} 