import Link from 'next/link'
import React from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import Image from 'next/image'
import { motion } from 'framer-motion'
export default function Projects() {
  const projectsData = [
    {
      "image": "/project1.png",
      "projectName": "Full-Stack DevOps Deployment Flow",
      "projectLink": "https://github.com/Anubhav6205/cicd-to-eks-with-monitoring",
      "projectDescription": "A complete CI/CD pipeline with Jenkins, SonarQube, OWASP, and Trivy scans, deploying containerized apps to AWS EKS with Terraform. Includes monitoring via Prometheus & Grafana for full observability.",
      "projectTech": [
        "Jenkins",
        "SonarQube",
        "OWASP Dependency-Check",
        "Trivy",
        "Docker",
        "AWS EKS",
        "Terraform",
        "Prometheus",
        "Grafana"
      ],
      "projectExternalLinks": {
        "github": "https://github.com/Anubhav6205/cicd-to-eks-with-monitoring",
        "externalLink": "https://github.com/Anubhav6205/cicd-to-eks-with-monitoring"
      }
    }
    , {
      "image": "/project2.webp",
      "projectName": "AWS Microservices Migration & Containerization",
      "projectLink": "https://anubhavinsights.hashnode.dev/deploy-applications-on-aws-a-step-by-step-guide-to-ec2-elb-route-53-and-more",
      "projectDescription": "Migrated a Spring-based microservices stack to AWS (VPC, IAM, TLS, DNS) using EC2, ELB, Route 53, and ACM. Containerized with Docker to standardize builds, improve scalability, and reduce drift across environments.",
      "projectTech": [
        "Spring",
        "RabbitMQ",
        "Memcached",
        "Tomcat",
        "MySQL",
        "AWS EC2/ELB/Route 53/ACM",
        "Docker",
        "Custom AMIs"
      ],
      "projectExternalLinks": {
        "github": "",
        "externalLink": "https://anubhavinsights.hashnode.dev/deploy-applications-on-aws-a-step-by-step-guide-to-ec2-elb-route-53-and-more"
      }
    },
    {
      "image": "/project3.png",
      "projectName": "Nest — Rental Marketplace",
      "projectLink": "https://github.com/Anubhav6205/Nest",
      "projectDescription": "A secure rental marketplace connecting landlords and tenants. Users can list properties, chat in-app, view geocoded maps, receive email notifications, and initiate payments — all with role-based access control and robust JDBC-backed data management.",
      "projectTech": [
        "Angular 17",
        "Spring Boot",
        "JDBC",
        "JWT",
        "Google Maps API",
        "MongoDB"
      ],
      "projectExternalLinks": {
        "github": "https://github.com/Anubhav6205/Nest",
        "externalLink": "https://github.com/Anubhav6205/Nest"
      }
    }
  ]
  return (
    <div className='projects' id='work'>
      <div className='title'>
        <h2>A Glimpse of My Work</h2>
      </div>
      <div className='projects-container'>
        {projectsData.map(
          ({
            image,
            projectDescription,
            projectLink,
            projectExternalLinks,
            projectName,
            projectTech
          }) => {
            return (
              <div className='project' key={projectName}>
                <div className='project-image'>
                  <div className='project-image-overlay'></div>
                  <div className='project-image-container'>
                    <Image src={image} fill alt={projectName} quality={100} />
                  </div>
                </div>
                <motion.div
                  className='project-info'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <h3 className='project-info-title'>{projectName}</h3>
                  <div className='project-info-description'>
                    <p>{projectDescription}</p>
                  </div>
                  <ul className='project-info-tech-list'>
                    {projectTech.map(tech => (
                      <li className='project-info-tech-list-item' key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <ul className='project-info-links'>
                    <li className='project-info-links-item'>
                      <Link
                        href={projectLink}
                        target='_blank'
                        className='project-info-links-item-link'
                      >
                        <FiGithub />
                      </Link>
                    </li>
                    <li className='project-info-links-item'>
                      <Link
                        target='_blank'
                        href={projectExternalLinks.externalLink}
                        className='project-info-links-item-link'
                      >
                        <FiExternalLink />
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
