import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileNavigation } from '../navigation/MobileNavigation';
import { DesktopSidebar } from '../navigation/DesktopSidebar';
import { TabletNavigation } from '../navigation/TabletNavigation';
import { useAppStore } from '../../store/appStore';

export const MainLayout: React.FC = () => {
  const { desktopSidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen animated-bg text-flux-text-primary relative">
      {/* Grid Overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none grid-overlay"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-flux-accent-blue rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-flux-accent-purple rounded-full opacity-50 animate-float animate-float-delay-1"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-flux-accent-green rounded-full opacity-40 animate-float animate-float-delay-2"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-flux-accent-pink rounded-full opacity-60 animate-float animate-float-delay-0-5"></div>
      </div>

      {/* Desktop Navigation */}
      <DesktopSidebar />
      
      {/* Tablet Navigation */}
      <TabletNavigation />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 relative z-10 ${
        desktopSidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'
      } md:ml-0`}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};