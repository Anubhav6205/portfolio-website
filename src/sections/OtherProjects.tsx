import Link from 'next/link';
import React from 'react';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import { motion } from 'framer-motion'
export default function OtherProjects() {
  const otherProjects = [
    {
      name: 'Vibe',
      description: 'A modern chat app with React, Material UI, and Socket.io for real-time messaging and file sharing.',
      tech: ['React.Js', 'ContextAPI', 'Socket.io', 'Material UI', 'Node.Js', 'MongoDB'],
      link: 'https://github.com/Anubhav6205/Vibe',
      extLink: 'https://github.com/Anubhav6205/Vibe'
    },
    {
      name: 'KIINECT',
      description: 'Campus platform for KIITians to connect, collaborate, and share with stunning UI/UX and utilities.',
      tech: ['React.Js', 'Redux Toolkit', 'Node.Js', 'MongoDB', 'Google Auth'],
      link: 'https://github.com/Anubhav6205/KIINECT',
      extLink: 'https://github.com/Anubhav6205/KIINECT'
    },
    {
      name: 'KHABRI',
      description: 'React Native news app fetching global updates, multilingual, with Context API state management.',
      tech: ['React Native', 'Context API', 'Multilingual Support'],
      link: 'https://github.com/Anubhav6205/KHABRI',
      extLink: 'https://github.com/Anubhav6205/KHABRI'
    }

  ];


  return (
    <div className="other-projects-container">
      <div className="titles">
        <h2 className="title">Notable Project Extras</h2>
        <p className="sub-title">
          <a href="https://github.com/Anubhav6205" target="_blank">
            View the repositories
          </a>
        </p>
      </div>

      <div className="other-projects-lists">
        {otherProjects.map(({ name, description, tech, link, extLink }, index) => (
          <motion.div className="other-projects-box" key={index}
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: .01, delay: index * .1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >

            <div className="icons">
              <div className="folder-icon">
                <a href={extLink} target="_blank">
                  <FiFolder />
                </a>
              </div>
              <div className="social-icon">
                <a href={extLink} target="_blank">
                  <FiGithub />
                </a>
                <a href={extLink} target="_blank">
                  <FiExternalLink />
                </a>
              </div>
            </div>

            <div className="other-projects-content">
              <h3 className="other-projects-title">{name}</h3>
              <p className="other-projects-description">{description}</p>
            </div>

            <div className="other-projects-tech">
              <ul className="other-projects-tech-list">
                {tech.map((tech, index) => (
                  <li className="other-projects-tech-list-item" key={index}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
