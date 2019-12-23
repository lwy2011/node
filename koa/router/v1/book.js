import router from "../index";


router.get("/book", (ctx) => {
    ctx.body = {src: "book"};
});


export default router;