const catch_error = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        ctx.body = "出现未知错误，请稍等，，，";
    }
};

export default catch_error;