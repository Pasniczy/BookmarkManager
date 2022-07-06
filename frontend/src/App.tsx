import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from 'Components/routing/PrivateRoute';
import { loadUser } from 'Actions';
import { AppContainer } from 'Components/Layout/AppContainer';
import { MainContainer } from 'Components/Layout/MainContainer';
import { Header } from 'Components/Layout/Header/Header';
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
      <AppContainer>
        <Header />
        <MainContainer>
          <Routes>
            <Route path="/bookmarks" element={<PrivateRoute />}>
              <Route index element={<BookmarksView />} />
              <Route path="add" element={<AddBookmarkView />} />
              <Route path="edit/:id" element={<EditBookmarkView />} />
              <Route path=":id" element={<BookmarkView />} />
            </Route>
            <Route path="/register">
              <Route index element={<RegisterView />} />
            </Route>
            <Route path="/login">
              <Route index element={<LoginView />} />
            </Route>
            <Route path="/account" element={<PrivateRoute />}>
              <Route index element={<AccountView />} />
            </Route>
            <Route path="/">
              <Route index element={<HomeView />} />
            </Route>
          </Routes>
        </MainContainer>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
