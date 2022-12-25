import { ChatState } from "../Chat";
import MessageHeader from "./MessageHeader/MessageHeader";

type Props = Omit<ChatState, "setCurrentConversationId">;
export default function Messages({
  currentRecipient,
  currentConversationId,
}: Props) {
  return (
    <div className="fixed bottom-0 right-0 flex flex-col space-y-5 bg-level1 shadow-sm max-md:top-0 max-md:left-0 md:right-4 md:bottom-4">
      <MessageHeader currentRecipient={currentRecipient} />
    </div>
  );
}
