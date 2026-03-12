import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).send("Id must be a number.");
  }

  const track = await getTrackById(req.params.id);
  if (!track) {
    return res.status(404).send("Track not found.");
  }

  res.send(track);
});
