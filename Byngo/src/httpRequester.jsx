
const SocketServer = "http://10.0.0.3:2023" //sever service

export const doRequest = (api,body,method="POST") => {
    return fetch(SocketServer+"/"+api,{
        method: method,
        mode: "cors",
        body: JSON.stringify(body)
    });
}
