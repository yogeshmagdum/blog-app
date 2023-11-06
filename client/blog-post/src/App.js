// import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import {UserContextProvider} from './UserContext';
import CreatePost from './components/CreatePost';
import MyBlogs from './components/MyBlogs';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={ <Layout />} >
          <Route index element={ <IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/create"} element={<CreatePost />} />
          <Route path={"/myblog"} element={<MyBlogs />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
