import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '919445799389'; // Include country code (91 for India)
    const whatsappMessage = `*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: '48/37 Anjaneyar Koil Street,Essa Pallavaram,Chengalpattu, Tamil Nadu-600007'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9445799389'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'southindianfilmtrust@gmail.com '
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch With Us</h2>
          <p className="text-xl text-gray-600">
            We are here to help! If you have any queries regarding membership, services, or our OTT platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <info.icon className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-600">{info.content}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="How can we help?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Your message..."
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center justify-center mx-auto"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Send Message via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;