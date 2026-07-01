

import car from "../../../assets/assets/bookingIcon.png"



const BookingSection = () => {
  const cards = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      image: car,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      image: car,
    },
    {
      id: 3,
      title: "Delivery Hub",
      image: car,
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      image: car,
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Booking Services
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="
                flex flex-col items-center text-center
                bg-base-200 rounded-xl p-6
                hover:shadow-xl hover:bg-green-300
                transition-all duration-300
              "
            >
              {/* Image */}
              <img
                src={card.image}
                alt={card.title}
                className="w-20 h-20 object-contain mb-4"
              />

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-base-content/70">
                From personal packages to business shipments — we deliver on
                time, every time.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;