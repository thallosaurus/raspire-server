var fs = require("fs");

var instance;
var port, http, io;
var id, mSock;
var clients = {};
//let port, http, io;
class Server
{
    constructor(p)
    {
        if (!instance)
        {
            console.log("raspire -b1 by moshi86");
            port = p;
            http = require('http').createServer(function(req, res) {
                fs.readFile(__dirname + '/debugController.html',
                function(err, data)
                {
                    res.writeHead(200);
                    res.end(data);
                });
            });
            io = require("socket.io")(http);
            this._bind(port);
            instance = this;
        }
        this.setupHooks();
    }

    takeAction(data, socket, callback)
    {

        /* Returns the following data:
        *  {
        *   event: socketio event name:
        *   response: takeAction() [return value of this function]
        * }
        */

        /* Sent action:
        *  {
        *   cmd: command
        *   arg: argument
        * }
        */

        let returnData = {
            event: 0,
            response: 0,
            to: 0
        }
        returnData['to'] = socket.id;
        if (data.cmd == "ping")
        {
            returnData['event'] = "pingback"
            returnData['response'] = "pingback received";
        } else {
            //TODO implement https security here
            //TODO implement functions here
            switch(data.cmd)
            {
                case "authentication":
                //store client and user hash
                    if (id == undefined || id == 0)
                    {
                        if (data.arg == 0) {
                            //TODO error
                            console.log('no user id specified');
                        } else {
                            console.log('New Connection with ' +
                            '\n\t- Id: '+ data.arg);
                            id = socket.id;
                            returnData['event'] = 'connection_done';
                            returnData['response'] = 'done';
                        }
                        //Wenn schon verbindung vorhanden ist:
                        //kick()
                    }
                    //console.log("[TODO] userconnect is not available ATM. Use 'command' instead");
                    //returnData['event'] = 'unimplementedFunc';
                    //returnData['response'] = "userconnect is not available ATM. Use 'command' instead"
                break;

                case "message":
                    if (id != undefined) //if no connection is setup, no messages should come through
                    {
                        console.log(id);
                        console.log(data.arg);
                        returnData['response'] = data.arg;
                        returnData['event'] = 'server_data'
                    } else {
                        returnData['response'] = 'No connection was made.'
                        returnData['event'] = 'server_data';
                        console.log("No client connected");
                    }
                break;
            }
        }
        callback(returnData);
        return returnData;
    }

    setupHooks()
    {
        io.on('connection', (socket) => {
            console.log('unauthenticated device connected: ' + socket.id);
            console.log("id: " + id);
            socket.on('data', (d) => {
                var r = this.takeAction(d, socket, function (d) {
                    console.log(d);
                });
                io.to(r['to']).emit(r['event'], r['response']);
            });
            socket.on('disconnect', function(e) {
                //console.log(id);
                console.log("Good-Bye from " + id);
                id = undefined;
                instance = undefined;
            });
        });
    }

    _bind(port)
    {
        http.listen(port, function() {
            console.log("Running on port :" + port);
        });
    }
}

var s = new Server(3000);