/* eslint-disable no-undef */
import Slider from "../models/slider.js";

export const getSlider = async (req, res) => {
  try {
    const slider = await Slider.find();
    res.json(slider);
  } catch (err) {
    res.status(500).json({ error: "Nie udało się pobrać sliderów" + { err } });
  }
};
