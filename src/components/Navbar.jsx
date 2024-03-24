import { Link, useLocation } from 'react-router-dom';
import { useContext }  from 'react';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();


  return (
    <nav className="w-full bg-white p-4 text-black">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <Link to="/">
            <button className="bg-white hover:border-none">
              <img
                src="https://www.bulkmockup.com/wp-content/uploads/2020/04/BULK-MOCKUP-BRANDING-220.png.webp"
                alt="bulk mockup"
                className="h-8 cursor-pointer"
              />
            </button>
          </Link>
        </div>
        <div>
          {user && location.pathname !== '/' && (
          <Link to={user ? "/customer-data" : "/"} className="mr-10" style={{ color: '#00adb5'}}>
            Get Customer Data
          </Link>
          )}
          {user && location.pathname !== '/' && (
          <Link to={user ? "/license-key" : "/"} className="mr-10" style={{ color: '#00adb5'}}>Reset License Key</Link>
          )}
          {user && location.pathname !== '/' &&  (
            <button onClick={logout} className='bg-[#00adb5] h-10 text-[#ffffff] w-40 px-4 py-1'>Logout</button>
            )} 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;