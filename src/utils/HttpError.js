class HttpError extends Error {
    constructor (status, message, data){
        super(status);
        this.status = status || 500;
        this.message = message;
        this.data = data;
    }
}

module.exports = HttpError