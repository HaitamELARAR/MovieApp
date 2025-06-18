// src/components/Layout/Header.jsx
import { NavLink } from 'react-router-dom';

const Header = () => {
  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Recherche', path: '/recherche' },
    { name: 'Ajouter', path: '/ajouter' }
  ];

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">
          🎬 Ger4u.vip
        </h1>

        <nav className="flex gap-2 transparent">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={navLinkClass}
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;