import React from 'react';
import location from '../../../assets/assets/location-merchant.png'

const Marchant = () => {
    return (
        <div data-aos="zoom-in-up" className=" bg-[#03373D] bg-[url('assets/assets/be-a-merchant-bg.png')] bg-no-repeat p-20 my-20 rounded-4xl ">
  <div className="hero-content flex-col lg:flex-row-reverse ">
    <img
      src={location}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className="py-6">
        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
      </p>
      <button className="btn mr-4 rounded-full text-black bg-[#CAEB66]">Become a Merchant</button>
      <button className="btn btn-[#CAEB66] btn-outline text-[#CAEB66] rounded-full">Earn with ZapShift Courier</button>
    </div>
  </div>
</div>
    );
};

export default Marchant;