import UseOnChange from "../../../../hooks/useOnChange";
import { useEffect, useState } from "react";
import { ChatState } from "../../Chat";
const users = [
  {
    id: "1",
    name: "me",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/712.jpg",
    username: "me",
  },
  {
    id: "3",
    name: "John Rumi",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/712.jpg",
    username: "jrumi",
  },
];

type Props = Pick<ChatState, "setCurrentRecipient">;

export default function NewConversationUserInput({
  setCurrentRecipient,
}: Props) {
  const {
    values: { user },
    setValues,
    handleChange,
  } = UseOnChange({ user: "" });

  const [searchResults, setSearchResults] = useState<typeof users>();
  let timer: ReturnType<typeof setTimeout>; // we need to setRef to store timer. we can see it larter

  const fetchUsers = () => {
    if (!user) {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      users.filter(
        (userEntry) =>
          userEntry.name.toLowerCase().includes(user.toLowerCase()) ||
          userEntry.username.toLowerCase().includes(user.toLowerCase())
      )
    );
  };

  useEffect(() => {
    clearTimeout(timer);
    setTimeout(fetchUsers, 200);
    fetchUsers();
  }, [user]);

  return (
    <div className="relative ">
      <input
        placeholder="Search User"
        className="h-10 w-full rounded-lg bg-level2 px-3 py-2 outline-none placeholder:text-quaternaryText"
        name="user"
        onChange={handleChange}
        value={user}
        autoComplete="off"
      />
      {searchResults && (
        <ul className="absolute left-0 right-0 top-[calc(100%+12px)] rounded-lg bg-level2">
          {searchResults.map((userEntry) => (
            <li
              className="first:rounded-t-lg last:rounded-b-lg hover:bg-level2Hover"
              key={userEntry.name}
            >
              <button
                className="mx-2 flex w-full items-center space-x-2 p-3 py-2 text-left"
                onClick={() => setCurrentRecipient(userEntry)}
              >
                <img
                  src={userEntry.image}
                  alt="avartar profile image"
                  className="mr-2 h-11 w-11 rounded-full"
                />
                <div>
                  <p>{userEntry.name}</p>
                  <p className="text-sm text-tertiaryText">
                    {userEntry.username}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
