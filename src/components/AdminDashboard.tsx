import React, { useState } from 'react';
// ...existing code...
import { 
  User, 
  LogOut, 
  Upload, 
  Settings, 
  BarChart3
} from 'lucide-react';

type Person = {
  image: string;
  name: string;
  title: string;
  bio: string;
  timestamp: string;
};

// Backend-ready CRUD functions
const getPeople = async (): Promise<Person[]> => {
  // Replace with API call in future
  const data = localStorage.getItem('people');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const addPerson = async (person: Person): Promise<void> => {
  // Replace with POST API call
  const people = await getPeople();
  people.push(person);
  localStorage.setItem('people', JSON.stringify(people));
};

const updatePerson = async (idx: number, person: Person): Promise<void> => {
  // Replace with PUT/PATCH API call
  const people = await getPeople();
  people[idx] = person;
  localStorage.setItem('people', JSON.stringify(people));
};

const deletePerson = async (idx: number): Promise<void> => {
  // Replace with DELETE API call
  const people = await getPeople();
  people.splice(idx, 1);
  localStorage.setItem('people', JSON.stringify(people));
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'analytics'>('profile');
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Person>({ image: '', name: '', title: '', bio: '', timestamp: '' });
  const [preview, setPreview] = useState<string | null>(null);

  // Load people on mount
  React.useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  // Open modal for add/edit
  const openModal = (idx?: number) => {
    if (typeof idx === 'number') {
      setEditIdx(idx);
      setForm(people[idx]);
      setPreview(people[idx].image);
    } else {
      setEditIdx(null);
      setForm({ image: '', name: '', title: '', bio: '', timestamp: '' });
      setPreview(null);
    }
    setModalOpen(true);
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save new or edited person
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editIdx !== null) {
      await updatePerson(editIdx, { ...form, image: preview || '', timestamp: form.timestamp });
    } else {
      await addPerson({ ...form, image: preview || '', timestamp: new Date().toLocaleString() });
    }
    const updated = await getPeople();
    setPeople(updated);
    setModalOpen(false);
    setEditIdx(null);
    setForm({ image: '', name: '', title: '', bio: '', timestamp: '' });
    setPreview(null);
  };

  // Delete person
  const handleDelete = async (idx: number) => {
    await deletePerson(idx);
    const updated = await getPeople();
    setPeople(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Panel Header - ready for future backend integration */}
      <header className="border-b bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100">
              <Settings className="w-4 h-4 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 rounded bg-green-100 text-green-700 border border-green-200 text-xs font-semibold">Online</span>
            <button onClick={onLogout} className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 text-sm font-semibold hover:bg-red-600">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded font-semibold border ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} transition`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="w-4 h-4" /> Profile Management
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded font-semibold border ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} transition`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-4 h-4" /> System Settings
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded font-semibold border ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} transition`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 className="w-4 h-4" /> Analytics
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'profile' && (
              <>
                <div className="p-6 bg-white rounded shadow border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">People Management</h2>
                      <p className="text-sm text-muted-foreground">Add, edit, or remove people entries</p>
                    </div>
                  </div>

                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-2 mb-6 hover:bg-blue-700"
                    onClick={() => openModal()}
                  >
                    <Upload className="w-4 h-4" /> Add New Person
                  </button>

                  {/* People List */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left text-sm font-semibold">Image</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold">Title</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold">Bio</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold">Timestamp</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {people.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center text-gray-500 py-6">No entries found.</td>
                          </tr>
                        ) : (
                          people.map((person, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="px-4 py-2">
                                {person.image ? (
                                  <img src={person.image} alt={person.name} className="w-12 h-12 rounded-full object-cover" />
                                ) : (
                                  <span className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-400">{person.name ? person.name[0] : '?'}</span>
                                )}
                              </td>
                              <td className="px-4 py-2 font-semibold">{person.name}</td>
                              <td className="px-4 py-2">{person.title}</td>
                              <td className="px-4 py-2 max-w-xs truncate">{person.bio}</td>
                              <td className="px-4 py-2 text-xs text-gray-500">{person.timestamp}</td>
                              <td className="px-4 py-2">
                                <button
                                  className="px-2 py-1 rounded bg-yellow-500 text-white text-xs font-semibold mr-2 hover:bg-yellow-600"
                                  onClick={() => openModal(idx)}
                                >Edit</button>
                                <button
                                  className="px-2 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600"
                                  onClick={() => handleDelete(idx)}
                                >Delete</button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Modal for Add/Edit */}
                  {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                        {/* Exit (X) button */}
                        <button
                          type="button"
                          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                          aria-label="Close"
                          onClick={() => { setModalOpen(false); setEditIdx(null); setForm({ image: '', name: '', title: '', bio: '', timestamp: '' }); setPreview(null); }}
                        >
                          &times;
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-center">{editIdx !== null ? 'Edit Person' : 'Add New Person'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-2">
                              {preview ? (
                                <img src={preview} alt={form.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xl font-bold text-gray-400 flex items-center justify-center h-full">{form.name ? form.name[0] : '?'}</span>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="w-full px-2 py-1 border rounded"
                            />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Full Name"
                            required
                          />
                          <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Job Title"
                          />
                          <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded min-h-[80px]"
                            placeholder="Bio"
                            required
                          />
                          <div className="flex gap-2 justify-end pt-2">
                            <button
                              type="button"
                              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold"
                              onClick={() => { setModalOpen(false); setEditIdx(null); setForm({ image: '', name: '', title: '', bio: '', timestamp: '' }); setPreview(null); }}
                            >Cancel</button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
                            >Save</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <div className="p-6 bg-white rounded shadow border border-gray-200 mt-6">
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">System Settings</h3>
                  <p className="text-muted-foreground">Configuration options coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="p-6 bg-white rounded shadow border border-gray-200 mt-6">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">Detailed analytics coming soon...</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - People Summary */}
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 rounded shadow border border-blue-200">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">People Summary</h3>
                <p className="text-sm text-blue-600 font-medium mb-4">Total Entries: {people.length}</p>
                {people.length > 0 && (
                  <div className="mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Added</span>
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-2">
                        {people[people.length-1].image ? (
                          <img src={people[people.length-1].image} alt={people[people.length-1].name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg font-bold text-gray-400">{people[people.length-1].name ? people[people.length-1].name[0] : '?'}</span>
                        )}
                      </div>
                      <span className="font-semibold text-gray-900">{people[people.length-1].name}</span>
                      <span className="text-sm text-blue-600">{people[people.length-1].title}</span>
                      <span className="text-xs text-gray-500">{people[people.length-1].timestamp}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
