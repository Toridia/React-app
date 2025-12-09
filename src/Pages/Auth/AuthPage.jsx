import AuthInput from "./UI/AuthInput";
import AuthButton from "./UI/AuthButton";

/*Функции:
- ввод логина и пароля
- "забыли пароль" ссылка на сброс пароля
- кнопка зарегистрироваться отправляет данные пользователя в базу, чтобы он мог войти с этими данными
*/

function AuthPage() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Title>LITMO</Title>
                <a className="App-link"></a>
            </header>

            <div className='Auth'>
                <AuthInput></AuthInput>
                <AuthButton></AuthButton>

            </div>
        </div>

    );
};

export default AuthPage;