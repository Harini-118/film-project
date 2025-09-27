import React from 'react';
import { Users, Shield, HandHeart, Sparkles } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Protect film workers' rights",
      description: "Ensuring fair treatment and safe working conditions for all industry professionals"
    },
    {
      icon: HandHeart,
      title: "Provide financial aid and security",
      description: "Supporting our members with financial assistance and security measures"
    },
    {
      icon: Users,
      title: "Offer legal and professional support",
      description: "Providing expert legal guidance and professional development resources"
    },
    {
      icon: Sparkles,
      title: "Promote emerging talents",
      description: "Creating opportunities and platforms for new artists to showcase their abilities"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Are?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The South Indian Film Workers Welfare Union is an organization dedicated to supporting
            professionals in the film industry. We offer assistance to producers, directors,
            actors, technicians, and theater workers, ensuring their rights, welfare, and career growth.
          </p>
        </div>

        <div className="mb-20">
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why We Started?</h3>
            <p className="text-gray-600 mb-8">
              Our union was formed not as a competition or opposition to anyone, but to bring
              positive change in the industry.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />
              <feature.icon className="h-12 w-12 text-yellow-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;