// src/components/Layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-[#ebf5f6] text-white py-2">


          <div className="text-center ">
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
            </p></div>
     
    
    </footer>
  );
};

export default Footer;
