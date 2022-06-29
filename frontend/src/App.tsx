import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomeView } from './views/Home/HomeView';
import { BookmarksView } from './views/Bookmarks/BookmarksView';
import { BookmarkView } from './views/Bookmark/BookmarkView';
import { AddBookmarkView } from './views/AddBookmark/AddBookmarkView';
import { EditBookmarkView } from './views/EditBookmark/EditBookmarkView';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="bookmarks">
          <Route index element={<BookmarksView />} />
          <Route path="add" element={<AddBookmarkView />} />
          <Route path="edit/:id" element={<EditBookmarkView />} />
          <Route path=":id" element={<BookmarkView />} />
        </Route>
        <Route index element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
