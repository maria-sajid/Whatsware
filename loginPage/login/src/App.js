import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);

    if (userObject.email.endsWith("@szabist.pk")) {
      setUser(userObject);
      document.getElementById("signinDiv").hidden = true;
    } else {
      alert("Only SZABIST student or faculty, allowed to log in.");
    }
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signinDiv").hidden = false;
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "996506665388-lclp66pib77i4d39gkefrvu134k6f482.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

    window.google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signinDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
