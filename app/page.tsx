'use client';

import { useState, useEffect, useRef } from 'react';
import { Inter, Fira_Code } from 'next/font/google';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
const inter = Inter({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'] });

// // Add this at the top of your file or in a separate icons file
// const WorkIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//   </svg>
// );

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sections = ['about', 'skills', 'projects', 'contact'];
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  // Add these new motion values for the ring
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        nextSection();
      } else {
        prevSection();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <div className="relative min-h-screen overflow-hidden cursor-none">
      <AnimatedBackground />
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        className={`relative z-10 min-h-screen bg-transparent text-gray-200 flex flex-col ${inter.className}`}
      >
        <motion.div
          ref={cursorRef}
          className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        />
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-40 mix-blend-difference"
          style={{
            x: ringX,
            y: ringY,
          }}
        />
        <motion.header 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "tween", duration: 0.2 }}
          className="bg-transparent text-white py-4 md:py-6"
        >
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`text-3xl md:text-4xl font-bold ${firaCode.className}`}
            >
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                S
              </motion.span>
              aim
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-300"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                Full Stack
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                Web
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
              >
                and
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.3 }}
              >
                App
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.5 }}
              >
                Developer
              </motion.span>
            </motion.p>
          </div>
        </motion.header>

        <main className="flex-grow flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {sections.map((section, index) => (
              currentSection === index && (
                <motion.section
                  key={section}
                  initial={{ opacity: 0, x: '50%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '-50%' }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="container mx-auto px-4">
                    <motion.h2 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.1 }}
                      className={`text-2xl md:text-3xl font-semibold mb-3 md:mb-4 ${firaCode.className}`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.h2>
                    {section === 'about' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.p 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="text-base md:text-lg text-gray-300 mb-2"
                        >
                          I am a Next.js and Flutter Developer.
                        </motion.p>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          className="text-base md:text-lg text-gray-300"
                        >
                          I am a CS student at FAST NUCES.
                        </motion.p>
                      </motion.div>
                    )}
                    {section === 'skills' && (
                      <motion.ul 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, staggerChildren: 0.1 }}
                        className="grid grid-cols-2 gap-2 md:gap-4 text-base md:text-lg text-gray-300"
                      >
                        {['Next.js', 'Flutter', 'Firebase', 'MERN'].map((skill, index) => (
                          <motion.li
                            key={skill}
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.1,
                              type: "spring",
                              stiffness: 100
                            }}
                            whileHover={{ 
                              scale: 1.05, 
                              color: "#ffffff",
                              transition: { duration: 0.2 } 
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-text"
                          >
                            {skill}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                    {section === 'projects' && (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 max-h-[60vh] md:max-h-none overflow-y-auto md:overflow-y-visible pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
                      >
                        {[
                          {
                            name: 'AI Resume Analyzer',
                            description: 'An intelligent tool that analyzes resumes using AI to provide insights and suggestions.',
                            link: 'https://resuai.vercel.app',
                            linkType: 'website',
                            techStack: ['NLP', 'Tesseract', 'Next.js', 'Gemini']
                          },
                          {
                            name: 'Flutter Food Ordering App (In development)',
                            description: 'A full fledged food ordering app for university canteens.',
                            link: 'https://example.com/NA',
                            linkType: 'github',
                            techStack: ['Flutter', 'Firebase']
                          },
                          {
                            name: 'Youtube Comments Analyzer',
                            description: 'A tool that analyzes YouTube comments to provide sentiment analysis and key insights.',
                            link: 'https://www.linkedin.com/posts/contactsaim_excited-to-share-my-latest-ai-nlp-project-activity-7225566693668843520-C6mq?utm_source=share&utm_medium=member_desktop',
                            linkType: 'linkedin',
                            techStack: ['Flask', 'NLP', 'YouTube API', 'React', 'Textblob']
                          },
                          {
                            name: 'Flutter Social Campus Events App',
                            description: 'A social platform for campus events, allowing students to discover, create, and join events.',
                            link: 'https://www.linkedin.com/posts/contactsaim_flutter-supabase-mobileappdevelopment-activity-7209910286688915456-W0aw?utm_source=share&utm_medium=member_desktop',
                            linkType: 'linkedin',
                            techStack: ['Flutter', 'Supabase', 'PostgreSQL']
                          }
                        ].map((project, i) => (
                          <motion.div
                            key={project.name}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1, ease: "easeOut" }}
                            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                            className="bg-zinc-900 p-4 md:p-6 rounded-lg shadow-lg flex flex-col justify-between"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: i * 0.1 + 0.2 }}
                            >
                              <h3 className={`text-base md:text-lg lg:text-xl font-semibold mb-2 ${firaCode.className}`}>{project.name}</h3>
                              <p className="text-xs md:text-sm lg:text-base text-gray-400 mb-4">{project.description}</p>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: i * 0.1 + 0.3 }}
                            >
                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.techStack.map((tech, index) => (
                                  <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: i * 0.1 + 0.4 + index * 0.05 }}
                                    className="px-2 py-1 bg-zinc-800 text-xs md:text-sm rounded-full text-gray-300"
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                              <motion.a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs md:text-sm inline-flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {project.linkType === 'github' && (
                                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                  </svg>
                                )}
                                {project.linkType === 'linkedin' && (
                                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                )}
                                {project.linkType === 'website' && (
                                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                  </svg>
                                )}
                                <span className="hidden md:inline">
                                  {project.linkType === 'github' && 'View on GitHub'}
                                  {project.linkType === 'linkedin' && 'View on LinkedIn'}
                                  {project.linkType === 'website' && 'Visit Website'}
                                </span>
                                <span className="md:hidden">View</span>
                              </motion.a>
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                    {section === 'contact' && (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                        className="text-base md:text-lg text-gray-300 space-y-4"
                      >
                        <motion.p
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          Email: x_aci@hotmail.com
                        </motion.p>
                        <motion.p
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          LinkedIn: <motion.a 
                            href="https://linkedin.com/in/contactsaim" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            linkedin.com/in/contactsaim
                          </motion.a>
                        </motion.p>
                        <motion.p
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          GitHub: <motion.a 
                            href="https://github.com/saim-x" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            github.com/saim-x
                          </motion.a>
                        </motion.p>
                      </motion.div>
                    )}
                  </div>
                </motion.section>
              )
            ))}
          </AnimatePresence>

          {!isMobile && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSection}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full"
              >
                &#8592;
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSection}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full"
              >
                &#8594;
              </motion.button>
            </>
          )}

          {isMobile && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-4 left-0 right-0 flex justify-center space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSection}
                className="bg-zinc-800 text-white p-2 rounded-full"
              >
                &#8592;
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSection}
                className="bg-zinc-800 text-white p-2 rounded-full"
              >
                &#8594;
              </motion.button>
            </motion.div>
          )}
        </main>

        <motion.footer 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-transparent py-3 md:py-4"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="text-sm md:text-base text-gray-400"
            >
              &copy; {new Date().getFullYear()} Saim. No rights reserved
            </motion.p>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}