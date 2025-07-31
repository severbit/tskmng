import Task from "../TaskModel.js";

const showTasks = async (bot, chatId) => {
    try {
        const tasks = await Task.findAll({
            order: [['id', 'ASC']]
        })
        if (tasks.length === 0) {
            bot.sendMessage(chatId, "Список задач пуст.");
            return false;
        }
        let message = "Список задач:\n";
        tasks.forEach((task, index) => {
            message += `${task.id}. ${task.text} - ${task.done ? "Выполнена ✅" : "Не выполнена ⏳"}\n`;
        });
        bot.sendMessage(chatId, message);
        console.log(`✅ Задачи для чата ${chatId} успешно получены.`);
        return tasks
    } catch (error) {
        console.error('Ошибка при получении задач:', error);
        bot.sendMessage(chatId, "❌ Произошла ошибка при получении задач. Пожалуйста, попробуйте еще раз.");
    }
}


export default showTasks;