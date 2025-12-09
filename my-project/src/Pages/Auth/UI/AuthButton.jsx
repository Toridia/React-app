
function AuthButton() {
    return (
        <div className='btn-style'>
            <button className='App-btn' style={{ color: 'white' }}>Войти</button>
            <a className='link' style={{ fontSize: "10px" }}>забыли пароль?</a>

            <button className='App-btn' style={{ color: 'white', backgroundColor: '#D9D9D9', border: '#D9D9D9', }}>Зарегистрироваться</button>
        </div>
    );
};

export default AuthButton;