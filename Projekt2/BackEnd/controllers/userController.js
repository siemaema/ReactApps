/* eslint-disable no-undef */
import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Nie udało się pobrać użytkowników: ${err}` });
  }
};
