// client\src\pages\SuperAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const SuperAdminDashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTenant, setShowCreateTenant] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    adminEmail: '',
    adminUsername: '',
    adminPassword: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchTenants(), fetchUsers()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTenants = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/tenants`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTenants(response.data);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateTenant = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/tenants`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      setShowCreateTenant(false);
      setFormData({
        name: '',
        domain: '',
        adminEmail: '',
        adminUsername: '',
        adminPassword: '',
      });
      fetchData();
      alert('Tenant created successfully!');
    } catch (error) {
      alert('Error creating tenant: ' + error.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-black">
          <div>
            <h1 className="text-4xl font-bold text-black tracking-tight">Super Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage tenants and users across the platform</p>
          </div>
          <button
            onClick={() => setShowCreateTenant(true)}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg"
          >
            Create New Tenant
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{tenants.length}</span>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Tenants</p>
                <p className="text-3xl font-bold text-black">{tenants.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{users.length}</span>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Users</p>
                <p className="text-3xl font-bold text-black">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{users.filter(u => u.isActive).length}</span>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Users</p>
                <p className="text-3xl font-bold text-black">{users.filter(u => u.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tenants Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Tenants</h2>
            <span className="ml-3 px-3 py-1 bg-black text-white rounded-full text-sm font-medium">
              {tenants.length}
            </span>
          </div>
          
          {tenants.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
              <p className="text-gray-500">Create your first tenant to get started.</p>
            </div>
          ) : (
            <div className="bg-white border-2 border-black rounded-lg shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {tenants.map((tenant) => (
                  <div key={tenant._id} className="px-6 py-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-black mb-1">
                          {tenant.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{tenant.domain || 'No domain set'}</p>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(tenant.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                        tenant.isActive 
                          ? 'bg-black text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {tenant.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Users Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Users</h2>
            <span className="ml-3 px-3 py-1 bg-black text-white rounded-full text-sm font-medium">
              {users.length}
            </span>
          </div>
          
          <div className="bg-white border-2 border-black rounded-lg shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {users.map((user) => (
                <div key={user._id} className="px-6 py-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-1">
                        {user.username}
                      </h3>
                      <p className="text-gray-600 mb-2">{user.email}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded text-black font-medium">
                          {user.role.replace('_', ' ').toUpperCase()}
                        </span>
                        <span>Tenant: {user.tenantId?.name || 'No Tenant'}</span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      user.isActive 
                        ? 'bg-black text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Tenant Modal */}
        {showCreateTenant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="bg-white border-4 border-black rounded-lg shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-black">Create New Tenant</h3>
                  <button
                    onClick={() => setShowCreateTenant(false)}
                    className="text-gray-400 hover:text-black transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleCreateTenant} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Tenant Name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors duration-200"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Domain (optional)"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors duration-200"
                      value={formData.domain}
                      onChange={(e) => setFormData({...formData, domain: e.target.value})}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Admin Email"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors duration-200"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Admin Username"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors duration-200"
                      value={formData.adminUsername}
                      onChange={(e) => setFormData({...formData, adminUsername: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Admin Password"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors duration-200"
                      value={formData.adminPassword}
                      onChange={(e) => setFormData({...formData, adminPassword: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setShowCreateTenant(false)}
                      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      Create Tenant
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;