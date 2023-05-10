export default class ResponseEntity {
    constructor({statusCode, statusMessage, resultMap}) {
        this.statusCode = statusCode
        this.statusMessage = statusMessage
        this.resultMap = resultMap
    }
}