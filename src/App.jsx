import SignUp from "./Pages/SignUp";
import ChatApp from "./Chat";
import Login from "./Pages/Login";
import { MsgContextProvider } from "./provider/msgContext";

const App = () => {
  return (
    <>
      {/* <SignUp /> */}
      {/* <Login /> */}
      <MsgContextProvider>
        <ChatApp />
      </MsgContextProvider>
    </>
  );
};
export default App;
