


import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";


const Coverage = () => {
    const  warehouse = useLoaderData()
    console.log(warehouse)
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in <span className="text-blue-600">64 districts</span>
      </h1>

      {/* Later you can add your search box here */}
      {/* <SearchDistrictBox /> */}

      <BangladeshMap warehouse ={warehouse}/>
    </div>
  );
};

export default Coverage;

