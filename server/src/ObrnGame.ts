import Phaser from "phaser";
import geckos, { GeckosServer, ServerChannel, Data } from '@geckos.io/server';
import { ServerGameMetaData } from "./Interfaces";

export default class ObrnGame extends Phaser.Game {
    private readonly port: number;
    private io!: GeckosServer;

    constructor(port: number, GameConfig?: Phaser.Types.Core.GameConfig)
    {
        super(GameConfig);
        this.port = port;
    }

    getMetadata(): ServerGameMetaData {
        return {
            port: this.port
        };
    }

    start() {
        this.io = geckos({
        // iceServers: process.env.NODE_ENV === 'production' ? iceServers : []
        iceServers: []
        });

        this.io.onConnection((channel: ServerChannel) => {
            console.log("Somebody connected to channel id: " + channel.id + " room:" + channel.roomId)
            // the channel's id and maxMessageSize (in bytes)
            // const { id, maxMessageSize } = channel;
          
            // whenever the channel got disconnected
            // the reason will be 'disconnected', 'failed' or 'closed'
            channel.onDisconnect((reason: any) => {
                console.log("disconnected");
            });
          
            // listen for a custom event
            // channel.on('chat message', (data: Data) => {})
          
            // channel joins a room
            channel.join('someRoomId');
          
            // channel leaves a room
            channel.leave();
          
            // channel closes the webRTC connection
            channel.close();
          
            // get notified when a message got dropped
            channel.onDrop((drop: any) => {
                console.log("dropped");
            });
          
            // will trigger a specific event on all channels in a
            // specific room and add the senderId as a second parameter
            // channel.forward(channel.roomId).emit('chat message', 'Hello!')
          
            // listen for a forwarded message
            // channel.on('chat message', (data: any, senderId: any) => {
            //   // we know that the message was forwarded if senderId is defined
            //   if (senderId) {
            //     // ...
            //   } else {
            //     // ...
            //   }
            // });

            // // emits a message to the channel
            // channel.emit('chat message', 'Hello to myself!')

            // // emits a message to all channels, in the same room
            // channel.room.emit('chat message', 'Hello everyone!')

            // // emits a message to all channels, in the same room, except sender
            // channel.broadcast.emit('chat message', 'Hello friends!')

            // // emits a message to all channels
            // io.emit('chat message', 'Hello everyone!')

            // // emits a message to all channels in a specific room
            // // (if you do not pass a roomId, the message will be sent to everyone who is not in a room yet)
            // io.room(roomId).emit('chat message', 'Hello everyone!')
          })
        this.io.listen(this.port);
        console.log("Started game on port: " + this.port);
    }
}