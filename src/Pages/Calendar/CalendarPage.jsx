
/*функции:
- календарь при движении вверх по нему уменьшается до одной строчки
- добавление событий
- при нажатии на месяц и год можно выбрать их
- при нажатии на событие его можно изменять и удалять
- при выборе дня показывается события на этот день
- смах влево и вправо это переход по месяцам
*/

function CalendarPage() {
    return (
        <div className="Calendar">
            <div className="NameCalendar">Название календаря</div>
            <button className="Plus"></button>
            <div className="NameMonth_Year">
                <div className="DaysOfWeek"></div>
                <div className="NumberOfDays"></div>
            </div>

            <div className="Events">
                <div className="NameEvents">События этой недели</div>

                <div className="TitleEvent">Описание события</div>
                <div className="DescriptionEvent"></div>
                <div className="DateTime">8:45 - 9:00 AM</div>
                <div className="UsersEvent"></div>
            </div>
        </div>
    );
};

export default CalendarPage;