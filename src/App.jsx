import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import CommonLayout from './components/CommonLayout';
import { ThemeProvider } from '@primer/react';
import { ProfileProvider } from './context/profile.context';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import NewToken from './pages/User/NewToken';
import Document from './pages/docs/Document';
import LazyLoad from './components/LazyLoad';
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const Application = React.lazy(() => import('./pages/Application'));
function App() {
  return (
    <HashRouter>
      <ThemeProvider colorMode="auto">
        <ProfileProvider>
          <CommonLayout>
            <Routes>
              <Route element={<LazyLoad element={<PrivateRoutes />} />}>
                <Route element={<AdminRoutes />}>
                  <Route path="/admin" element={<Dashboard />} />
                </Route>
                <Route path="/" element={<Application />} />
                <Route path="/user/newtoken" element={<NewToken />} />
              </Route>
              <Route element={<LazyLoad element={<PublicRoutes />} />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route
                path="/docs/:docname"
                element={<LazyLoad element={<Document />} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CommonLayout>
        </ProfileProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;