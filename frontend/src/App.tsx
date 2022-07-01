import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getBookmarks } from './actions/bookmarks';
import { HomeView } from './views/Home/HomeView';
import { BookmarksView } from './views/Bookmarks/BookmarksView';
import { BookmarkView } from './views/Bookmark/BookmarkView';
import { AddBookmarkView } from './views/AddBookmark/AddBookmarkView';
import { EditBookmarkView } from './views/EditBookmark/EditBookmarkView';
import { Header } from './components/Layout/Header/Header';
import { Container } from './components/Layout/Container';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/bookmarks" element={<Container />}>
          <Route index element={<BookmarksView />} />
          <Route path="add" element={<AddBookmarkView />} />
          <Route path="edit/:id" element={<EditBookmarkView />} />
          <Route path=":id" element={<BookmarkView />} />
        </Route>
        <Route path="/" element={<Container />}>
          <Route index element={<HomeView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
