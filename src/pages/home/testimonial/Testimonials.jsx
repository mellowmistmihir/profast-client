import { useState } from "react";
import photo from "../../../assets/assets/customer-top.png"
const Testimonials = () => {
  const testimonials = [
    {
      id: "slide1",
      name: "Rasel Ahamed",
      role: "CTO",
      message:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: "slide2",
      name: "Awlad Hossin",
      role: "Senior Product Designer",
      message:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: "slide3",
      name: "Nasir Uddin",
      role: "CEO",
      message:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: "slide4",
      name: "Jannatul Ferdous",
      role: "Marketing Manager",
      message:
        "This posture solution helps reduce pain and improves daily comfort.",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: "slide5",
      name: "Mehedi Hasan",
      role: "Product Engineer",
      message:
        "Maintaining proper posture has never been easier and smoother.",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: "slide6",
      name: "Sadia Islam",
      role: "UX Researcher",
      message:
        "It gently reminds you to sit straight throughout the day.",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
  ];

  const [active, setActive] = useState(0);

  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className=" py-20 overflow-hidden">
      <div className="flex justify-center mb-6">
        <img src={photo} alt="" />
      </div>
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d3f]">
          What our customers are sayings
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        </p>

        {/* Slider */}
        <div className="relative mt-16 flex justify-center items-center gap-6">
          {testimonials.map((item, index) => {
            const isActive = index === active;
            const isSide =
              index === active - 1 ||
              index === active + 1 ||
              (active === 0 && index === testimonials.length - 1) ||
              (active === testimonials.length - 1 && index === 0);

            if (!isActive && !isSide) return null;

            return (
              <div
                key={item.id}
                className={`transition-all duration-500
                  ${
                    isActive
                      ? "scale-105 opacity-100"
                      : "scale-95 opacity-40"
                  }
                `}
              >
                <div className="card w-[320px] md:w-[380px] p-8 shadow-xl">
                  <div className="text-5xl text-gray-300 mb-4">“</div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.message}
                  </p>

                  <div className="border-t border-dashed my-6"></div>

                  <div className="flex items-center gap-4 justify-center">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-left">
                      <h4 className="font-semibold text-[#0a3d3f]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-center items-center gap-6 mt-10">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="btn btn-circle bg-[#CAEB66] border-none text-black"
          >
            ❮
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all
                  ${
                    i === active
                      ? "bg-lime-400 scale-125"
                      : "bg-gray-400"
                  }`}
              ></button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="btn btn-circle bg-[#CAEB66] border-none text-black"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
