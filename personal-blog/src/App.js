import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Archives from './pages/Archives';
import Categories from './pages/Categories';
import About from './pages/About';
import ArticleDetail from './pages/ArticleDetail';
import Gallery from './pages/Gallery';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/*"
          element={
            <AppContainer>
              <Navbar />
              <MainContent>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/archives" element={<Archives />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/article/:id" element={<ArticleDetail />} />
                </Routes>
              </MainContent>
              <Footer />
            </AppContainer>
          }
        />
      </Routes>
    </Router>
  );
}

export default App; 