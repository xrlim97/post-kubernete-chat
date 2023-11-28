const WEB_SOCKET_PORT = process.env.REACT_APP_WS_PORT || undefined;
const WEB_SOCKET_DOMAIN = process.env.REACT_APP_WS_DOMAIN || undefined;

if(WEB_SOCKET_DOMAIN === undefined && WEB_SOCKET_PORT === undefined){
    throw Error("domain and port undefined")
}

var WS_DOMAIN = '';

if(WEB_SOCKET_DOMAIN !== undefined){
    WS_DOMAIN = WEB_SOCKET_DOMAIN;
}else if(WEB_SOCKET_PORT !== undefined){
    //use local host to test
    WS_DOMAIN = `localhost:${WEB_SOCKET_PORT}`
}


export {
    WS_DOMAIN
};