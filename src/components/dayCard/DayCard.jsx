export const DayCard = function ({ day, icon, temperature}) {
    return (
        <div>
            <div className="w-30 flex flex-col items-center rounded-2xl shadow-2xl drop-shadow-lg p-3 md:p-4 hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" >
                <div className="text-xs md:text-sm font-semibold text-gray-700 text-center">{day}</div>
                <img src={icon} className="h-12 w-12" />
                <div className="text-xs md:text-sm text-gray-700 text-center">{temperature}&deg;C</div>
            </div>
        </div>
    )
}