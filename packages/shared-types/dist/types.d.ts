export interface Point {
    x: number;
    y: number;
}
export interface DrawData {
    id: string;
    points: Point[];
    color: string;
    strokeWidth: number;
    tool: 'pen' | 'eraser';
    userId: string;
    userName: string;
}
export interface UserCursor {
    userId: string;
    userName: string;
    position: Point;
}
export interface ShareCodeData {
    roomId: string;
    expiresAt: number;
}
export interface RoomData {
    id: string;
    ownerId: string;
    maxUsers: number;
    currentUsers: number;
    drawData: DrawData[];
    createdAt: number;
}
export interface User {
    id: string;
    name: string;
    cursorPosition: Point;
}
export declare enum SocketEvents {
    JOIN_ROOM = "join_room",
    LEAVE_ROOM = "leave_room",
    DRAW = "draw",
    CLEAR = "clear",
    CURSOR_MOVE = "cursor_move",
    USER_JOINED = "user_joined",
    USER_LEFT = "user_left",
    ROOM_DATA = "room_data",
    ERROR = "error",
    STOP_SHARING = "stop_sharing"
}
