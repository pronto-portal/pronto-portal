import React from 'react';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { Metric } from '../Metric';
import { AssignmentsStatusComparison } from '../Metrics/AssignmentsStatusComparison';
import LanguagesPerAssignmentLocation from '../Metrics/LanguagesPerAssignmentLocation';
import ThisMonthVsLastMonthAssignments from '../Metrics/ThisMonthVsLastMonthAssignments';
import TranslatorNoShowToCompletionRatio from '../Metrics/TranslatorNoShowToCompletionRatio';

export const Analytics: React.FC = () => {
    const gridBreakPoints = {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
        xl: 6,
    };

    // Variants for the parent container to stagger the children animations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // This staggers the animation of children, with a half-second delay between each.
                when: 'beforeChildren', // Start the stagger effect before animating the children
            },
        },
    };

    // Variants for the children
    const itemVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 1, // The fade animation will take 2 seconds for each child.
            },
        },
    };

    const MotionGrid = motion(Grid);

    return (
        <MotionGrid
            container
            direction='row'
            flexWrap='wrap'
            width='100%'
            height='100%'
            spacing={2}
            variants={containerVariants}
            initial='hidden'
            animate='show'
        >
            {[ThisMonthVsLastMonthAssignments, AssignmentsStatusComparison, LanguagesPerAssignmentLocation, TranslatorNoShowToCompletionRatio].map(
                (Component, index) => (
                    <MotionGrid item height='50%' {...gridBreakPoints} key={`${Component.name}-${index}}`} variants={itemVariants}>
                        <Metric titleText={`Metric ${index + 1}`}>
                            <Component />
                        </Metric>
                    </MotionGrid>
                )
            )}
        </MotionGrid>
    );
};
