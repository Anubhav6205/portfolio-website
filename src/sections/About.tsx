import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
export default function About() {
  const [hoveredWord, setHoveredWord] = useState('')
  return (
    <div className='about-container' id='about'>
      <div className='about-title'>
        <h2 className='title'>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            exit={{ opacity: 0 }}
          >
            <p>
              <span
                onMouseEnter={() => setHoveredWord('I')}
                onMouseLeave={() => setHoveredWord('')}
                className={`${hoveredWord.length > 0 && hoveredWord !== 'I'
                  ? 'hovered-word'
                  : ''
                  }`}
              >
                I
              </span>
              <span
                onMouseEnter={() => setHoveredWord('ship')}
                onMouseLeave={() => setHoveredWord('')}
                className={`${hoveredWord.length > 0 && hoveredWord !== 'ship'
                  ? 'hovered-word'
                  : ''
                  }`}
              >
                {' '}
                ship
              </span>
              <span
                onMouseEnter={() => setHoveredWord('robust')}
                onMouseLeave={() => setHoveredWord('')}
                className={`${hoveredWord.length > 0 && hoveredWord !== 'robust'
                  ? 'hovered-word'
                  : ''
                  }`}
              >
                {' '}
                robust
              </span>{' '}
              <span
                onMouseEnter={() => setHoveredWord('&')}
                onMouseLeave={() => setHoveredWord('')}
                className={`${hoveredWord.length > 0 && hoveredWord !== '&'
                  ? 'hovered-word'
                  : ''
                  }`}
              >
                &
              </span>
            </p>
            <p>
              <span
                onMouseEnter={() => setHoveredWord('maintainable')}
                onMouseLeave={() => setHoveredWord('')}
                className={`${hoveredWord.length > 0 && hoveredWord !== 'maintainable'
                  ? 'hovered-word'
                  : ''
                  }`}
              >
                maintainable
              </span>{' '}
              <span
                onMouseEnter={() => setHoveredWord('products')}
                onMouseLeave={() => setHoveredWord('')}
                className={`${hoveredWord.length > 0 && hoveredWord !== 'products'
                  ? 'hovered-word'
                  : ''
                  }`}
              >
                products
              </span>
            </p>
          </motion.span>
        </h2>
      </div>
      <motion.div
        className='about-main'
        initial={{ opacity: 0, y: 300 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className='about-text'>
          <h2 className='heading'>The Force Behind the Screen</h2>
          <h2 className='title'>Hi, I`m Anubhav!</h2>
          {/* <p className='subtitle'>
            I`m a passionate web developer with{' '}
            <span className='highlight'>
              top-notch programming and design skills
            </span>
            . My expertise lies in developing next-level websites and web
            applications, with a strong focus on creating captivating frontend
            designs.
          </p> */}

          <p className='subtitle'>
            I&#39;m not your average web developer—I&#39;m a coding wizard with design chops. For the last{' '}
            <span className='highlight'>2 years</span> at{' '}
            <span className='highlight'>
              <Link href='https://www.chubb.com/'>Chubb</Link>
            </span>
            , I&#39;ve built slick, reliable apps across the stack.{' '}
            <span className='highlight'>Diamond Excellence Award</span> winner and{' '}
            <span className='highlight'>1st place</span> in a{' '}
            <span className='highlight'>Game Dev with AI</span> competition. B.Tech CS, CGPA{' '}
            <span className='highlight'>9.13</span>. Brace yourself for web experiences that actually wow!
          </p>
          <p className='description'>
            I&#39;m defined by what I build next—skills can be taught, but{' '}
            <span className='highlight'>curiosity and grit</span> drive real impact. I learn fast,{' '}
            <span className='highlight'>tackle tough problems</span>, and chase{' '}
            <span className='highlight'>meaningful work,</span> with a splash of fun.
          </p>


          <div className='technologies'>
            <h3 className='technologies-title'>Some technologies I’ve worked with:</h3>
            <ul className='technologies-list'>
              <li>Java</li>
              <li>TypeScript</li>
              <li>Angular</li>
              <li>Spring</li>
              <li>Jenkins</li>
              <li>Docker</li>
              <li>Kubernetes</li>
              <li>Terraform</li>
              <li>AWS</li>
              <li>SonarQube</li>
              <li>Grafana</li>
              <li>Git & GitHub</li>
            </ul>
          </div>

        </div>
        <div className='about-image'>
          <div className='overlay'></div>
          <img src='/about_image.jpeg' alt='pic' className='img' />
        </div>
      </motion.div>
    </div>
  )
}
