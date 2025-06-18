// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import AddMovie from './pages/AddMovie';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col ">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recherche" element={<Search />} />
            <Route path="/ajouter" element={<AddMovie />} />
            <Route path="/film/:id" element={<MovieDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
