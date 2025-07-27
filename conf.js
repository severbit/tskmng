import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
dotenv.config();

const comands = [
    { command: "/start", description: "🔋 Запустить бота" },
    { command: "/help", description: "💡 Помощь" },
    { command: "/tasks", description: "📄 Список задач" },
    { command: "/addtask", description: "📌 Добавить задачу" },
    { command: "/removetask", description: "🗑 Удалить задачу" },
    { command: "/donetask", description: "✅ Отметить задачу как выполненную" },
    { command: "/undotask", description: "⛔️ Отменить выполнение задачи" },
    { command: "/clearcompleted", description: "🛁 Очистить выполненные задачи" },
    // { command: "/settings", description: "Настройки" },
]
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error("Нет токена бота. Проверь env");
    process.exit(1);
}
// Создаем экземпляр бота
// Используем polling для получения обновлений
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.setMyCommands(comands);


export default bot;
// Экспортируем бота для использования в других модулях