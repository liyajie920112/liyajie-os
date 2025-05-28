export var SocketEvents;
(function (SocketEvents) {
    SocketEvents["JOIN_ROOM"] = "join_room";
    SocketEvents["LEAVE_ROOM"] = "leave_room";
    SocketEvents["DRAW"] = "draw";
    SocketEvents["CLEAR"] = "clear";
    SocketEvents["CURSOR_MOVE"] = "cursor_move";
    SocketEvents["USER_JOINED"] = "user_joined";
    SocketEvents["USER_LEFT"] = "user_left";
    SocketEvents["ROOM_DATA"] = "room_data";
    SocketEvents["ERROR"] = "error";
    SocketEvents["STOP_SHARING"] = "stop_sharing";
})(SocketEvents || (SocketEvents = {}));
//# sourceMappingURL=types.js.map