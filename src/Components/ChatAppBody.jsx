import { useMsgFunctions } from "../provider/msgContext";
import Bgtheme from "./Bgtheme";
import ChatListPanel from "./Chat-list-panel";
import ChatWindow from "./Chat-window";
import theme1 from "../assets/theme/theme2.jpg"

function ChatAppBody() {
  const {selectedTheme} = useMsgFunctions();
  // console.log("theme12" , selectedTheme)
  return (
    <div className={`flex flex-1 absolute chat-body w-full h-full`} style={{ backgroundImage: `url(${selectedTheme})` }}>
      <ChatListPanel />
      <ChatWindow />
      {/* <ChatCanvas /> */}
    </div>
  );
}
export default ChatAppBody;
