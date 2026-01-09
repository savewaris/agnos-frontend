const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // Join room based on client type
        socket.on("join_room", (room) => {
            socket.join(room);
            console.log(`Socket ${socket.id} joined room ${room}`);
        });

        // Handle patient form updates
        socket.on("patient_update", (data) => {
            // Broadcast to staff room with sender ID
            io.to("staff").emit("staff_update", {
                id: socket.id,
                ...data
            });
        });

        // Handle patient submission
        socket.on("patient_submit", (payload) => {
            io.to("staff").emit("staff_submission", {
                id: socket.id,
                ...payload
            });
            console.log("Patient submission received");
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    httpServer.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
