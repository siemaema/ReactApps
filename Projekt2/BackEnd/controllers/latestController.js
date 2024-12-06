/* eslint-disable no-undef */
import Latest from "../models/latest.js";

export const getLatest = async (req, res) => {
  try {
    const latest = await Latest.find();
    res.json(latest);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Nie udało się pobrać najnowszych elementów" + { err } });
  }
};
