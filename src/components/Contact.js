import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaMedium } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolio';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
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
    if (!validateForm()) return;

    setFormStatus('sending');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const getSocialIcon = (iconName) => {
    const icons = { FaGithub, FaLinkedin, FaTwitter, FaMedium, FaEnvelope: Mail };
    return icons[iconName] || Mail;
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-black">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase mb-4">
            Let's Connect
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new opportunities and interesting projects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Let's Talk
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Whether you have a project in mind or just want to chat about technology, 
                I'd love to hear from you.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="card-apple flex items-center space-x-4">
                <div className="w-12 h-12 bg-apple-blue/10 dark:bg-apple-blue/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-apple-blue" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Email</h4>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-apple-blue transition-colors text-sm"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="card-apple flex items-center space-x-4">
                <div className="w-12 h-12 bg-apple-purple/10 dark:bg-apple-purple/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-apple-purple" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Phone</h4>
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-apple-purple transition-colors text-sm"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="card-apple flex items-center space-x-4">
                <div className="w-12 h-12 bg-apple-green/10 dark:bg-apple-green/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-apple-green" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = getSocialIcon(social.icon);
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                      aria-label={`Visit my ${social.name} profile`}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-apple">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Send a Message
            </h3>

            {/* Status Messages */}
            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-apple-green/10 border border-apple-green/20 rounded-2xl flex items-center">
                <Check className="text-apple-green mr-3" size={20} />
                <span className="text-apple-green text-sm">Message sent successfully!</span>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-apple-red/10 border border-apple-red/20 rounded-2xl flex items-center">
                <AlertCircle className="text-apple-red mr-3" size={20} />
                <span className="text-apple-red text-sm">Error sending message. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
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
                    className={`w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border ${
                      errors.name ? 'border-apple-red' : 'border-gray-200 dark:border-gray-700'
                    } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue transition-all`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-apple-red">{errors.name}</p>}
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
                    className={`w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border ${
                      errors.email ? 'border-apple-red' : 'border-gray-200 dark:border-gray-700'
                    } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue transition-all`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-apple-red">{errors.email}</p>}
                </div>
              </div>

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
                  className={`w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border ${
                    errors.subject ? 'border-apple-red' : 'border-gray-200 dark:border-gray-700'
                  } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue transition-all`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="mt-1 text-xs text-apple-red">{errors.subject}</p>}
              </div>

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
                  className={`w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border ${
                    errors.message ? 'border-apple-red' : 'border-gray-200 dark:border-gray-700'
                  } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue transition-all resize-none`}
                  placeholder="Tell me about your project..."
                ></textarea>
                {errors.message && <p className="mt-1 text-xs text-apple-red">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full btn-apple disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
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
