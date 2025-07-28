import Task from "../TaskModel.js";
const addTask = async (bot, chatId, msg) => {
    try {
        bot.once('message', async (msg) => {
            const task = await Task.create({
                chatId: chatId,
                text: msg.text,
                done: false
            })
            bot.sendMessage(chatId, "Задача добавлена! \nТекст задачи: " + msg.text + "\nНомер задачи: " + task.id);
            console.log(`✅ Задача добавлена: ${task.text} для чата ${chatId}`);
        })
    } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
        bot.sendMessage(chatId, "❌ Произошла ошибка при добавлении задачи. Пожалуйста, попробуйте еще раз.");
    }
}

export default addTask;