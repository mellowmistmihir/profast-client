import React from 'react';
import Banner from '../banner/Banner';
import ServiceSection from '../service/ServiceSection';
import ClientLogos from '../marquee/ClientLogos';
import BenefitsSection from '../Benefit/BenefitsSection';
import Marchant from '../marchant/Marchant';
import BookingSection from '../work/BookingSection';
import QandA from '../QandA/QandA';
import Testimonials from '../testimonial/Testimonials';

const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <BookingSection></BookingSection>
           <ServiceSection></ServiceSection>
           <ClientLogos></ClientLogos>
           <BenefitsSection></BenefitsSection>
           <Marchant></Marchant>
           <QandA></QandA>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;