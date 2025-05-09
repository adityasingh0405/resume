import React, { useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaEnvelope
} from "react-icons/fa";
import "../App.css";
import icasw from "../assets/icasw.png";

const projects = [
  {
    name: "Conference Website for Srijan Society",
    description:
      "Developed a mobile-optimized academic conference website for Srijan Society, focusing on key themes like Artificial Intelligence, Sustainable Development Goals, and Water Conservation. Implemented clean UI with sections for keynote speakers, schedules, submission guidelines, and real-time announcements.",
    image: icasw,
    gitlink: "https://github.com/adityasingh0405/Srijan-Conference"
  },
  {
    name: "Employee Task Manager (WIP)",
    description:
      "A full-stack React + Node.js + MySQL project designed for small to mid-sized teams. Features include login/authentication, task assignment, priority tagging, admin dashboards, deadline tracking, and progress analytics.",
    image: icasw,
    gitlink: "https://github.com/adityasingh0405/employeetasker"
  },
  {
    name: "Soil Nutrient Prediction (WIP)",
    description:
      "An intelligent agriculture tool using a CNN trained on soil and leaf images to predict plant nutrient deficiencies and diseases. Aims to automate early diagnosis and provide actionable insights to farmers.",
    image: icasw,
    gitlink: "https://github.com/yourusername/project-three"
  },
  {
    name: "Portfolio Website",
    description:
      "Personal developer portfolio showcasing projects, skills, education, and experience. Built with React, Vite, and Tailwind CSS. Includes smooth transitions, routing, and a contact form using emailjs.",
    image: "",
    gitlink: "https://github.com/adityasingh0405/resume"
  }
];

const ProjectMenu = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleProject = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mt-40 mx-auto p-6 relative z-0 overflow-visible">
      <h1 className="text-4xl pixelify-sans-800 neon mb-6">My Work...</h1>

      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-green-400 shadow-lg transition-transform hover:scale-[1] relative z-10 overflow-visible"
        >
          <button
            onClick={() => toggleProject(index)}
            className="w-full text-2xl text-left pixelify-sans-800 px-6 py-5 bg-black hover:bg-green-900 transition-colors duration-300 text-green-200 font-semibold tracking-wide flex items-center"
          >
            <span>{project.name}</span>
            {project.gitlink && (
              <a
                href={project.gitlink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative pixelify-sans-800 w-32 h-10 border border-green-900 rounded-md bg-[#212121] text-green-600 text-md font-semibold flex items-center justify-center gap-2 shadow-[0_6px_2px_0.5px_#2b5b3c] transition-all duration-[400ms] ease-in-out hover:translate-y-[6px] hover:shadow-none ml-auto"
              >
                <FaGithub size={18} />
                GitHub
              </a>
            )}
          </button>

          <div
            className={`bg-black text-white overflow-hidden transition-all duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
              openIndex === index
                ? "max-h-[600px] opacity-100 translate-y-0 py-6 px-6"
                : "max-h-0 opacity-0 -translate-y-2 px-6"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-0 overflow-visible">
              <p className="font-montserrat text-gray-300 md:w-2/3">
                {project.description}
              </p>
              {project.image && (
                <div className="relative md:w-1/3 max-w-lg min-h-[200px] overflow-visible z-20">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-auto rounded-lg transform-gpu transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[2.2] hover:z-[50] hover:shadow-2xl"
                    style={{
                      transformOrigin: "center bottom",
                      position: "relative"
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Certifications Section */}
      <div className="mt-28">
        <h2 className=" pixelify-sans-800 neon mb-6 text-left text-4xl">
          Certifications
        </h2>
        <div className="grid grid-cols-1 -ml-0.5 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#111] border border-green-700 p-6 rounded-xl shadow-lg hover:shadow-green-500/20 transition-all">
            <h3 className="text-xl text-green-300 font-semibold mb-2">
              Back-End Web Development
            </h3>
            <p className="text-gray-400 mb-4 font-mono">Scaler Topics,2025</p>
            <a
              href="https://moonshot.scaler.com/s/sl/G4CFVMjhrj?_gl=1*1m2fqb8*FPAU*MTg0MjA3NTY5OC4xNzQ2ODA4MDIy*_ga*NjYzMDk2MzE5LjE3Mzc5ODcxNTE.*_ga_53S71ZZG1X*czE3NDY4MDgwMTgkbzM4JGcxJHQxNzQ2ODA4MDIzJGowJGwwJGgxNjg0NzgwMjk5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline font-mono hover:text-green-200"
            >
              View Certificate
            </a>
          </div>
        </div>
      </div>
  {/* Download Resume Section */}
<div className="mt-30 -mb-15 text-center">
  <h2 className="text-4xl pixelify-sans-800 neon mb-6">
    Download My Resume
  </h2>
  <p className="text-gray-400 mb-4 font-mono">
    Click below to download the latest version of my resume in PDF format.
  </p>
  <div className="flex justify-center">
    <a
      href="/Resume.pdf"
      download
      className="relative pixelify-sans-800 w-48 mt-4 h-12 border border-green-900 rounded-md bg-[#212121] text-green-500 text-lg font-semibold flex items-center justify-center shadow-[0_6px_2px_0.5px_#2b5b3c] transition-all duration-[400ms] ease-in-out hover:translate-y-[6px] hover:shadow-none"
    >
      Download Resume
    </a>
  </div>
</div>


      {/* Footer */}
      <footer className="mt-32 py-10 text-center border-t border-green-800">
        <p className="text-gray-500 mb-4 font-mono">
          © 2025 Aditya Singh. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 text-green-400 text-xl"></div>
      </footer>
    </div>
  );
};

export default ProjectMenu;
