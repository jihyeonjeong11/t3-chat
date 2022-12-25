import { IoCloseOutline, IoRemoveOutline } from "react-icons/io5";
import IconButton from "../../../../components/IconButton/IconButton";
import type { ChatState } from "../../Chat";

type Props = Omit<
  ChatState,
  "setCurrentConversationId" | "setCurrentRecipient" | "currentConversationId"
>;

export default function MessageHeader({
  currentConversationId,
  currentRecipient,
}: Props) {
  return (
    <div className="flex justify-between ">
      {!currentRecipient ? (
        <p className="text-lg">New Message</p>
      ) : (
        <div className="flex">
          <img
            className="mr-2 h-11 w-11 rounded-full"
            src={currentRecipient.image}
            alt="avatar profile image"
          />
          <div className="flex flex-col">
            <p>{currentRecipient.name}</p>
            <p className="text-sm text-tertiaryText">
              {currentRecipient.username}
            </p>
          </div>
        </div>
      )}
      <div className="flex">
        {currentRecipient && (
          <IconButton>
            <IoRemoveOutline />
          </IconButton>
        )}
        <IconButton>
          <IoCloseOutline />
        </IconButton>
      </div>
    </div>
  );
}
