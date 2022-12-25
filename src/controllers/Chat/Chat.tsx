import Conversations from "./Conversations/Conversations";
import { useState } from "react";
import Messages from "./Messages/Messages";
import type { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  username: string;
  image: string;
  name: string;
}

export interface ChatState {
  currentConversationId: string | null;
  currentRecipient: User | null;
  setCurrentConversationId: Dispatch<SetStateAction<string | null>>;
  setCurrentRecipient: Dispatch<SetStateAction<User | null>>;
}

export default function Chat() {
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [currentRecipient, setCurrentRecipient] = useState<User | null>(null);

  const selectConversation = (
    currentConversationId: string,
    recipient: User | null
  ) => {
    setCurrentConversationId(currentConversationId);
    setCurrentRecipient(recipient);
  };

  return (
    <div>
      {!currentConversationId && (
        <Conversations selectConversation={selectConversation} />
      )}
      {currentConversationId && (
        <Messages
          currentRecipient={currentRecipient}
          currentConversationId={currentConversationId}
          setCurrentRecipient={setCurrentRecipient}
        />
      )}
    </div>
  );
}
