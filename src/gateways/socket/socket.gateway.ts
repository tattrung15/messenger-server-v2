import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ transports: ["websocket"], cors: true })
export class SocketGateway {}
