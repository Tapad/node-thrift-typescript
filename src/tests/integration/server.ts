import {
  createWebServer,
  TBinaryProtocol,
  TBufferedTransport,
} from 'thrift'

import * as MyService from './thrift/test'

//ServiceHandler: Implement the hello service
const myServiceHandler = {
  ping(status: string): string {
    return `${status}: goodbye`
  }
};

//ServiceOptions: The I/O stack for the service
const myServiceOpts = {
    handler: myServiceHandler,
    processor: MyService,
    protocol: TBinaryProtocol,
    transport: TBufferedTransport
};

//ServerOptions: Define server features
const serverOpt = {
   services: {
      "/": myServiceOpts
   }
}

//Create and start the web server
const port: number = 8080;
createWebServer(serverOpt).listen(port, () => {
  console.log(`Thrift server listening on port ${port}`)
});
