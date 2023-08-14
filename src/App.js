import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowFriendForm() {
    setIsOpen((is) => !is);
  }

  function handleSelection(friend) {
    setSelectedFriend(friend);
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {isOpen && <FormAddFriend setFriends={setFriends} />}

        <Button onClick={handleShowFriendForm}>
          {!isOpen ? "Add Friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  // const isSelected = selectedFriend.id === friend.id;
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>Select</Button>
    </li>
  );
}

function FormAddFriend({ setFriends }) {
  const [friendName, setFriendName] = useState("");
  const friendImage = `https://i.pravatar.cc/48?u=${Math.floor(
    Math.random() * 899999 + 100000
  )}`;

  function addFriendHandler(e) {
    e.preventDefault();
    if (!friendImage || !friendName) return;
    const newFriend = {
      id: Math.floor(Math.random() * 899999 + 100000),
      name: friendName,
      image: friendImage,
      balance: 0,
    };
    setFriendName("");
    setFriends((friends) => [...friends, newFriend]);
  }

  return (
    <form className="form-add-friend">
      <label> Friend Name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label> Image URL Name</label>
      <input type="text" value={friendImage} disabled />
      <Button onClick={(e) => addFriendHandler(e)}>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label> Bill Value</label>
      <input type="text" />

      <label>Your Expense</label>
      <input type="text" />

      <label>{selectedFriend.name}'s Expense</label>
      <input type="text" disabled />

      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}
