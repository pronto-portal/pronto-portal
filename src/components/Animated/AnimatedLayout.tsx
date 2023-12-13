import { AnimatePresence } from 'framer-motion';
import { Wrapper } from '../../types/PropTypes/Wrapper';

export const AnimatedLayout: React.FC<Wrapper> = ({ children }) => {
    return <AnimatePresence mode='wait'>{children}</AnimatePresence>;
};
