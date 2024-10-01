import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const LoginAndRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { id, setId, setUsername: setUsernameDuc } = useContext(userContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post("/user/login", {
          username,
          password,
        });
        setUsernameDuc(username);
        setId(response.data.id);
        setRedirect(true);
      } catch (error) {
        setIsError(error.response.data.error);
      }
    } else {
      try {
        await axios.post("/user/register", { username, password });
        setIsSuccess(true);
      } catch (error) {
        setIsError(error.response.data.error);
      }
    }
  }
  if (redirect || id) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="auth">
      <h2>{isLogin ? "Login" : "Rigister"}</h2>
      <div className={isError ? "error" : ""}>{isError && <>{isError}</>}</div>
      <div className={isSuccess ? "success" : ""}>
        {isSuccess && <>user haedr registered now you can login</>}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => {
            setUsername(ev.target.value), setIsError(null);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => {
            setPassword(ev.target.value), setIsError(null);
          }}
        />
        <button type="submit">{isLogin ? "Login" : "Rigister"}</button>
        <div>
          {isLogin && (
            <>
              dont have acount
              <span onClick={() => setIsLogin(!isLogin)}> Register</span>
            </>
          )}
          {!isLogin && (
            <>
              Already have acount
              <span
                onClick={() => {
                  setIsLogin(!isLogin), setIsSuccess(false);
                }}
              >
                <> Login</>
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginAndRegister;
