import express from 'express'

class Helper {

    static printRequest(req: express.Request): void {
        console.log("Request", req.url, req.method);
    }

    static printResponse(res: express.Request): void {
        console.log("Response", res.url, res.statusCode);
    }
}

export default Helper;