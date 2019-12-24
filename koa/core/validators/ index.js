export default class Validator {
    static initValidator(config, data, test_type = 1) {
        Validator.config = config;
        Validator.data = data;
        Validator.error_length = test_type;
    }

    static test() {
        const {data, config, error_length} = Validator;
        config.err = [];
        for (let key in data) {
            if (config.err === error_length) break;
        }
        return config.err
    }
}