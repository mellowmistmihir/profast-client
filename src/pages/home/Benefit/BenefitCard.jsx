const BenefitCard = ({ benefit }) => {
  const { title, description, image } = benefit;

  return (
    <div className="py-6 ">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Left Image */}
        <div className="flex-shrink-0 border-r border-dashed pr-5">
          <img
            src={image}
            alt={title}
            className="w-20 h-20 object-contain"
          />
        </div>


        {/* Right Content */}
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {title}
          </h3>
          <p className="text-base-content/70">
            {description}
          </p>
        </div>
      </div>

      {/* Horizontal Divider */}
      
    </div>
  );
};

export default BenefitCard;
