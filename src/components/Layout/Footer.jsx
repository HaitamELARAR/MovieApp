// src/components/Layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-xl">🎬</span>
            <span className="font-semibold">CinéManager</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 mb-2">
              Données fournies par{' '}
              <a 
                href="https://www.themoviedb.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                The Movie Database (TMDb)
              </a>
            </p>
            <p className="text-xs text-gray-500">
              © 2025 réaliser par El Arar Haitam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
