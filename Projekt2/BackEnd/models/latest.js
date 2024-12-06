/* eslint-disable no-undef */
import mongoose from "mongoose";

const latestSchema = new mongoose.Schema({
  nazwa: String,
  data_Dodania: String,
  image: String,
});

const Latest = mongoose.model("Latest", latestSchema, "Latest");

export default Latest;
