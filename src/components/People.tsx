

// Fetch people data from localStorage (replace with API later)
const getPeople = () => {
  const data = localStorage.getItem('people');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

type Person = {
  image: string;
  name: string;
  title: string;
  bio: string;
};

import { useState, useEffect } from 'react';

const People = () => {
  const [people, setPeople] = useState<Person[]>(getPeople());

  useEffect(() => {
    const updatePeople = () => setPeople(getPeople());
    window.addEventListener('storage', updatePeople);
    // For SPA navigation, also update on mount
    updatePeople();
    return () => window.removeEventListener('storage', updatePeople);
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">People</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {people.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No profiles found.</div>
          ) : (
            people.map((person: Person, idx: number) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
                  {person.image ? (
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400 flex items-center justify-center h-full">{person.name ? person.name[0] : '?'}</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-1 text-center">{person.name || 'No Name'}</h3>
                <p className="text-sm text-blue-600 mb-2 text-center">{person.title || ''}</p>
                <p className="text-gray-700 text-center mb-4">{person.bio || ''}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default People;
