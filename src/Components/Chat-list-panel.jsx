import AddBtn from "./AddBtn";
import ChatRow from "./Chat-row";

function ChatListPanel() {
  return (
    <div className="overflow-y-auto chat-list flex items-center">
      <div className="chat-panel rounded-2xl">
        <div className="title pl-5 pr-7 py-5 text-5xl gradient-text">
          PixelTalk
        </div>
        <AddBtn />
      </div>
    </div>
  );
}

export default ChatListPanel;
