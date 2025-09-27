import React from 'react';
import { Users, Download, Star, Award, Shield } from 'lucide-react';
import FounderImage from '../Img/3.jpg'; // Import the founder image
import VicePresidentImage from '../Img/2.jpg'; // Import the Vice President image
import SecretaryImage from '../Img/1.jpg'; // Import the General Secretary image

const Founders = () => {
  const adminImage = localStorage.getItem('adminImage');
  const adminBio = localStorage.getItem('adminBio');
  const adminName = localStorage.getItem('adminName');
  const adminTitle = localStorage.getItem('adminTitle');
  const leaders = [
    {
      name: "DhanaSaker",
      role: "Founder & President",
      image: FounderImage,
      description: "Leading the South Indian Film Workers Welfare Union with vision and dedication to protect and support film industry professionals."
    },
    {
      name: "Mr.K.Thirugnanam",
      role: "State President",
      image: SecretaryImage,
      description: "Supporting the union's mission with extensive industry experience and commitment to improving working conditions for all film professionals."
    },
    {
      name: "Dr.MF Ramesh",
      role: "General Secretary",
      image: VicePresidentImage,
      description: "Coordinating union activities and advocating for the rights and welfare of all film industry workers across South India."
    }
  ];

  const importantMembers = [
    {
      name: "Executive Committee",
      description: "Leadership team overseeing union operations and strategic decisions",
      driveLink: "https://drive.google.com/drive/folders/1ZTx-Te5NUcF7rUJD6Gl-NPYgGViMNLUg?usp=sharing"
    },
    {
      name: "Advisory Board",
      description: "Experienced professionals providing guidance and industry expertise",
      driveLink: "https://drive.google.com/drive/folders/1ZTx-Te5NUcF7rUJD6Gl-NPYgGViMNLUg?usp=sharing"
    },
    {
      name: "Regional Representatives",
      description: "Leaders representing different regions of South India",
      driveLink: "https://drive.google.com/drive/folders/1ZTx-Te5NUcF7rUJD6Gl-NPYgGViMNLUg?usp=sharing"
    }
  ];

  const achievements = [
    {
      icon: Star,
      title: "Industry Recognition",
      description: "Recognized as a leading voice in the South Indian film industry"
    },
    {
      icon: Award,
      title: "Member Support",
      description: "Successfully supported over 10,000 film industry professionals"
    },
    {
      icon: Shield,
      title: "Worker Protection",
      description: "Established comprehensive worker protection policies"
    }
  ];

  return (
    <section id="founders" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership</h2>
          <p className="text-xl text-gray-600">Meet the visionaries behind SIFWWU</p>
        </div>

        {/* Leaders Section */}
        <div className="mb-20 grid md:grid-cols-3 gap-8">
          {adminImage && adminBio && adminName && adminTitle && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex flex-col h-full">
                <div className="md:h-64 overflow-hidden flex items-center justify-center bg-gray-50">
                  <img
                    src={adminImage}
                    alt={adminName}
                    className="w-32 h-32 object-cover rounded-full mx-auto my-6"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{adminName}</h3>
                  <p className="text-xl text-yellow-600 mb-4">{adminTitle}</p>
                  <p className="text-gray-600 mb-6">{adminBio}</p>
                </div>
              </div>
            </div>
          )}
          {leaders.map((leader, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex flex-col h-full">
                <div className="md:h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-xl text-yellow-600 mb-4">{leader.role}</p>
                  <p className="text-gray-600 mb-6">{leader.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Members Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Important Members</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {importantMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
                <Users className="h-12 w-12 text-yellow-500 mb-4" />
                <h4 className="text-xl font-semibold mb-3">{member.name}</h4>
                <p className="text-gray-600 mb-6">{member.description}</p>
                <a
                  href={member.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  View Members List
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Achievements</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 transform transition-all duration-300 hover:scale-105">
                <achievement.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3 text-gray-900">{achievement.title}</h4>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founders;