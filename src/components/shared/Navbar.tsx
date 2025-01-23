// src/components/Navbar.js
"use client"
import { motion } from 'framer-motion';

import { ModeToggle } from './toggle';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -800 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className="fixed bottom-4 right-8 transform -translate-x-1/2 duration-300 z-50  "
    >
      
        <div className="flex justify-end h-16 items-end">
      
        
            <ModeToggle />
         
        </div>
     
    </motion.nav>
  );
};

export default Navbar;
