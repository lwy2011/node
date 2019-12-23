import router from "../index";


router.get("/classic", (ctx) => {
    ctx.body = {src: "classic"};
});


export default router;