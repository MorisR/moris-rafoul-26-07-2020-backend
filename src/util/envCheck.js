module.exports = exports ={

    get inTesting() {
        return exports.isInTesting();
    },

    get inProduction() {
        return exports.isInProduction();
    },

    get inDevelopment() {
        return exports.isInDevelopment();
    },


    isInTesting () {
        return  ["testing", "test"].includes((process.env.NODE_ENV || "").toLowerCase());
    },

    isInProduction () {
        return   ["product", "pro", "prod", "production"].includes((process.env.NODE_ENV || "").toLowerCase());
    },

    isInDevelopment() {
        return ["development", "dev", "developing"].includes((process.env.NODE_ENV || "").toLowerCase());
    },


}