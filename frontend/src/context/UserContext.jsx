import axios from "axios";
import { createContext, useEffect, useId, useState } from "react";

export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("/user/profile").then((response) => {
      setId(response.data.userID);
      setUsername(response.data.username);
    });
  }, []);

  return (
    <userContext.Provider value={{ id, setId, username, setUsername }}>
      {children}
    </userContext.Provider>
  );
}
