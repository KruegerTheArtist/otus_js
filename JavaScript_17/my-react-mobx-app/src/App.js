import './App.css';
import css from './App.module.css';
import AddTask from './components/AddTask/AddTask';
import TasksList from './containers/tasks/TasksList';
import { BrowserRouter, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { Route } from 'react-router-dom';
import AddUser from './components/AddUser/AddUser';
import UserList from './containers/UsersList/UsersList';
import UserProfile from './components/UserProfile/UserProfile';
import TaskDetails from './components/TaskDetails/TaskDetails';

function App() {
  return (
    <BrowserRouter>
        <NavBar></NavBar>
      <Routes>
        <Route path="/users/:id" element={
          <>
            <UserProfile />
          </>
        } />
        <Route path="/users" element={
          <>
          <div className={css.Body}>
            <AddUser />
            <UserList />
          </div>
          </>
        } />
        <Route path="/tasks/:id" element={
          <>
            <TaskDetails />
          </>
        } />
        <Route path="/tasks" element={
          <>
          <div className={css.Body}>
            <AddTask />
            <TasksList />
          </div>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
