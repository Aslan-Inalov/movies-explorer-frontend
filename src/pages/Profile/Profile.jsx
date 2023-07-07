import './Profile.css';
import { useContext, useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Profile = ({ onSignOut, onUpdateUser, apiErrors }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, setValues } =
        useFormAndValidation();

    useEffect(() => {
        if (currentUser) {
            setValues(currentUser);
        }
    }, [currentUser, setValues]);

    const handleSumbitSetUserInfo = (e) => {
        e.preventDefault();
        onUpdateUser(values);
    };

    return (
        <main className="profile-page">
            <section className="auth profile">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form className="profile-form" onSubmit={handleSumbitSetUserInfo}>
                    <label className="profile-form__label">
                        Имя
                        <input
                            className="profile-form__input profile-form__input_type_name"
                            type="text"
                            name="name"
                            value={values.name || ''}
                            onChange={handleChange}
                            placeholder="Введите имя"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                    </label>
                    <span className="profile-form__input-error">{errors.name}</span>
                    <label className="profile-form__label">
                        Email
                        <input
                            className="profile-form__input profile-form__input_type_email"
                            type="email"
                            name="email"
                            value={values.email || ''}
                            onChange={handleChange}
                            placeholder="Введите почту"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                    </label>
                    <span className="profile-form__input-error">{errors.email}</span>
                    <div className="profile-form__submit-container">
                        {apiErrors.profile && (
                            <span className="profile-form__error-message">
                                {apiErrors.profile.errorText === 'Validation failed'
                                    ? apiErrors.profile.joiMessage
                                    : apiErrors.profile.errorText}
                            </span>
                        )}
                        <button
                            disabled={!isValid}
                            className="profile-form__button profile-form__button-edit"
                        >
                            Редактировать
                        </button>
                        <button
                            onClick={onSignOut}
                            className="profile-form__button profile-form__button-signout"
                        >
                            Выйти из аккаунта
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Profile;