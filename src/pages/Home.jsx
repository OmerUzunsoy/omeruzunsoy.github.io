import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import FeedbackForm from '../components/FeedbackForm';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <FeedbackForm />
        </>
    );
};

export default Home;
