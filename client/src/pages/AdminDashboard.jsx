// client/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    image: null,
  });

  // This will get your server's base URL, e.g., 'http://localhost:5000'
  const SERVER_BASE_URL = API_URL.replace('/api', '');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/members`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };


  const handleAddMember = async (e) => {
    e.preventDefault();
    const memberData = new FormData();
    memberData.append('name', formData.name);
    memberData.append('position', formData.position);
    memberData.append('description', formData.description);
    memberData.append('image', formData.image);

    try {
      await axios.post(`${API_URL}/api/admin/members`, memberData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowAddMember(false);
      setFormData({ name: '', position: '', description: '', image: null });
      fetchMembers();
      alert('Member added successfully!');
    } catch (error) {
      alert('Error adding member: ' + error.response?.data?.message);
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
        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-black">
          <div>
            <h1 className="text-4xl font-bold text-black tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your team members</p>
          </div>
          <button
            onClick={() => setShowAddMember(true)}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg"
          >
            Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member._id} className="bg-white border-2 border-black rounded-lg p-6 shadow-lg text-center">
              {/* V V V V V  THIS IS THE FIX  V V V V V */}
              <img 
                src={`${SERVER_BASE_URL}/${member.imageUrl.replace(/\\/g, '/')}`} 
                alt={member.name} 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200" 
              />
              {/* ^ ^ ^ ^ ^  THIS IS THE FIX  ^ ^ ^ ^ ^ */}
              <h3 className="text-xl font-bold text-black">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.position}</p>
              <p className="text-gray-500">{member.description}</p>
            </div>
          ))}
        </div>

        {showAddMember && (
          // ... The modal code here does not need to change ...
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="bg-white border-4 border-black rounded-lg shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-black">Add New Member</h3>
                  <button onClick={() => setShowAddMember(false)} className="text-gray-400 hover:text-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                
                <form onSubmit={handleAddMember} className="space-y-4">
                  <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black" />
                  <input type="text" name="position" placeholder="Position" onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black" />
                  <textarea name="description" placeholder="Description" onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"></textarea>
                  <input type="file" name="image" onChange={handleFileChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"/>
                  <div className="flex justify-end space-x-3 mt-8">
                    <button type="button" onClick={() => setShowAddMember(false)} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800">Add Member</button>
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

export default AdminDashboard;