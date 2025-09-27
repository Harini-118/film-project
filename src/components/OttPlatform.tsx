import React from 'react';
import { PlayCircle, Award, Gift, Video } from 'lucide-react';

// Backend-ready OTT Platform section
const OttPlatform = () => {
  // Example: Replace static data with API call in future
  // const [features, setFeatures] = useState<string[]>([]);
  // useEffect(() => { fetch('/api/features').then(...); }, []);

  const platformFeatures = [
    'Support Small-Scale Producers',
    'Create Job Opportunities',
    'Showcase New Talent'
  ];

  const youthOpportunities = [
    'Skill Development: Training programs and workshops',
    'Career Guidance: Mentorship and industry navigation',
    'Job Opportunities: Placement and networking',
    'Financial Support: Scholarships and funding',
    'Exposure & Recognition: Talent showcase platforms',
    'Internships & Apprenticeships: Hands-on experience'
  ];

  return (
    <section id="ott" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <PlayCircle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
          <h2 className="text-4xl font-bold mb-4">A2S OTT Platform</h2>
          <Video className="mx-auto h-24 w-24 text-yellow-500 my-6 animate-pulse" />
          <p className="text-xl text-gray-300">Bringing South Indian Cinema to the World!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Platform Features Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 hover:bg-gray-700 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Platform Features</h3>
            <ul className="space-y-4">
              {platformFeatures.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Award className="h-6 w-6 text-yellow-500 mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Youth Opportunities Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 hover:bg-gray-700 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Opportunities for Youngsters</h3>
            <ul className="space-y-4">
              {youthOpportunities.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Gift className="h-6 w-6 text-yellow-500 mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Example: Backend integration ready section */}
        {/* <div className="mt-16 text-center">
          <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold shadow hover:bg-yellow-400 transition">
            Connect to Backend
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default OttPlatform;