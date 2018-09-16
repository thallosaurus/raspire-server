var data, socket, callback;
var res = {
    event: 0,
    response: 0,
    to: 0
}

module.export = class ResponseHandler() {
    constructor(d, s, c)
    {
        data = d;
        socket = s;
        c = callback;
    }

    
}

/*
* takeAction(data, socket, callback)
    {

        /* Returns the following data:
        *  {
        *   event: socketio event name:
        *   response: takeAction() [return value of this function]
        * }
        
       let returnData = {
        event: 0,
        response: 0,
        to: 0
    }
    returnData['to'] = socket.id;
    if (data.cmd == "ping")
    {
        returnData['event'] = "pingback"
        returnData['response'] = "pingback";
    } else {
        //TODO implement https security here
        //TODO implement functions here
        switch(data.cmd)
        {
            case "connect":
            //store client and user hash
                /*if (id != undefined || id != 0)
                {
                    //Wenn schon verbindung vorhanden ist:
                    //kick()
                    
                }
                console.log("[TODO] userconnect is not available ATM. Use 'command' instead");
                returnData['event'] = 'unimplementedFunc';
                returnData['response'] = "userconnect is not available ATM. Use 'command' instead"
                break;
        }
    }
    callback(returnData);
    return returnData;
}
*/