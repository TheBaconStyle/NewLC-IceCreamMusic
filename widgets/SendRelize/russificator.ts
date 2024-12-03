
const rusText = {
    language: 'Язык', 
    title: "Название релиза", 
    type: "Тип релиза", 
    genre: "Жанр",
    platforms: "Платформы",
    area: "Территории",
    preview: "Обложка релиза",
    releaseDate: "Дата релиза",
    startDate: "Дата старта",
    preorderDate: "Дата предзаказа"
}

export default function russificator (engArray: string[]): string {
    const rusArray: string[] = [];
    engArray.forEach((e) => {e in rusText ? rusArray.push(rusText[e]) : rusArray.push(e)})
    rusArray.join(',  ');
    return `Некорректный ввод данных в полях: ${rusArray}`
}