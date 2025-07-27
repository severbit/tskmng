import { Sequelize } from "sequelize"
import dotenv from "dotenv";
dotenv.config();

// Создаем подключение к базе данных
const sequelize = new Sequelize(
    process.env.PG_PUBLIC_URL ,
    {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        logging: false, // Отключаем логирование SQL-запросов
        // Увеличиваем время ожидания для получения соединения
        // Это может помочь избежать ошибок при высокой нагрузке
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Соединение с базой данных успешно установлено.');
    })
    .catch(err => {
        console.error('Не удалось подключиться к базе данных:', err);
    });

export default sequelize;
// Экспортируем sequelize для использования в других модулях