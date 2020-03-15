function isThisType(val) {
    for (let key in this) {
        // console.log(val,this[key],val === this[key],555,typeof val);
        if (this[key] === val) return true;
    }
    return false;
}


const LoginType = {
    user_mini_program: 100,
    user_email: 101,
    user_phone: 102,
    admin_email: 103,
    isThisType
};


const ClassicType = {
    music: 200,
    movie: 100,
    sentence: 300,
    book: 400,
    isThisType
};
export default LoginType;
export {ClassicType};