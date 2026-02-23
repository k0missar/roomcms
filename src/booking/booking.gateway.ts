import { Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
@Injectable()
export class BookingGateway {
  private readonly logger = new Logger(BookingGateway.name);

  @WebSocketServer()
  server: Server;

  broadcastBookingUpdated(payload: {
    bookingId: string;
    roomId: string;
    status: string;
  }) {
    this.logger.log(`broadcastBookingUpdated: ${JSON.stringify(payload)}`);
    this.server.emit('booking:updated', payload);
  }

  broadcastBookingDeleted(payload: { bookingId: string; roomId: string }) {
    this.logger.log(`broadcastBookingDeleted: ${JSON.stringify(payload)}`);
    this.server.emit('booking:deleted', payload);
  }
}
