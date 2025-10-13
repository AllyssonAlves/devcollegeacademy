import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import About from '../components/About';
import Plans from '../components/Plans';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Hero />
      <Courses />
      <About />
      <Plans />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;