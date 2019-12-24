export default class Validator {
    constructor(config, data, test_type = 1) {
        this.config = config;
        this.data = data;
        this.error_length = test_type;
    }

    static test() {
        const {data, config, error_length} = this;
        const err = [];
        for (let key in data) {
            if (config.err === error_length) break;
        }
        this.results =  err
    }
}