const asyncWrapper = (fn) => {
    return async function (ctx, next) {
        try {
            return await fn(ctx);
        } catch (error) {
            console.log(error);
            await ctx.reply(ctx.i18n.t("errors.unknown"));
            return next();
        }
    };
};

export default asyncWrapper;
