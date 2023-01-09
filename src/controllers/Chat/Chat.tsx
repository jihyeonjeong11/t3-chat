import Conversations from "./Conversations/Conversations";
import { useState } from "react";
import Messages from "./Messages/Messages";
import type { Dispatch, SetStateAction } from "react";
import IconButton from "../../components/IconButton/IconButton";
import { IoChatboxOutline } from "react-icons/io5";
import type { User } from "@prisma/client";
import { trpc } from "../../utils/trpc";

// export interface User {
//   id: string;
//   username: string;
//   image: string;
//   name: string;
// }

type PartialUser = Partial<User>;

export interface ChatState {
  currentConversationId: string | null;
  currentRecipient: PartialUser | null;
  setCurrentConversationId: Dispatch<SetStateAction<string | null>>;
  setCurrentRecipient: Dispatch<SetStateAction<PartialUser | null>>;
}

export default function Chat() {
  const utils = trpc.useContext();
  trpc.chat.onSendMessage.useSubscription(undefined, {
    onData: ({ conversationId }) => {
      utils.chat.conversations.invalidate();
      utils.chat.messages.invalidate({ conversationId });
    },
  });
  const [showConversations, setShowConversations] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [currentRecipient, setCurrentRecipient] = useState<PartialUser | null>(
    null
  );
  const [conversationQueue, setConversationQueue] = useState<
    { conversationId: string; recipient: PartialUser }[]
  >([]);

  const selectConversation = (
    currentConversationId: string,
    recipient: PartialUser | null
  ) => {
    setCurrentConversationId(currentConversationId);
    setCurrentRecipient(recipient);
    setShowConversations(false);
  };

  const addToConvoQueue = (conversationId: string, recipient: PartialUser) => {
    setConversationQueue((queue) => [{ conversationId, recipient }, ...queue]);
    closeMessages();
  };

  const removeFromConvoQueue = (conversationId: string) => {
    setConversationQueue((queue) =>
      queue.filter((convoEntry) => convoEntry.conversationId !== conversationId)
    );
  };

  const closeMessages = () => {
    setCurrentConversationId(null);
    setCurrentRecipient(null);
  };

  return (
    <div>
      <IconButton
        onClick={() => setShowConversations((conversations) => !conversations)}
        shouldFill={showConversations}
      >
        <IoChatboxOutline />
      </IconButton>
      {showConversations && (
        <Conversations selectConversation={selectConversation} />
      )}
      {currentConversationId && (
        <Messages
          setCurrentConversationId={setCurrentConversationId}
          currentRecipient={currentRecipient}
          currentConversationId={currentConversationId}
          setCurrentRecipient={setCurrentRecipient}
          queueLength={conversationQueue.length}
          addToConvoQueue={addToConvoQueue}
          closeMessages={closeMessages}
        />
      )}
      {conversationQueue.length > 0 && (
        <ul className="fixed bottom-4 right-4 space-y-3 leading-[0]">
          {conversationQueue.map((convoEntry) => {
            return (
              <li key={convoEntry.conversationId}>
                <button
                  onClick={() => {
                    setCurrentConversationId(convoEntry.conversationId);
                    setCurrentRecipient(convoEntry.recipient);
                    removeFromConvoQueue(convoEntry.conversationId);
                  }}
                >
                  <img
                    src={convoEntry.recipient.image || ""}
                    alt="avatar profile image"
                    className="h-12 w-12 rounded-full"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
