import { IoAddOutline, IoChevronBack } from "react-icons/io5";
import IconButton from "../../../components/IconButton/IconButton";

// dummy conversation data
const conversations = [
  {
    userId: 1,
    conversation: {
      id: 2,
      conversationUsers: [
        {
          id: 1,
          name: "me",
          image:
            "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/712.jpg",
        },
        {
          id: 3,
          name: "John Rumi",
          image:
            "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/712.jpg",
        },
      ],
    },
    messages: [
      {
        id: 4,
        messageText: "this is a Message.",
      },
    ],
  },
];

// db composition

// Converssations table
//id

// Message
//id
//conversationId

// ConversationUser
//userId
//conversationId

export default function Conversations() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col space-y-5 bg-level1 p-5 md:bottom-[unset] md:left-[unset] md:top-[76px] md:right-4 md:h-[540px] md:w-96 md:space-y-5 md:rounded-xl md:shadow-sm">
      <div className="flex items-center justify-between">
        <IconButton className="md:hidden">
          <IoChevronBack />
        </IconButton>
        <p className="text-lg">Messages</p>
        <IconButton>
          <IoAddOutline />
        </IconButton>
      </div>
      <ul>
        {conversations.map((conversationInfo) => {
          const recipient =
            conversationInfo.conversation.conversationUsers[0].id ===
            conversationInfo.userId
              ? conversationInfo.conversation.conversationUsers[1]
              : conversationInfo.conversation.conversationUsers[0];
          return (
            <li
              key={conversationInfo.userId + "conversation"}
              className="rounded-lg py-2 hover:bg-level1Hover"
            >
              <button className="space-x mx-2 flex items-center space-x-2 text-left">
                <img
                  src={recipient!.image}
                  alt="avartar image"
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex flex-col space-y-2">
                  <p>{recipient!.name}</p>
                  <p className="text-sm text-tertiaryText">
                    {conversationInfo.messages[0]?.messageText}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}