import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolio';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null); // 'sending', 'success', 'error'
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormStatus('sending');

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just show success
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const getSocialIcon = (iconName) => {
    const icons = {
      FaGithub: FaGithub,
      FaLinkedin: FaLinkedin,
      FaTwitter: FaTwitter,
      FaEnvelope: Mail
    };
    const IconComponent = icons[iconName] || Mail;
    return IconComponent;
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'd love to hear from you. Feel free to reach out through any of the channels below.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="text-primary-600 dark:text-primary-400" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = getSocialIcon(social.icon);
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900 transition-all duration-200 shadow-md hover:shadow-lg"
                      aria-label={`Visit my ${social.name} profile`}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send a Message
            </h3>

            {/* Form Status Messages */}
            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg flex items-center">
                <Check className="text-green-600 dark:text-green-400 mr-3" size={20} />
                <span className="text-green-800 dark:text-green-200">
                  Thank you! Your message has been sent successfully.
                </span>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg flex items-center">
                <AlertCircle className="text-red-600 dark:text-red-400 mr-3" size={20} />
                <span className="text-red-800 dark:text-red-200">
                  Sorry, there was an error sending your message. Please try again.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                    errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                    errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Tell me about your project or just say hello..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;