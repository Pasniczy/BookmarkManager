import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getBookmarks } from 'Actions';
import { ViewFlex } from 'Components/Layout/ViewFlex';
import { MainContainer } from 'Components/Layout/MainContainer';
import { HomeView } from 'Views/Home/HomeView';
import { RegisterView } from 'Views/RegisterView/RegisterView';
import { BookmarksView } from 'Views/Bookmarks/BookmarksView';
import { BookmarkView } from 'Views/Bookmark/BookmarkView';
import { AddBookmarkView } from 'Views/AddBookmark/AddBookmarkView';
import { EditBookmarkView } from 'Views/EditBookmark/EditBookmarkView';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ViewFlex>
        <Routes>
          <Route path="/bookmarks" element={<MainContainer />}>
            <Route index element={<BookmarksView />} />
            <Route path="add" element={<AddBookmarkView />} />
            <Route path="edit/:id" element={<EditBookmarkView />} />
            <Route path=":id" element={<BookmarkView />} />
          </Route>
          <Route path="/register" element={<MainContainer />}>
            <Route index element={<RegisterView />} />
          </Route>
          <Route path="/" element={<MainContainer center />}>
            <Route index element={<HomeView />} />
          </Route>
        </Routes>
      </ViewFlex>
    </BrowserRouter>
  );
};

export default App;
