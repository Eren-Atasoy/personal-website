import React from 'react';
import { GraduationCap, Briefcase, MapPin } from 'lucide-react';
import { about, personalInfo } from '../data/portfolio';

const SkillPill = ({ skill }) => (
  <div className="group">
    <div className="card-apple p-4 hover:shadow-apple-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {skill.name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-apple-blue to-apple-purple h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        {/* Section Header - Apple minimal style */}
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase mb-4">
            Get to know me
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        {/* Bio Section - Full width, centered */}
        <div className="max-w-4xl mx-auto mb-20 animate-slide-up">
          <div className="space-y-6">
            {about.description.map((paragraph, index) => (
              <p 
                key={index}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-center"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Personal Details - Apple card style */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="card-apple">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-apple-blue/10 dark:bg-apple-blue/20 rounded-2xl flex items-center justify-center mb-4">
                  <MapPin size={20} className="text-apple-blue" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                <p className="text-base font-medium text-gray-900 dark:text-white">{personalInfo.location}</p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-apple-purple/10 dark:bg-apple-purple/20 rounded-2xl flex items-center justify-center mb-4">
                  <GraduationCap size={20} className="text-apple-purple" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Education</p>
                <p className="text-base font-medium text-gray-900 dark:text-white">{about.education[0].school}</p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-apple-green/10 dark:bg-apple-green/20 rounded-2xl flex items-center justify-center mb-4">
                  <Briefcase size={20} className="text-apple-green" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <p className="text-base font-medium text-gray-900 dark:text-white">Open to opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section - Apple grid style */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-10 text-center">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {about.skills.map((skill, index) => (
              <SkillPill key={index} skill={skill} />
            ))}
          </div>
        </div>

        {/* Experience & Education - Apple timeline style */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Education
            </h3>
            <div className="space-y-6">
              {about.education.map((edu, index) => (
                <div key={index} className="card-apple">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-apple-blue/10 dark:bg-apple-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={18} className="text-apple-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-apple-blue font-medium mb-1">
                        {edu.school}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {edu.year}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Experience
            </h3>
            <div className="space-y-6">
              {about.experience.map((exp, index) => (
                <div key={index} className="card-apple">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-apple-purple/10 dark:bg-apple-purple/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Briefcase size={18} className="text-apple-purple" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-sm text-apple-purple font-medium mb-1">
                        {exp.company}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {exp.year}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
