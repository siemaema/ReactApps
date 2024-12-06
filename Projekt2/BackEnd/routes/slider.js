/* eslint-disable no-undef */
import express from "express";
import { getSlider } from "../controllers/sliderController.js";

const slider = express.Router();
slider.get("/", getSlider);

export default slider;
