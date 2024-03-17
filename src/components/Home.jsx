import { useState } from 'react';
import axios from 'axios';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Home = () => {
  const [email, setEmail] = useState('');
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setSalesData(null);
    setIsLoading(true);

    try {
      const response = await axios.get('http://localhost:5000/api/customer-data', {
        params: {
          email,
        },
      });

      console.log('Response', response.data);
      if (response.data.sales.length === 0) {
        setError('No sales found for the provided email.');
      } else {
        setSalesData(response.data.sales);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      setError('An error occurred while fetching the data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail !== email) {
      setSalesData(null);
      setError(null);
    }
  };

  return (
    <div className="flex flex-col text-center items-center justify-center min-h-screen px-4 sm:px-0">
      <div className="container mx-auto">
        <input
          className="border bg-white text-black border-black rounded p-2 mr-2 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />

        <button
           style={{ backgroundColor: '#00adb5' }}
          className="text-white font-bold py-2 px-4 mr-20 mb-20 rounded focus:outline-none"
          onClick={fetchData}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Get Customer Data'}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {salesData && salesData.length === 0 && !error && (
          <p className="mt-4 text-gray-500">No sales found for the provided email.</p>
        )}

        {salesData && salesData.length > 0 && (
          <table className="mt-4 w-full text-center rounded text-black border-collapse border border-black">
            <thead>
              <tr>
                <th className="px-4 py-2 font-bold border border-black">Product</th>
                <th className="px-4 py-2 font-bold border border-black">Purchased at</th>
                <th className="px-4 py-2 font-bold border border-black">License Key</th>
                <th className="px-4 py-2 font-bold border border-black">License State</th>
                <th className="px-4 py-2 font-bold border border-black">Subscription Status</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr key={sale.id} className="hover:bg-blue border-black">
                  <td className="border border-black px-4 py-2">{sale.product_name}</td>
                  <td className="border border-black px-4 py-2">{new Date(sale.created_at).toLocaleString()}</td>
                  <td className="border border-black px-4 py-2">{sale.license_key}</td>
                  <td className="border  border-black px-4 py-2 text-green-600 font-bold">
                    {sale.license_disabled ? 'Disabled' : 'Active'}
                  </td>
                  <td
                    className={`border  border-black px-4 py-2 ${
                      sale.cancelled ? 'text-red-600' : 'text-green-600'
                    } font-bold`}
                  >
                    {sale.cancelled ? 'Cancelled' : 'Active'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;