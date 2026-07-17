import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiList, FiPlusSquare, FiX, FiLogOut, FiHeadphones } from 'react-icons/fi';
import { clearAuth } from '../../utils/authStorage';
import toast from 'react-hot-toast';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: FiGrid },
    { path: '/queries', name: 'Queries', icon: FiList },
    { path: '/queries/new', name: 'Create Query', icon: FiPlusSquare }
  ];

  const handleLogout = () => {
    onClose();
    clearAuth();
    toast.success('Signed out successfully.');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Backdrop Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 text-slate-100 flex flex-col h-full border-r border-slate-900 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header Branding */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-900">
          <Link to="/dashboard" className="flex items-center space-x-2" onClick={onClose}>
            <span className="h-6 w-6 bg-blue-650 rounded flex items-center justify-center font-bold text-white text-sm">Q</span>
            <span className="text-lg font-bold text-white tracking-wide">QMS Admin</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white md:hidden focus:outline-none"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'}`}
              >
                <Icon
                  aria-hidden="true"
                  className={`mr-3 h-5 w-5 transition-colors duration-200
                    ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-150'}`}
                />
                {item.name}
              </Link>
            );
          })}

          <div className="border-t border-slate-900 my-4"></div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-all duration-200 group"
          >
            <FiLogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-150 transition-colors" />
            Logout
          </button>
        </nav>

        {/* Support Help Block */}
        <div className="p-4 border-t border-slate-900 bg-slate-950">
          <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-4 flex flex-col space-y-3 relative overflow-hidden">
            <div className="h-8 w-8 bg-blue-600/10 text-blue-400 rounded-lg flex items-center justify-center shrink-0">
              <FiHeadphones className="h-4.5 w-4.5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">Need Help?</h4>
              <p className="text-[10px] text-slate-400 leading-normal">
                If you face any issues, our support team is always here.
              </p>
            </div>
            <a
              href="mailto:support@qms.com"
              className="bg-blue-600 hover:bg-blue-750 text-white text-[10px] font-semibold py-2 px-3 rounded-lg text-center transition-colors shadow-sm focus:outline-none"
            >
              Contact Support
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
