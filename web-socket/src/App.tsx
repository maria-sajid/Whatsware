import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [connectedClients, setConnectedClients] = useState([]);
  const [socketClient, setSocketClient] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io("ws://localhost:8000");

    // Listen for successful connection
    socket.on("connect", () => {
      console.log("Connected to server");

      // Update the list of connected clients
      setConnectedClients((prevClients) => [
        ...prevClients,
        { id: socket.id, messages: [] },
      ]);
    });

    // Listen for disconnections
    socket.on("disconnect", (reason) => {
      console.log("Client disconnected: " + reason);

      // Update the list of connected clients
      setConnectedClients((prevClients) =>
        prevClients.filter((client) => client.id !== socket.id)
      );
    });

    // Save the socket instance to state
    setSocketClient(socket);

    // Clear the interval when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to send a message to the server
  const sendMessageToServer = (message) => {
    if (socketClient) {
      socketClient.emit("message", message);
    } else {
      console.error("Socket connection not established");
    }
  };

  return (
    <div className="App">
      <p>WebSocket app</p>

      <div>
        <p>Connected Clients:</p>
        <ul>
          {connectedClients.map((client) => (
            <li key={client.id}>
              {client.id} - Messages: {client.messages.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => sendMessageToServer("Hello from React!")}>
        Send Message to Server
      </button>
    </div>
  );
}

export default App;

//----------------------------------------------------------
// import { useEffect, useState } from "react";
// import "./App.css";
// import { socket } from "./socket";

// function App() {
//     useEffect(() => {
//         setInterval(() => {
//             socket.emit("client", { n: Date() });
//         }, 2000);

//         socket.on("reply", (data) => {
//             //console.log("Client disconnected");

//             console.log(`client receives ${JSON.stringify(data)} - ${socket.id}`);
//             //io.to(socket.id).emit('reply', data);
//         });
//     }, []);

//     return (
//         <>
//             {/* <SocketProvider>
//                 <SomeOtherComponent />
//             </SocketProvider> */}
//         </>
//     );
// }

// export default App;
