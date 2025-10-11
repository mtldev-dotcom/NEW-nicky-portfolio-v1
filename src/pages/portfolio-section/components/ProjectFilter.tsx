// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

const ProjectFilter = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      {filters?.map((filter, index) => (
        <motion.div
          key={filter?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Button
            variant={activeFilter === filter?.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter?.id)}
            className={`relative transition-smooth ${
              activeFilter === filter?.id 
                ? 'glow-neon' :'hover:border-primary/50 hover:text-primary'
            }`}
          >
            {filter?.label}
            {filter?.count && (
              <span className="ml-2 text-xs opacity-70">
                ({filter?.count})
              </span>
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectFilter;
