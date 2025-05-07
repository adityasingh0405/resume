import React, { useState } from 'react';
import '../App.css';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.jpeg';
import jsLogo from '../assets/js.jpeg';
import pythonLogo from '../assets/python.jpeg';
import javaLogo from '../assets/java.jpeg';
import nodeLogo from '../assets/node.png';
import expressLogo from '../assets/ex.png';
import mongoLogo from '../assets/mongo.jpeg';
import mysqlLogo from '../assets/mysql.png';
import gitLogo from '../assets/git.jpg';
import githubLogo from '../assets/github.png';
import pic from '../assets/pic.png';


export default function About() {
  const [isLit, setIsLit] = useState(false);

  const cardBase = "rounded-lg bg-[#111111] border-3 p-4 transition duration-300 ease-in-out hover:scale-[1.02]";
  const dull = "opacity-20 brightness-30 border-green-200";
  const lit = "opacity-100 brightness-125 grayscale-0 border-green-800 shadow-[0_0_15px_#2b542c]";

  const toggleLight = () => setIsLit(!isLit);

  return (
    <div className="pt-24 px-4 bg-black min-h-screen flex justify-center  items-center relative">
      <div className="grid grid-cols-3 grid-rows-3 gap-4 max-w-6xl w-full relative">

      <div className={`col-span-2 h-auto p-6 animate-slide-in-left ${cardBase} ${isLit ? lit : dull}`}>
  <h1 className="text-3xl font-bold pixelify-sans-800 neon mb-2">Who am I?</h1>
  <p className="text-md text-gray-300 pixelify-sans-800 leading-relaxed">
    I am a Web developer proficient in building front-end and back-end systems. Adept at React, Node.js, and modern web stacks. 
    Passionate about creating efficient, user-focused applications with clean code and responsive design.
  </p>
</div>


<div className={`relative col-start-3 row-span-2 h-full flex flex-col items-center justify-center text-center animate-slide-in-top ${cardBase} ${isLit ? lit : dull}`}>
  <h1 className="text-3xl pixelify-sans-800 neon mb-6">Technologies</h1>

  <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
    <div className="flex flex-col items-center">
      <img src={reactLogo} alt="React" className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={viteLogo} alt="Vite" className="w-25 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={jsLogo} alt="JavaScript" className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={pythonLogo} alt="Python" className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={javaLogo} alt="Java" className="w-10 h-15" />
    </div>
    <div className="flex flex-col items-center">
      <img src={nodeLogo} alt="Node.js" className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={expressLogo} alt="Express.js" className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={mongoLogo} alt="MongoDB" className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={mysqlLogo} alt="MySQL" className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={gitLogo} alt="Git" className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center">
      <img src={githubLogo} alt="GitHub" className="w-10 h-10" />
    </div>
  </div>
</div>





<div
  className={`col-span-1 row-span-2 h-[380px] flex flex-col items-center justify-center text-center animate-slide-in-left-1 border-3 rounded-2xl shadow-2xl bg-gradient-to-br from-black via-gray-900 to-black ${cardBase} ${isLit ? lit : dull}`}
>
  <h1 className="text-4xl font-bold pixelify-sans-800 text-green-300 neon mb-4">
    Experience
  </h1>
  <p className="text-lg text-gray-300 animate-pulse px-4">
    Something awesome is brewing...
  </p>
  <div className="mt-6">
    <span className="inline-block px-4 py-2 pixelify-sans-800 text-md font-semibold text-black bg-green-300 rounded-full shadow-md animate-bounce">
      Coming Soon
    </span>
  </div>
</div>


       
        <div className={`col-span-1 h-[200px] flex flex-col items-center justify-center animate-slide-in-right ${cardBase} ${isLit ? lit : dull}`}>
  <img src={pic} className='h-28 -mt-2 w-28 neon' alt="aditya" />
  <h1 className="text-4xl pixelify-sans-800 neon mt-2">ADITYA SINGH</h1>
</div>

    
        <div className="col-span-1 -mt-[20px] h-[200px] w-full sm:w-[600px] lg:w-[800px] flex items-center justify-center animate-flicker relative">

  <button
    onClick={toggleLight}
    title='"Because there is darkness, light shines."'
    className="pixelify-sans-800 neon-2 flicker-2 focus:outline-none select-none text-5xl lg:text-6xl"
  >

    闇の中にこそ、光は輝く。
  </button>
</div>

<div className={`col-span-3 -mt-[35px] h-auto p-6 animate-slide-in-right ${cardBase} ${isLit ? lit : dull}`}>
  <h1 className="text-3xl font-bold pixelify-sans-800 neon mb-2">Education</h1>
  <div className="text-md text-gray-300 pixelify-sans-800 leading-relaxed space-y-2">
    
    <div className="flex justify-between">
      <span>
        <span className="font-semibold text-green-300">B.Tech in AI & Data Science</span>, 
        <span className="italic text-green-300"> Vivekananda Institute, Delhi</span>
      </span>
      <span className="text-gray-400">Jun 2027 (Pursuing)</span>
    </div>

    <div>
      <span className="font-semibold">Relevant Coursework:</span> Data Structures, DBMS, OS, Web Dev, ML Foundations
    </div>

    <div className="flex justify-between">
      <span>
        <span className="font-semibold text-green-300">Senior Secondary Education</span>, 
        <span className="italic text-green-300"> Bal Bhavan International, New Delhi</span>
      </span>
      <span className="text-gray-400">Apr 2023</span>
    </div>

    <div>
      Completed 12th grade (PCM stream) with <span className="font-bold">87%</span>, 
      participated in tech and coding competitions.
    </div>
  </div>
</div>



      </div>
    </div >
  );
}
