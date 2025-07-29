import Task from "../TaskModel.js";

const doneTask = async (bot, chatId, msg) => {
    try {
        bot.once("message", async (msg) => {
            if (!msg.text || isNaN(msg.text)) {
                bot.sendMessage(chatId, "Пожалуйста, введите корректный номер задачи.");
                return;
            }
            const task = await Task.findOne({
                where: {
                    id: Number(msg.text),
                }
            });
            if (task) {
                task.done = true;
                await task.save();
                bot.sendMessage(chatId, `✅ Задача с номером ${msg.text} отмечена как выполненная.`);
                console.log(`✅ Задача с номером ${msg.text} отмечена как выполненная для чата ${chatId}`);
            } else {
                bot.sendMessage(chatId, `❌ Задача с номером ${msg.text} не найдена.`);
                console.log(`❌ Задача с номером ${msg.text} не найдена для чата ${chatId}`);
            }
        });
    } catch (error) {
        console.error('Ошибка при отметке задачи как выполненной:', error);
        bot.sendMessage(chatId, "❌ Произошла ошибка при отметке задачи. Пожалуйста, попробуйте еще раз.");
    }
}

export default doneTask;