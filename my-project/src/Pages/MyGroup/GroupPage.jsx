import { useState } from 'react';
import styled from 'styled-components'

/*
Страница мои группы после нажатия на группу

- Стрелочка отправляет назад

- Название группы можно менять
- Число участников меняется от количества userов  

- Кнопка "Добавить участников"
- Кнопка "Перейти к календарю"
 
- Имя userа можно менять при нажатии на него
- Цвет вместо аватарки с буквой
- Картинка группы можно менять

- кнопки навигации добавить
*/

function Group() {
    const {title, setTitle} = useState()
    const {name, setName} = useState()
    const {color, setColor} = useState()

    return (
        <div className='group'>

            <div className='header'>
                <div className='arrow' style={{color: 'white', fontSize: '10px'}}>←</div>
                
                <div className='nameGroup'>
                    <div className="title" onClick={()=> setTitle(title)} style={{}}>
                        <input className='inputGroup'>Введите название группы</input>
                    </div>
                </div>

                <div className='countUser'></div>

                <div className='btnGroup'>
                    <button style={{backgroundColor: '605B73', color: 'white'}}>+ добавить участников</button>
                    <button style={{backgroundColor: '605B73', color: 'white'}}>перейти к календарю</button>
                </div>
                
            </div>

            <div className='users'>
                <div className='userColor'>
                    <div className="color" onClick={()=> setColor(color)} style={{backgroundColor: () => {color}}}></div>
                </div>

                <div className='userName'>
                    <div>
                        <div className="name" onClick={()=> setName(name)} style={{fontSize: '10px', color: 'black'}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Group;