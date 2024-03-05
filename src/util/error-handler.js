const asyncWrapper = (fn) => {
    return async function (ctx, next) {
        try {
            return await fn(ctx);
        } catch (error) {
            console.log(error);
            await ctx.reply("Упс... Что-то пошло не так");
            return next();
        }
    };
};

export default asyncWrapper;
