import bot from "./conf.js";
import addTask from "./controllers/addTask.js";
import doneTask from "./controllers/doneTask.js";
import removeTask from "./controllers/removeTask.js";
import showTasks from "./controllers/showTasks.js";
import sequelize from "./db.js";
import cron from "node-cron";

bot.onText('/start', (msg) => {
    const chatId = msg.chat.id;
    console.log(`Пользователь ${msg.from.username} (${msg.from.id}) запустил бота.`);
    sequelize.sync()
        .then(() => {
            console.log('Модели синхронизированы с базой данных.');
        });

    if (msg.from.id === parseInt(process.env.OWNER_ID, 10)) {
        bot.sendMessage(chatId, "О великий и могучий создатель, ты запустил бота. Я твой личный помощник, чем могу помочь?");
    } else {
        bot.sendMessage(chatId, "Привет! Я личный бот для таск менеджера. Напиши /help, чтобы узнать, что я умею. Хотя нахуй тебе это надо, я этого бота только для себя написал)");
    }
});

bot.onText('/help', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Список команд:\n/addtask — добавить задачу\n/tasks — показать задачи\n/removetask — удалить задачу\n/donetask — отметить задачу выполненной\n/scheduler — включить/выключить ежедневные напоминания");
});

bot.onText('/tasks', (msg) => {
    const chatId = msg.chat.id;
    showTasks(bot, chatId);
});

bot.onText('/addtask', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Введите текст задачи:");
    addTask(bot, chatId, msg);
});

bot.onText('/removetask', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Введите номер задачи для удаления:");
    removeTask(bot, chatId, msg);
});

bot.onText('/donetask', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Введите номер задачи для отметки как выполненной:");
    doneTask(bot, chatId, msg);
});

bot.onText('/scheduler', async (msg) => {
    const chatId = msg.chat.id;

    const task = cron.schedule('0 9,21 * * *', async () => {
        await showTasks(bot, chatId);
    }, {
        timezone: "Asia/Almaty" // измени на свою зону
    });
    bot.sendMessage(process.env.OWNER_ID, 'Автоматическое уведомление включено')
});
