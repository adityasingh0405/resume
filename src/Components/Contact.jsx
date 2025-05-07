import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import "../App.css";
import icasw from "../assets/icasw.png";

const projects = [
  {
    name: "Conference Website for Srijan Society",
    description:
      "Developed a mobile-optimized academic conference website highlighting AI, climate action, SDGs, and water conservation. Built sections for keynote speakers, schedule, guidelines, announcements, and registration. Ensured accessibility and performance across browsers.",
    image: icasw,
    gitlink: "https://github.com/yourusername/srijan-conference",
  },
  {
    name: "Employee Task Manager (WIP)",
    description:
      "React + Node.js + MySQL full-stack app with login, task management, deadlines, admin privileges, and dynamic dashboards.",
    image: icasw,
    gitlink: "https://github.com/yourusername/project-two",
  },
  {
    name: "Soil Nutrient Prediction (WIP)",
    description:
      "CNN-based image classification model to predict plant diseases for smart agriculture. Aims to help farmers via automation.",
    image: icasw,
    gitlink: "https://github.com/yourusername/project-three",
  },
  {
    name: "Portfolio Website",
    description:
      "Built using React and Tailwind; includes project showcase, page transitions, internal routing, and contact formintegration.",
    image: "",
    gitlink: "https://github.com/yourusername/project-three",
  },
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
          className="bg-gray-900 animate-bulb-glow border border-green-400 shadow-lg transition-transform hover:scale-[1] relative z-10 overflow-visible"
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
                      position: "relative",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectMenu;
