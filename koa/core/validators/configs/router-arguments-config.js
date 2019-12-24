const router_arguments_config = {
    "/v1/:id/classic/latest" : {
        id : {
            rule : val => Math.round(val) === val,
            error : "请求路径错误，如包含数字，数字为整数！"
        },
        query : {
            rule : obj =>{
                console.log(obj);
            },
            error : {

            }
        },
        header : {
            rule : obj =>{

            },
            error : {

            }
        },
        body : {
            rule : obj =>{

            },
            error : {

            }
        }
    }
}
export default router_arguments_config
