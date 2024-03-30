import { useState } from 'react';
import css from './UserCard.module.css';
import svgEdit from '../../assets/img/edit.svg';
import svgGoto from '../../assets/img/goto.svg';
import userStore from '../../store/UsersStore';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
const UserCard = observer(({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newRating, setNewRating] = useState(user.rating);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        userStore.setRating(user.id, parseInt(newRating, 10));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewRating(user.rating);
        setIsEditing(false);
    };

    return (
        <div className={css.UserInfo}>
            <div className={css.Row + ' ' + css.Name}>
                <span className={css.Name}>
                    {user.name}
                </span>
                <Link to={`/users/${user.id}`}><img className={css.EditButton} src={svgGoto} alt="edit" onClick={handleEdit} /></Link>
            </div>
            <div className={css.Row}>
                <span className={css.RowTitle}>
                    Email:
                </span>
                <span>
                    {user.email}
                </span>
            </div>
            {isEditing ? (
                <>
                    <div className={css.Row}>
                        <input
                            type="number"
                            value={newRating}
                            onChange={(e) => setNewRating(e.target.value)}
                        />
                        <div className={css.RatingButtons}>
                            <button onClick={handleSave}>Ок</button>
                            <button onClick={handleCancel}>Отмена</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={css.Row}>
                        <span className={css.RowTitle}> Рейтинг: <span className={css.Rating}>{user.rating}</span></span>
                        <img className={css.EditButton} src={svgEdit} alt="edit" onClick={handleEdit} />
                    </div>
                </>
            )}
            <button onClick={() => userStore.removeUser(user.id)}>Удалить</button>
        </div>
    );
});

export default UserCard;