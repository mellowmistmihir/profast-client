import Marquee from "react-fast-marquee";

import client1 from "../../../assets/assets/brands/amazon.png";
import client2 from "../../../assets/assets/brands/amazon_vector.png";
import client3 from "../../../assets/assets/brands/casio.png";
import client4 from "../../../assets/assets/brands/moonstar.png";
import client5 from "../../../assets/assets/brands/randstad.png";
import client6 from "../../../assets/assets/brands/star.png";
import client7 from "../../../assets/assets/brands/start_people.png";

const logos = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
];

const ClientLogos = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-20">
          Trusted by Our Clients
        </h2>

        {/* Marquee */}
        <Marquee
          speed={50}          // speed of scrolling
          direction="left"    // right to left
          pauseOnHover={true} // pause when hover
          gradient={false}    // disable fade gradient
        >
          {logos.map((logo, index) => (
            <div key={index} className="mx-24 flex items-center">
              <img
                src={logo}
                alt="Client Logo"
                className="h-6 w-auto object-contain transition"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ClientLogos;
