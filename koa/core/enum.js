function isThisType(val) {
    for (let key in this) {
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


export default LoginType;