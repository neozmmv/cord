import Gateway from "../core/Gateway";

const gateway = new Gateway(process.env.TOKEN!);
gateway.connect();