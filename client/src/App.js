import { Container } from 'react-bootstrap';
import TeaPicker from './components/TeaPicker.js';
import Topbar from './components/Topbar.js'
import Teas from './components/Teas.js';
import Vessels from './components/Vessels.js';
import Sessions from './components/Sessions.js';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Settings from './components/Settings.js';
import { TeaProvider } from './contexts/TeaContext.js';
import {VesselProvider} from "./contexts/VesselContext.js";
import {SessionProvider} from "./contexts/SessionContext.js";
import {AuthProvider, useAuth} from "./contexts/AuthContext.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ForgotPassword from "./components/ForgotPassword.js";

function RequireAuth({ children, redirectTo, isAuth }) {
  const {loggedIn } = useAuth();
  let toRender = isAuth? !loggedIn : loggedIn
  return toRender ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <>
      <Container> 
        <Router>
          <AuthProvider>
            <Topbar />
            <TeaProvider>
              <VesselProvider>
                <SessionProvider>
                  <Routes>
                    <Route exact path="/" element={
                      <RequireAuth redirectTo={"/login"}><TeaPicker /></RequireAuth>
                    } />
                    <Route path="/teas" element={
                      <RequireAuth redirectTo={"/login"}><Teas /></RequireAuth>
                    } />
                    <Route path="/vessels" element={
                      <RequireAuth redirectTo={"/login"}><Vessels /></RequireAuth>
                    } />
                    <Route path="/sessions" element={
                      <RequireAuth redirectTo={"/login"}><Sessions /></RequireAuth>
                    } />
                    <Route path="/settings" element={
                      <RequireAuth redirectTo={"/login"}><Settings /></RequireAuth>
                    } />
                    <Route path="/login" element={
                      <RequireAuth redirectTo={"/"} isAuth={true}><Login /></RequireAuth>
                    } />
                    <Route path="/signup" element={
                      <RequireAuth redirectTo={"/"} isAuth={true}><Signup /></RequireAuth>
                      } />
                    <Route path="/forgot-password" element={
                      <RequireAuth redirectTo={"/"} isAuth={true}><ForgotPassword /></RequireAuth>
                      } />
                  </Routes>
                </SessionProvider>
              </VesselProvider>
            </TeaProvider>
          </AuthProvider>
        </Router>
      </Container>
    </>
  );
}

export default App;
