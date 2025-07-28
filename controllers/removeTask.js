import Task from "../TaskModel.js";
const removeTask = async (bot, chatId, msg) => {
    try {
        bot.once("message", async (msg) => {
            if (!msg.text || isNaN(msg.text)) {
                bot.sendMessage(chatId, "Пожалуйста, введите корректный номер задачи.");
                return;
            }
            await Task.destroy({
                where: {
                    id: msg.text,
                }
            }).then((deletedCount) => {
                if (deletedCount > 0) {
                    bot.sendMessage(chatId, `✅ Задача с номером ${msg.text} успешно удалена.`);
                    console.log(`✅ Задача с номером ${msg.text} удалена для чата ${chatId}`);
                }
                else {
                    bot.sendMessage(chatId, `❌ Задача с номером ${msg.text} не найдена.`);
                    console.log(`❌ Задача с номером ${msg.text} не найдена для чата ${chatId}`);
                }
            });
        });
    }
    catch (error) {
        console.error('Ошибка при удалении задачи:', error);
        bot.sendMessage(chatId, "❌ Произошла ошибка при удалении задачи. Пожалуйста, попробуйте еще раз.");
    }
}

export default removeTask;