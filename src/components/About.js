import React from 'react';
import { GraduationCap, Briefcase, MapPin } from 'lucide-react';
import { about, personalInfo } from '../data/portfolio';

const SkillBar = ({ skill }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {skill.name}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {skill.level}%
      </span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-primary-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio and Personal Info */}
          <div className="space-y-6">
            {/* Bio Paragraphs */}
            <div className="space-y-4">
              {about.description.map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Personal Details */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personal Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin size={18} className="mr-3 text-primary-500" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <GraduationCap size={18} className="mr-3 text-primary-500" />
                  <span>{about.education[0].degree}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Briefcase size={18} className="mr-3 text-primary-500" />
                  <span>Open to opportunities</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Education
              </h3>
              {about.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {edu.school}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {edu.year}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Experience
              </h3>
              <div className="space-y-6">
                {about.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {exp.title}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {exp.year}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Technical Skills
              </h3>
              <div className="space-y-4">
                {about.skills.map((skill, index) => (
                  <SkillBar key={index} skill={skill} />
                ))}
              </div>
            </div>

            {/* Skills Grid Alternative View */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Technologies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {about.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200 hover:shadow-md"
                  >
                    <div className="text-2xl mb-2">
                      {/* Placeholder for skill icon */}
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg mx-auto mb-2"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-blue-500 h-1 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;