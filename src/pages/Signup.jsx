import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();

  // Function to generate a random token
  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      // Add user to Firestore
      await addDoc(collection(db, 'user'), {
        email,
        password,
        name: 'user'  // You can customize this as needed
      });

      const token = generateToken();
      localStorage.setItem('token', token);
      navigate('/Welcome');
    } catch (error) {
      setError('Error signing up: ' + error.message);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleSignin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md px-8 py-10 mx-4 mt-4 bg-white rounded-lg shadow-lg">
        <h3 className="mb-4 text-3xl font-bold text-center text-gray-800">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className={`flex items-center justify-center w-full px-4 py-2 text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span>Signing Up...</span>
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:underline"
                onClick={handleSignin}
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

