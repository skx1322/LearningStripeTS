import WaveBye from "../assets/Senti5.png";
import { footerData } from "../data/componentData";

const Footer = () => {
  return (
    <footer className="border-t-2 border-accent-gold bg-primary text-text-secondary py-12 px-4 sm:px-8 md:px-12 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center md:text-left">
          <p className="text-sm mb-4">
            Note: This website is only for my personal learning. None of the
            products are real or for sale.
          </p>
          <p className="text-lg font-bold text-secondary">
            &copy; 2025 HoS-Shop. All Rights <b className="text-accent-gold">Not</b> Reserved.
          </p>
        </div>

        <div className="flex justify-center md:justify-center">
          <img src={WaveBye} alt="Waving character" className="h-24 w-24" />
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-xl font-bold mb-4 text-secondary">Follow Me</h3>
          <div className="flex gap-6">
            {footerData.map((data, index) => (
              <a
                href={data.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-main hover:text-accent-gold transition-colors duration-300"
              >
                <data.icon className="text-2xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
