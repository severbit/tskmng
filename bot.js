import bot from "./conf.js";
import addTask from "./controllers/addTask.js";
import doneTask from "./controllers/doneTask.js";
import removeTask from "./controllers/removeTask.js";
import showTasks from "./controllers/showTasks.js";
import sequelize from "./db.js";

// Обработчик команды /start
// Отправляет приветственное сообщение пользователю


bot.onText('/start', (msg) => {
    const chatId = msg.chat.id;
    console.log(`Пользователь ${msg.from.username} (${msg.from.id}) запустил бота.`);
    sequelize.sync()
        .then(() => {
            console.log('Модели синхронизированы с базой данных.');
        })
    if (msg.from.id === parseInt(process.env.OWNER_ID, 10)) {
        bot.sendMessage(chatId, "О великий и могучий создатель, ты запустил бота. Я твой личный помощник, чем могу помочь?");
    }
    else {
        bot.sendMessage(chatId, "Привет! Я личный бот для таск менеджера. Напиши /help, чтобы узнать, что я умею. Хотя нахуй тебе это надо, я этого бота только для себя написал)");
    }
});


// Обработчик команды /help
// Отправляет список доступных команд
bot.onText('/help', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "helper text");
});


// Обработчик команды /tasks
// Отправляет список задач пользователю
bot.onText('/tasks', (msg) => {
    const chatId = msg.chat.id;
    showTasks(bot, chatId)
});


// Обработчик команды /addtask
// Запрашивает текст задачи для добавления
bot.onText('/addtask', async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Введите текст задачи:");
    addTask(bot, chatId, msg)
})


// Обработчик команды /removetask
// Удаляет задачу по номеру 
bot.onText('/removetask', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Введите номер задачи для удаления:");
    removeTask(bot, chatId, msg);
})


// Обработчик команды /donetask
// Отмечает задачу как выполненную
bot.onText('/donetask', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Введите номер задачи для отметки как выполненной:");
    doneTask(bot, chatId, msg);
})
