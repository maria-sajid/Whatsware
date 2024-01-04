import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
    useEffect(() => {
        setInterval(() => {
            socket.emit("client", { n: Date() });
        }, 2000);

        socket.on("reply", (data) => {
            //console.log("Client disconnected");

            console.log(`client receives ${JSON.stringify(data)} - ${socket.id}`);
            //io.to(socket.id).emit('reply', data);
        });
    }, []);

    return (
        <>
            {/* <SocketProvider>
                <SomeOtherComponent />
            </SocketProvider> */}
        </>
    );
}

export default App;
