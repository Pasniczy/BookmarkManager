import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loadUser } from 'Actions';
import { ViewFlex } from 'Components/Layout/ViewFlex';
import { MainContainer } from 'Components/Layout/MainContainer';
import { HomeView } from 'Views/HomeView';
import { RegisterView } from 'Views/RegisterView';
import { LoginView } from 'Views/LoginView';
import { AccountView } from 'Views/AccountView';
import { BookmarksView } from 'Views/BookmarksView';
import { BookmarkView } from 'Views/BookmarkView';
import { AddBookmarkView } from 'Views/AddBookmarkView';
import { EditBookmarkView } from 'Views/EditBookmarkView';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
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
          <Route path="/login" element={<MainContainer />}>
            <Route index element={<LoginView />} />
          </Route>
          <Route path="/account" element={<MainContainer />}>
            <Route index element={<AccountView />} />
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
