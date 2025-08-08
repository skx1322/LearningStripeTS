import HeroImage from "../assets/HerrscherOfScammer.jpg";
import { Category } from "../data/test";

const Home = () => {
  return (
    <div className="bg-primary min-h-screen text-text-main">
      <section className="container mx-auto flex flex-col md:flex-row items-center py-16">
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-4">
            New Arrivals
          </h1>
          <p className="text-lg text-text-secondary mb-6">
            Explore our curated collection of high-quality products. Find the
            perfect item to match your style.
          </p>
          <button className="bg-accent-gold text-primary font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-accent-maroon transition-colors duration-300">
            Shop Now
          </button>
        </div>
        <div className="md:w-1/2 p-4">
          <img
            src={HeroImage}
            alt="Hero"
            className="rounded-lg shadow-xl w-full"
          />
        </div>
      </section>

      <div className="bg-secondary text-primary py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by thousands of shoppers
          </h2>
          <p className="text-lg mb-6">
            We are absolutely committed to providing a seamless and secure shopping
            experience.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-2xl">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Secure Payments?</span>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
              <span>Mediocore Shipping</span>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <span>24/7 Support (True?)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-secondary">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Category.slice(0, 6).map((data, index) => (
            <div
              key={index}
              className="bg-support-gray-dark text-text-main p-6 rounded-lg shadow-md text-center hover:bg-support-gray-light transition-colors duration-300 cursor-pointer"
            >
              <h3 className="font-semibold text-lg">{data}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
