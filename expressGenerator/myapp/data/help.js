//模拟数据库而已


const dataBase = [];

module.exports =  {
    isReg({name, password}) {
        console.log(dataBase,name,password);
        const test = dataBase.filter(obj => obj.name === name).length;
        !test && dataBase.push({name, password});
        return test;
    },
    test({name, password}) {
        console.log(dataBase,name,password,dataBase.filter((obj) => obj.name === name ).length);
        if(dataBase.filter((obj) => obj.name === name ).length === 0)
            return "用户名不存在！";
        return dataBase.filter((obj) => obj.name === name && obj.password === password).length;
    }
};



