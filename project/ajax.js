import axios from "axios";

const ajax = (url, method, ...rest) => {
    return axios(
        {
            method,
            url,
            baseURL:'localhost:3000',
            ...rest
        }
    ).then(
        res=>{
            return res
        }
    ).catch(
        e=>{throw e}
    );
};
export default ajax;
