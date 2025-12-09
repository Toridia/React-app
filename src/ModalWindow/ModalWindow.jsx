/*функии:
- взмах вниз и он скрывается
- дату выбранную высвечивает
- изменить событие можно в нем (время, участников, событие)
*/

function ModalWindow(){
    return(
        <div className="Window">
            <div className="DateWeekOrMonth"></div>
            <div className="Title"></div>
            <div className="Description"></div>
            <div className="time"></div>
            <div className="users"></div>

            <button className="PlusEvent"></button>
        </div>
    );
};

export default ModalWindow;