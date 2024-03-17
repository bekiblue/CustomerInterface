
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex justify-center items-center flex-col md:flex-row ">
            <p>&copy; {new Date().getFullYear()} Bulk Mockup. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;