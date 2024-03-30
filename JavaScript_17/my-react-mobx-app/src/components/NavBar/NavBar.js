import React from 'react';
import css from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <div className={css.NavBar}>
            <Link to="/users">Пользователи</Link>
            <Link to="/tasks">Задачи</Link>
        </div>
    );
};

export default NavBar;