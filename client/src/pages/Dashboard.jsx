import React, { useState, useEffect } from 'react';
import Loader from '../components/common/Loader';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { getDashboardStats } from '../services/dashboardService';
import { 
  FiInbox, 
  FiPlus, 
  FiFileText, 
  FiMail, 
  FiClock, 
  FiCheckCircle, 
  FiFlag, 
  FiEye 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const stats = await getDashboardStats();
      setData(stats);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend server. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const statsList = [
    { 
      title: 'Total Queries', 
      value: data?.totalQueries || 0, 
      icon: FiFileText, 
      color: 'border-b-4 border-blue-500', 
      iconBg: 'bg-blue-50 text-blue-600', 
      helper: 'All submitted tickets' 
    },
    { 
      title: 'Open', 
      value: data?.openQueries || 0, 
      icon: FiMail, 
      color: 'border-b-4 border-sky-400', 
      iconBg: 'bg-sky-50 text-sky-600', 
      helper: 'Awaiting response' 
    },
    { 
      title: 'In Progress', 
      value: data?.inProgressQueries || 0, 
      icon: FiClock, 
      color: 'border-b-4 border-amber-400', 
      iconBg: 'bg-amber-50 text-amber-600', 
      helper: 'Currently being handled' 
    },
    { 
      title: 'Resolved', 
      value: data?.resolvedQueries || 0, 
      icon: FiCheckCircle, 
      color: 'border-b-4 border-green-400', 
      iconBg: 'bg-green-50 text-green-600', 
      helper: 'Successfully resolved' 
    },
    { 
      title: 'High Priority', 
      value: data?.highPriorityQueries || 0, 
      icon: FiFlag, 
      color: 'border-b-4 border-red-400', 
      iconBg: 'bg-red-50 text-red-650', 
      helper: 'High priority issues' 
    }
  ];

  const headerAction = (
    <Button onClick={() => navigate('/queries/new')} className="bg-blue-600 hover:bg-blue-750 text-white shadow-sm flex items-center justify-center">
      <FiPlus className="mr-2 h-4 w-4" aria-hidden="true" />
      Create Query
    </Button>
  );

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const getInitialsBg = (name) => {
    const colors = [
      'bg-blue-50 text-blue-600',
      'bg-green-50 text-green-600',
      'bg-indigo-50 text-indigo-600',
      'bg-amber-50 text-amber-600',
      'bg-purple-50 text-purple-600',
      'bg-pink-50 text-pink-600'
    ];
    if (!name) return colors[0];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const emptyRecentState = (
    <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-12 bg-white text-center">
      <div className="p-4 bg-gray-50 rounded-full text-gray-400 mb-4" aria-hidden="true">
        <FiInbox className="h-8 w-8" />
      </div>
      <h4 className="text-base font-semibold text-gray-900">No Recent Queries</h4>
      <p className="text-sm text-gray-500 mt-1 max-w-sm">
        All queries have been handled or archived. New client support tickets will register here automatically.
      </p>
    </div>
  );

  const renderTableRow = (query) => {
    const initials = getInitials(query.customerName);
    const badgeColor = getInitialsBg(query.customerName);
    
    return (
      <tr
        key={query._id}
        onClick={() => navigate(`/queries/${query._id}`)}
        className="cursor-pointer hover:bg-slate-50/40 transition-colors duration-150"
      >
        <td className="px-6 py-4.5 whitespace-nowrap">
          <div className="flex items-center space-x-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none ${badgeColor}`}>
              {initials}
            </div>
            <span className="font-semibold text-gray-900 text-sm">
              {query.customerName}
            </span>
          </div>
        </td>
        <td className="px-6 py-4.5 text-gray-500 max-w-xs truncate font-medium">
          {query.subject}
        </td>
        <td className="px-6 py-4.5 whitespace-nowrap">
          <Badge value={query.status} />
        </td>
        <td className="px-6 py-4.5 whitespace-nowrap">
          <Badge value={query.priority} />
        </td>
        <td className="px-6 py-4.5 whitespace-nowrap text-gray-500 text-xs font-semibold">
          {formatDate(query.createdAt)}
        </td>
        <td className="px-6 py-4.5 whitespace-nowrap text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/queries/${query._id}`);
            }}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none"
            aria-label="View query details"
          >
            <FiEye className="h-4.5 w-4.5" />
          </button>
        </td>
      </tr>
    );
  };

  if (error) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          description="Overview of customer support queries and performance."
        />
        <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-center max-w-lg mx-auto mt-12 shadow-sm">
          <h3 className="text-lg font-semibold text-red-800">Connection Error</h3>
          <p className="text-sm text-red-600 mt-2">{error}</p>
          <div className="mt-5">
            <Button variant="danger" onClick={fetchDashboardStats}>
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of customer support queries and performance."
        action={headerAction}
      />

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statsList.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between overflow-hidden relative ${stat.color}`}>
              <div className="flex flex-col space-y-4">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  {isLoading ? (
                    <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  ) : (
                    <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 font-semibold">{stat.helper}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Queries List Card Container */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden mt-8">
        
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-gray-150 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
              <FiFileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Recent Queries</h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest customer support tickets</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/queries')}
            className="text-gray-600 border-gray-300 hover:bg-gray-50 flex items-center justify-center text-xs font-semibold px-4 py-1.5"
          >
            View All Queries
            <span className="ml-1.5 font-bold">&#8594;</span>
          </Button>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6 space-y-4">
              <Loader variant="table" count={5} />
            </div>
          ) : !data?.recentQueries || data.recentQueries.length === 0 ? (
            emptyRecentState
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 bg-white text-sm text-gray-700">
                {data.recentQueries.map(renderTableRow)}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
