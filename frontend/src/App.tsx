import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { loadUser } from 'Actions';
import { useAppSelector } from 'Hooks/useAppSelector';
import { HomeView } from 'Views/HomeView';
import { RegisterView } from 'Views/RegisterView';
import { LoginView } from 'Views/LoginView';
import { AccountView } from 'Views/AccountView';
import { BookmarksView } from 'Views/BookmarksView';
import { BookmarkView } from 'Views/BookmarkView';
import { AddBookmarkView } from 'Views/AddBookmarkView';
import { EditBookmarkView } from 'Views/EditBookmarkView';
import { CookiesPolicyView } from 'Views/CookiesPolicyView';
import { PrivateRoute } from 'Components/Routing/PrivateRoute';
import { AppContainer } from 'Components/Layout/AppContainer';
import { MainContainer } from 'Components/Layout/MainContainer';
import { Header } from 'Components/Layout/Header/Header';
import { Footer } from 'Components/Layout/Footer';
import { CookieConsent } from 'Components/Common/CookieConsent';
import { CustomAlert } from 'Components/Common/CustomAlert';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const alert = useAppSelector((state) => state.ui.alert);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <MainContainer>
          {alert && <CustomAlert type={alert.type} message={alert.message} />}
          <Routes>
            <Route path="/account" element={<PrivateRoute />}>
              <Route index element={<AccountView />} />
            </Route>
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
            <Route path="/cookies">
              <Route index element={<CookiesPolicyView />} />
            </Route>
            <Route path="/">
              <Route index element={<HomeView />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainContainer>
        <Footer />
        <CookieConsent />
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
