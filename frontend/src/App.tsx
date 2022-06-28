import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomeView } from './views/Home/HomeView';
import { BookmarksView } from './views/Bookmarks/BookmarksView';
import { BookmarkView } from './views/Bookmark/BookmarkView';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/bookmarks" element={<BookmarksView />} />
        <Route path="/bookmarks/:id" element={<BookmarkView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
