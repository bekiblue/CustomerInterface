import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000);

            return () => clearTimeout(timer);  // cleanup on unmount
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            setError('Please fill in all fields.');
        } else if (email.length < 5 || password.length < 6) {
            setError('Email and password must be at least 5 and 6 characters long, respectively.');
        } else {
            setError(''); 
            const loginSuccess = await login(email, password);
            if (!loginSuccess) {
                setError('Invalid credentials. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-6 bg-white shadow-md rounded-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Please login to your account.</p>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-black bg-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className="sr-only">Password</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-white border-gray-300  text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00adb5] hover:bg-[#00adef] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;