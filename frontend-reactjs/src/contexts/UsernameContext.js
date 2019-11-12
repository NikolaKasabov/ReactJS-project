import React, { createContext, useState } from 'react';

export const UsernameContext = createContext();

const UsernameContextProvider = (props) => {
  const [username, setUsername] = useState('testiiiiing');

  const changeUsername = (username) => {
    setUsername(username);
  }

  return (
    <UsernameContext.Provider value={{ username, changeUsername }}>
      {props.children}
    </UsernameContext.Provider>
  )
}

export default UsernameContextProvider;