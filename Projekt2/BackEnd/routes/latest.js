/* eslint-disable no-undef */
import express from "express";
import { getLatest } from "../controllers/latestController.js";

const latest = express.Router();
latest.get("/", getLatest);

export default latest;
