import React, { useState } from 'react'
import { motion } from 'framer-motion'
export default function Home () {
  const [hoveredWord, setHoveredWord] = useState('')
  const [image, setImage] = useState(false)

  const handleWordHover = (word: string) => {
    setHoveredWord(word)
  }

  return (
    <div className='home-container'>
      <div className='home-left'>
        <div className='upper-home'>
          <div className='main-title'>
            <motion.h2
              className='description'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 1.5 }}
            >
              <span>Hello Stranger!</span> <motion.span>I am</motion.span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 2 }}
          >
            <h6 className='sub-title'>
              <motion.span
                className={`word ${
                  hoveredWord && hoveredWord !== 'Anubhav' ? 'active' : ''
                }`}
                onMouseEnter={() => handleWordHover('Anubhav')}
                onMouseLeave={() => handleWordHover('')}
              >
                Anubhav
              </motion.span>{' '}
              <motion.span
                className={`word ${
                  hoveredWord && hoveredWord !== 'Gupta' ? 'active' : ''
                }`}
                onMouseEnter={() => handleWordHover('Gupta')}
                onMouseLeave={() => handleWordHover('')}
              >
                Gupta
              </motion.span>
            </h6>
            <h6 className='sub-title'>
              <motion.span
                className={`word ${
                  hoveredWord && hoveredWord !== 'a' ? 'active' : ''
                }`}
                onMouseEnter={() => handleWordHover('a')}
                onMouseLeave={() => handleWordHover('')}
              >
                a
              </motion.span>{' '}
              <motion.span
                className={`word ${
                  hoveredWord && hoveredWord !== 'Web' ? 'active' : ''
                }`}
                onMouseEnter={() => handleWordHover('Web')}
                onMouseLeave={() => handleWordHover('')}
              >
                Web
              </motion.span>{' '}
              <motion.span
                className={`word ${
                  hoveredWord && hoveredWord !== 'Developer' ? 'active' : ''
                }`}
                onMouseEnter={() => handleWordHover('Developer')}
                onMouseLeave={() => handleWordHover('')}
              >
                Developer
              </motion.span>
            </h6>
             <h6 className='sub-title'>
              <motion.span
                className={`word ${
                  hoveredWord && hoveredWord !== 'a' ? 'active' : ''
                }`}
                onMouseEnter={() => handleWordHover('a')}
                onMouseLeave={() => handleWordHover('')}
              >
                a
              </motion.span>{' '}
              <motion.span
                className={`word ${
                  hoveredWord && hoveredWord !== 'Web' ? 'active' : ''
                }`}
                onMouseEnter={() => handleWordHover('Web')}
                onMouseLeave={() => handleWordHover('')}
              >
                DevOps
              </motion.span>{' '}
              <motion.span
                className={`word ${
                  hoveredWord && hoveredWord !== 'Developer' ? 'active' : ''
                }`}
                onMouseEnter={() => handleWordHover('Developer')}
                onMouseLeave={() => handleWordHover('')}
              >
                Enthusiast
              </motion.span>
            </h6>
          </motion.div>
        </div>
        <motion.div
          className='lower-home'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 2.5 }}
        >
          <span className='description'>
            <p>I build <span className='highlight'>scalable apps</span> with Angular, Spring Boot <br/> and cloud-native DevOps pipelines.</p>
          </span>
        </motion.div>
      </div>
      <div className='home-right'>
        <motion.div
          className={`image-container ${image ? 'image-hovered' : ''}`}
          onMouseEnter={() => setImage(true)}
          onMouseLeave={() => setImage(false)}
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50
          }}
          transition={{ delay: 1.7, duration: 1 }}
        ></motion.div>
      </div>
    </div>
  )
}
