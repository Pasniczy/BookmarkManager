import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getBookmarks } from 'Actions';
import { HomeView } from 'Views/Home/HomeView';
import { BookmarksView } from 'Views/Bookmarks/BookmarksView';
import { BookmarkView } from 'Views/Bookmark/BookmarkView';
import { AddBookmarkView } from 'Views/AddBookmark/AddBookmarkView';
import { EditBookmarkView } from 'Views/EditBookmark/EditBookmarkView';
import { Header } from 'Components/Layout/Header/Header';
import { Container } from 'Components/Layout/Container';
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
