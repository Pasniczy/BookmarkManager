import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { BookmarksView } from './views/Bookmarks/BookmarksView';
import { HomeView } from './views/Home/HomeView';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/bookmarks" element={<BookmarksView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
