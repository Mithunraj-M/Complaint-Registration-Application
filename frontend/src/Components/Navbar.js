import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import home_image from "./Pages/Assets/Icons/home_icon.jpg"
import tutorial_image from './Pages/Assets/Icons/tutorial_icon.jpeg';
import info_image from './Pages/Assets/Icons/info _icon.jpg';
import faq_image from './Pages/Assets/Icons/faq icon.jpeg';
import logo_image from './Pages/Assets/Images/logo.png';

const Navbar = () => {
  return (
    <>
      <nav>
        <Link to="/" className='title'><img src={logo_image} alt="Logo Icon" className='icon' id='logo'/> Indian Complaint Box</Link>
        <ul>
            <li>
                <Link to="/Home"><img src={home_image} alt="Home Icon" className='icon'/> Home</Link>
            </li>
            <li>
                <Link to="/Tutorial"><img src={tutorial_image} alt="Tutorial" className='icon'/> Tutorial</Link>
            </li>
            <li>
                <Link to="/About"><img src={info_image} alt="About Icon" className='icon'/> About</Link>
            </li>
            <li>
                <Link to="/FAQ"><img src={faq_image} alt="FAQ Icon" className='icon'/> FAQ</Link>
            </li>
        </ul>
      </nav>
      <div className="conveyor-belt">
        <ul>
          <li>IndiaResolve</li>
          <li>CitizenSpeak</li>
          <li>Sahajsamadhan</li>
          <li>Serving the Nation by Serving You</li>
          <li>EmpoweringLives</li>
          <li>TransformIndia</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
