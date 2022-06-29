import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomeView } from './views/Home/HomeView';
import { BookmarksView } from './views/Bookmarks/BookmarksView';
import { BookmarkView } from './views/Bookmark/BookmarkView';
import { AddBookmarkView } from './views/AddBookmark/AddBookmarkView';
import { EditBookmarkView } from './views/EditBookmark/EditBookmarkView';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/bookmarks" element={<BookmarksView />} />
        <Route path="/bookmarks/add" element={<AddBookmarkView />} />
        <Route path="/bookmarks/edit/:id" element={<EditBookmarkView />} />
        <Route path="/bookmarks/:id" element={<BookmarkView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
