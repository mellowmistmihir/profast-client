import React from 'react';

const QandA = () => {
    return (
        <div className='my-10'>
            <h2 className='text-4xl text-center '>Frequently Asked Question (FAQ)</h2>
            <p className='text-gray-500  w-1/2 mx-auto text-center my-10'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            <div className="collapse bg-base-100 border border-base-300 ">
  <input type="radio" name="my-accordion-1" defaultChecked />
  <div className="collapse-title font-semibold">How does this posture corrector work?</div>
  <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
</div>
<div className="collapse bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-1" />
  <div className="collapse-title font-semibold">Does it really help with back pain and posture improvement?</div>
  <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div className="collapse bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-1" />
  <div className="collapse-title font-semibold">How will I be notified when the product is back in stock?</div>
  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>
             <div className='flex justify-center my-4'>
                    <button className='btn mr-4 rounded-xl text-xl text-black py-2 px-2 bg-[#CAEB66] flex justify-center'>See more Q&A </button>
             </div>
        </div>
    );
};

export default QandA;