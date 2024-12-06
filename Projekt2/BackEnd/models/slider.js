/* eslint-disable no-undef */
import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
  id: String,
});

const Slider = mongoose.model("Slider", sliderSchema, "SliderData");

export default Slider;
