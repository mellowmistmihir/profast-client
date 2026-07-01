import BenefitCard from "./BenefitCard";

// images
import trackingImg from "../../../assets/assets/benefit/Transit warehouse.png";
import safeDeliveryImg from "../../../assets/assets/benefit/Vector.png";
import supportImg from "../../../assets/assets/benefit/Vector.png";

const BenefitsSection = () => {
  // ✅ DATA INSIDE SAME COMPONENT
  const benefitsData = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: trackingImg,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: safeDeliveryImg,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: supportImg,
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        {/* Benefits */}
        {benefitsData.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
