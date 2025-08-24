import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
function Experience() {
  const experiences = [
    {
      name: 'Chubb',
      role: 'Full Stack Developer',
      start: 'September 2023',
      end: 'Present',
      description: [
        'Co-delivered Speed-to-Market platform replacing Excel intake with versioned workflows & module links—cut time-to-launch from 9 months → 15 days, removed duplicate data, and unlocked an estimated $8M/yr in productivity.',
        'Migrated FE from Angular 12 → 16 in an Nx monorepo, introduced NgRx caching for static data and resolved breaking changes, improving average page load by ~60%.',
        'Built a workforce segmentation app (towers/teams/squads/chapters); presented to leadership and approved for productization, streamlining chapter-lead assignment and reporting.',
        'Stack: Angular, NgRx, Nx, Spring Boot, Quarkus, MongoDB, Jenkins, Docker',
      ]
    },
    {
      name: 'Celebal Technologies',
      role: 'Software Development Engineer Intern ',
      start: 'May 2023',
      end: 'August 2023',
      description: [
        'Built React components (search, profiles, admin views) backed by Node.js/Express + MongoDB; added pagination and client-side caching to cut redundant calls and speed up loads; wrote Jest tests first, reaching >80% coverage.',
        'Implemented JWT auth with role-based access; contributed to code reviews and standardized UI using reusable Tailwind components.',
        'Tech stack: React, Node.js, Express.js, MongoDB, Tailwind CSS, JWT, Jest.'
      ]
    }
    , {
      name: 'CodeClause',
      role: 'Software Development Engineer Intern',
      start: 'March 2023',
      end: 'April 2023',
      description: [
        'Built a Spotify-integrated music app in React Native using the Spotify Web API (OAuth, search, playlists); delivered the MVP within the internship timeline.',
        'Also shipped a real-time chat app in React + Node.js/Express with Socket.io, and a news app in React Native consuming NewsAPI.',
        'Tech stack: React Native, React, Node.js, Express.js, Socket.io, Spotify Web API, NewsAPI.'
      ]
    }

  ]

  const [selectedExperience, setSelectedExperience] = useState(0)
  useEffect(() => {
    const sideUnderline = document.querySelector<HTMLElement>('.underline')
    if (sideUnderline) {
      sideUnderline.style.top = `${selectedExperience * 5}rem`
    }
  }, [selectedExperience])
  return (
    <motion.div className='experience-container' id='experience'
      initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      viewport={{ once: true }}>
      <div className='title'>
        <h2>Lessons in Adulting</h2>
      </div>
      <div className='experience'>
        <ul className='experience-slider'>
          <div className='underline'></div>
          {experiences.map((experience, index) => {
            return (
              <li
                key={index}
                className={`experience-slider-item  ${selectedExperience === index ? 'selected-item' : ''
                  }`}
                onClick={() => setSelectedExperience(index)}
              >
                <span>{experience.name}</span>
              </li>
            )
          })}
        </ul>
        <div className='experience-details'>
          <div className='experience-details-item'>
            <h2 className='company'>
              <span className='role'>
                {experiences[selectedExperience].role}
              </span>
              <span className='name'>
                - {experiences[selectedExperience].name}
              </span>
            </h2>
            <p className='experience-details-time'>
              {experiences[selectedExperience].start} -{' '}
              {experiences[selectedExperience].end}
            </p>
            <ul className='experience-details-description-list'>
              {experiences[selectedExperience].description.map(
                (description, index) => {
                  return (
                    <li className='experience-details-item' key={index}>
                      {description}
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Experience
