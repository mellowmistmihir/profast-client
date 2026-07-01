const ServiceCard = ({ service }) => {
  const { title, description, icon } = service;

  return (
    <div className="card bg-base-200  hover:shadow-xl transition-shadow duration-300 
    hover:bg-[#CAEB66]
    hover:text-black
     ">
      <div className="card-body items-center text-center">
        <div className="text-primary text-4xl mb-4">
          {icon}
        </div>

        <h3 className="card-title text-lg font-semibold">
          {title}
        </h3>

        <p className="text-sm  text-base-content/70">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
