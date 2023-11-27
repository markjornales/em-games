 
export default class ThrowException {
    private readonly errorMessages: {[statusCode: number]: string} = {
        400:  "System is down please try again later.",
        401: "Unauthorize Login. to access this feature, please log in to your account.",
        422: "Unable to open this game please choose another game or try again click same game. thank you!",
        500: "Server is Busy, Please try again later.",
    }
    public handleError (response: number): void {
        const statusCode = response;
        const errorMessage = this.errorMessages[statusCode];
        if(!errorMessage) {
            throw {message: `Unknown error status code: ${statusCode}`}
        }
        throw {message: errorMessage}
    }
}