import { useState, useEffect } from 'react';
import axios from 'axios';

const LicenseKeyPage = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [selectedProductID, setSelectedProduct] = useState('Tnddz0WwhC41pehTJr9_xg==');
  const [message, setMessage] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const productMapping = {
    'Bulkmockup version 3': 'Tnddz0WwhC41pehTJr9_xg==',
    'Bulkmockup version 2': 'bulkmockup_version_two_product_id',
  };

  const productNames = Object.keys(productMapping);

  const handleProductChange = (e) => {
    e.preventDefault();
    const selectedDisplayName = e.target.value;
    const selectedProductId = productMapping[selectedDisplayName];
    setSelectedProduct(selectedProductId);
  };

  const resetCount = async () => {
    setIsMessageVisible(false); 
  
       
    if (!licenseKey.trim()) {
        setMessage({ type: 'error', text: 'License key cannot be empty.' });
        setIsMessageVisible(true); 
        return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://198.13.44.165:5000/api/execute-python-script', {
        selectedProductID,
        licenseKey,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'License reset successfully!' });
      } else {
        setMessage({ type: 'error', text: response.data });
      }
  
      setIsMessageVisible(true); 
    } catch (error) {
      console.error('Error executing Python script:', error);
      
     
      if (error.response && error.response.status === 500) {
        setMessage({ type: 'error', text: error.response.data });
      } 
      else if (error.response && error.response.status === 404) {
        setMessage({ type: 'error', text: error.response.data });
        
      }
      else {
        setMessage({ type: 'error', text: 'An error occurred while resetting the license.' });
      }
  
      setIsMessageVisible(true);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (isMessageVisible) {
      timeoutId = setTimeout(() => {
        setIsMessageVisible(false);
      }, 5000); 
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMessageVisible]);

  return (
    <div className="flex flex-col text-center items-center justify-center min-h-screen px-4 sm:px-0">
      <div className="container mx-auto sm:w-full">
        <input
          className="border bg-white text-black border-black rounded p-2 mr-2 md:w-2/5 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Enter license key"
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
        />

        <select
          className="border bg-white text-black border-black rounded p-2 mr-2 focus:outline-none focus:border-blue-500"
          value={productNames.find((name) => productMapping[name] === selectedProductID)}
          onChange={handleProductChange}
        >
          {productNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none w-40 min-h-10"
          onClick={resetCount}
        >
          Reset
        </button>
      
        {isMessageVisible && message && (
          <div
            className={`flex flex-col text-center items-center justify-center mt-6 h-8 px-4 sm:px-0 rounded w-1/2 mx-auto  ${
              message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenseKeyPage;