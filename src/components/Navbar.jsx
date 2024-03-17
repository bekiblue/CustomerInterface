import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white p-4 text-black">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <Link to="/">
            <button className="bg-white hover:border-none">
              <img
                src="https://www.bulkmockup.com/wp-content/uploads/2020/04/BULK-MOCKUP-BRANDING-220.png.webp"
                alt="bulk mockup"
                className="h-8"
              />
            </button>
          </Link>
        </div>
        <div>
          <Link to="/" className="mr-10" style={{ color: '#00adb5'}}>
            Customer Data
          </Link>
          <Link to="/license-key" style={{ color: '#00adb5'}}>Reset License Key</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;