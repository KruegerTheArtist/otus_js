import css from './UserProfile.module.css';
import userStore from '../../store/UsersStore';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
const UserProfile = observer(() => {
    const { id } = useParams();

    const user = userStore.users?.find(u => u.id === Number(id));
    console.log(userStore.users.map(user => user.id));
    console.log(user); function getCurrentUserInfo() {
        if (!user) {
            return <div>User not found</div>;
        } else {
            return (
                <div className={css.UserInfo}>
                    {
                        userStore.users.length === 0 && !user ? (<><div>Пользователь не найден</div></>) : (<>
                            <div className={css.Row + ' ' + css.Name}>
                                <span className={css.Name}>
                                    {user.name}
                                </span>
                            </div>
                            <div className={css.Row}>
                                <span className={css.RowTitle}>
                                    Email:
                                </span>
                                <span>
                                    {user.email}
                                </span>
                            </div>
                            <div className={css.Row}>
                                <span className={css.RowTitle}> Рейтинг: <span className={css.Rating}>{user.rating}</span></span>
                            </div>
                        </>)
                    }
                </div>
            )
        }
    }


    return (
        <div className={css.FullWidth}>
            {
                getCurrentUserInfo()
            }
        </div>
    )
});

export default UserProfile;