import React, { useState } from 'react';
import css from './AddUser.module.css';
import userStore from '../../store/UsersStore';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        userStore.addUser({ id: Date.now(), name, email });
        setName('');
        setEmail('');
    };

    return (
        <form className={css.AddUser} onSubmit={handleSubmit}>
            <h2>Добавление пользователя</h2>
            <input
                type="text"
                value={name}
                placeholder="Имя"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Добавить</button>
        </form>

    );
};

export default AddUser;