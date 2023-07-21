export default class ResponseEntity {
    constructor({statusCode, statusMessage, result}) {
        this.statusCode = statusCode
        this.statusMessage = statusMessage
        this.result = result
    }
}