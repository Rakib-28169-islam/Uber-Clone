import {Link} from 'react-router-dom';
const Start = () => {
    return (
      <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-blue-400">
        {/* Header */}
        <header className="w-full flex justify-between items-center px-6 py-4">
          <span className="text-3xl font-bold text-black tracking-wide">Uber</span>
          <span className="text-sm text-gray-700 font-medium">App Store</span>
        </header>
  
        {/* Traffic Light Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Traffic Light */}
            <div className="bg-gray-800 w-28 h-72 rounded-2xl flex flex-col items-center justify-around p-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-orange-400 shadow-md transition-all duration-300 hover:scale-110 hover:ring-4 hover:ring-orange-300"></div>
              <div className="w-16 h-16 rounded-full bg-yellow-400 shadow-md transition-all duration-300 hover:scale-110 hover:ring-4 hover:ring-yellow-300"></div>
              <div className="w-16 h-16 rounded-full bg-green-400 shadow-md transition-all duration-300 hover:scale-110 hover:ring-4 hover:ring-green-300"></div>
            </div>
  
            {/* Uber Sign */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white py-3 px-6 rounded-full text-xl font-semibold shadow-lg">
              Uber
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="w-full bg-white p-8 border-t flex flex-col items-center shadow-lg">
          <p className="text-2xl font-semibold text-gray-900 mb-6">
            Get started with Uber
          </p>
          <Link to='/user-login' className="flex items-center justify-center bg-black text-white py-4 px-16 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md">
            Continue
        
          </Link>
        </footer>
      </div>
    );
  };
  
  export default Start;
  