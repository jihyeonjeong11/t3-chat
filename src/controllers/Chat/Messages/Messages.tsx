import type { ChatState, User } from "../Chat";
import MessageTextArea from "../MessagesTextArea/MessagesTextArea";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageSection from "./MessageSection/MessageSection";
import NewConversationUserInput from "./NewConversationUserInput/NewConversationUserInput";

export interface MessagesState {
  addToConvoQueue: (conversationId: string, recipient: User) => void;
  closeMessages: () => void;
}

type Props = Omit<ChatState, "setCurrentConversationId"> &
  MessagesState & {
    queueLength: number;
  };
export default function Messages({
  currentRecipient,
  currentConversationId,
  setCurrentRecipient,
  queueLength,
  addToConvoQueue,
  closeMessages,
}: Props) {
  return (
    <div
      className={`fixed bottom-0 right-0 flex flex-col space-y-5 rounded-xl bg-level1 p-5 shadow-sm max-md:top-0 max-md:left-0 md:right-4 md:bottom-4 md:h-[540px] md:w-96 ${
        queueLength ? "md:right-[76px]" : ""
      } `}
    >
      <MessageHeader
        currentConversationId={currentConversationId}
        currentRecipient={currentRecipient}
        addToConvoQueue={addToConvoQueue}
        closeMessages={closeMessages}
      />
      {currentRecipient === null && (
        <NewConversationUserInput setCurrentRecipient={setCurrentRecipient} />
      )}
      <MessageSection currentRecipient={currentRecipient} />
      {currentRecipient !== null && <MessageTextArea />}
    </div>
  );
}
