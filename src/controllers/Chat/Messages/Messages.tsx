import { ChatState } from "../Chat";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageSection from "./MessageSection/MessageSection";
import NewConversationUserInput from "./NewConversationUserInput/NewConversationUserInput";

type Props = Omit<ChatState, "setCurrentConversationId">;
export default function Messages({
  currentRecipient,
  currentConversationId,
  setCurrentRecipient,
}: Props) {
  return (
    <div className="fixed bottom-0 right-0 flex flex-col space-y-5 rounded-xl bg-level1 p-5 shadow-sm max-md:top-0 max-md:left-0 md:right-4 md:bottom-4 md:h-[540px] md:w-96">
      <MessageHeader currentRecipient={currentRecipient} />
      {currentRecipient === null && (
        <NewConversationUserInput setCurrentRecipient={setCurrentRecipient} />
      )}
      <MessageSection currentRecipient={currentRecipient} />
    </div>
  );
}
