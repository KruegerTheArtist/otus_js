import React from 'react';
import { observer } from "mobx-react";
import css from './UsersList.module.css';
import userStore from '../../store/UsersStore';
import UserCard from '../../components/UserCard/UserCard';

const UserList = observer(() => (
    <div className={css.UsersContainer}>
        <span className={css.UsersTitle}>Список пользователей</span>
        <div className={css.UsersList}>
            {userStore.users.map(user => (
                <div key={user.id}>
                    <UserCard user={user} />
                </div>
            ))}
        </div>
    </div>
));

export default UserList;