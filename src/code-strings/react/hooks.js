export const customHook = `
// source: https://reactjs.org/docs/hooks-custom.html
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}`;

export const customHookInUse = `function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}`;

export const useReducer = `
// typical redux reducer
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}

// reducer hook
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}

function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
`;

export const useTransitionWrong = `
import { useState } from 'react';
// WRONG - NO useTransition 
export function FilterList({ names }) {
  const [query, setQuery] = useState('');
  const changeHandler = ({ target: { value } }) => setQuery(value);
  return (
    <div>
      <input onChange={changeHandler} value={query} type="text" />
      {names.map((name, i) => (
        <ListItem key={i} name={name} highlight={query} />
      ))}
    </div>
  );
}
function ListItem({ name, highlight }) {
  const index = name.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return <div>{name}</div>;
  }
  return (
    <div>
      {name.slice(0, index)}
      <span className="highlight">
        {name.slice(index, index + highlight.length)}
      </span>
      {name.slice(index + highlight.length)}
    </div>
  );
}`;

export const useTransition = `
import { useState, useTransition } from 'react';

// YES
export function FilterList({ names }) {
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState('');
  const [isPending, startTransition] = useTransition();
  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
    // creates second state SPECIFICALLY to pass
    // highlight prop from query to highlight
    startTransition(() => setHighlight(value));
  };
  return (
    <div>
      <input onChange={changeHandler} value={query} type="text" />
      {names.map((name, i) => (
        <ListItem key={i} name={name} highlight={highlight} />
      ))}
    </div>
  );
}`;
