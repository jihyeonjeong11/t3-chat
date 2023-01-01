import { ChatState } from "../../Chat";

const messages = [
  {
    id: "1",
    messageText: "Hi, good afternoon. \r\n This is a Message.",
    userId: "3",
    createdAt: new Date(),
  },
  {
    id: "2",
    messageText: "Hello. This is a Message.",
    userId: "1",
    createdAt: new Date(),
  },
];

type Props = Pick<ChatState, "currentRecipient">;

export default function MessageSection({ currentRecipient }: Props) {
  const getTimeStamp = (msgs: typeof messages, index: number) => {
    const currentDate = msgs[index]!.createdAt;
    const previousDate = index !== 0 ? messages[index - 1]?.createdAt : null;
    if (previousDate) {
      if (
        previousDate.getDate() === currentDate.getDate() &&
        previousDate.getMonth() === currentDate.getMonth() &&
        previousDate.getFullYear() === currentDate.getFullYear()
      )
        return null;
    }
    return new Intl.DateTimeFormat([], {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(currentDate);
  };

  return (
    <ul className="flex h-full flex-col space-y-5 overflow-y-scroll">
      {messages.map((message, index) => {
        const timestamp = getTimeStamp(messages, index);
        return (
          <li key={message.id + "message"} className="flex flex-col">
            {timestamp !== null && (
              <p className="mb-5 text-center text-quaternaryText">
                {timestamp}
              </p>
            )}
            {message.userId === currentRecipient?.id ? (
              <div className="flex">
                <img
                  src={currentRecipient.image}
                  alt="avatar profile image"
                  className="mr-2 h-7 w-7 self-end rounded-full"
                />
                <div className="flex flex-col space-y-3 rounded-xl bg-level2 p-2">
                  <p className="whitespace-pre-line">{message.messageText}</p>
                  <p className="self-end text-xs text-tertiaryText">
                    {new Intl.DateTimeFormat([], {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(message.createdAt)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 self-end rounded-xl bg-primaryText p-2">
                <p className="text-invertedPrimaryText">
                  {message.messageText}
                </p>
                <p className="self-end text-xs text-invertedTertiaryText">
                  {new Intl.DateTimeFormat([], {
                    hour: "numeric",
                    minute: "numeric",
                  }).format(message.createdAt)}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
