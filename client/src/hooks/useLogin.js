import { useState } from "react";
import { dataUsers } from "../data/users";

const useLogin = () => {
  const login = (user) => {
    const databaseUser = dataUsers.find(
      (databaseUser) => databaseUser.username === user.username
    );

    if (databaseUser && databaseUser.password === user.password) {
      return { loggedInUser: databaseUser, error: null };
    } else {
      return { loggedInUser: null, error: "Invalid username or password" };
    }
  };

  return { login };
};

export default useLogin;
