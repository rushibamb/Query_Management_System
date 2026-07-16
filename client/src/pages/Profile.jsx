import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { getAdmin } from '../utils/authStorage';
import { FiUser, FiMail, FiShield, FiCalendar } from 'react-icons/fi';

const Profile = () => {
  const admin = getAdmin();

  // Format member creation timestamp date
  const getCreatedDate = () => {
    if (!admin?.createdAt) return 'N/A';
    try {
      return new Date(admin.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div>
      <PageHeader
        title="Profile Details"
        description="View your system administrator account profile and attributes."
      />

      <div className="max-w-2xl mt-6">
        <Card>
          <div className="flex items-center space-x-4 pb-6 border-b border-gray-100 mb-6 select-none">
            <div className="h-14 w-14 bg-blue-50 text-blue-650 rounded-xl flex items-center justify-center font-bold text-xl">
              {admin?.name ? admin.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AD'}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{admin?.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">System Administrator</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="flex items-start space-x-3 text-sm">
                <div className="p-2 bg-gray-50 text-gray-400 rounded-lg shrink-0" aria-hidden="true">
                  <FiUser className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Full Name</p>
                  <p className="font-bold text-gray-900 mt-0.5">{admin?.name || 'N/A'}</p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start space-x-3 text-sm">
                <div className="p-2 bg-gray-50 text-gray-400 rounded-lg shrink-0" aria-hidden="true">
                  <FiMail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Email Address</p>
                  <p className="font-bold text-gray-900 mt-0.5">{admin?.email || 'N/A'}</p>
                </div>
              </div>

              {/* Account Type */}
              <div className="flex items-start space-x-3 text-sm">
                <div className="p-2 bg-gray-50 text-gray-400 rounded-lg shrink-0" aria-hidden="true">
                  <FiShield className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Account Type</p>
                  <div className="mt-1">
                    <Badge value="Administrator" />
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-start space-x-3 text-sm">
                <div className="p-2 bg-gray-50 text-gray-400 rounded-lg shrink-0" aria-hidden="true">
                  <FiCalendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Member Since</p>
                  <p className="font-bold text-gray-900 mt-0.5">{getCreatedDate()}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
