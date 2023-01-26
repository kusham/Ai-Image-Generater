import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { Configuration, OpenAIApi } from "openai";
// import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openAI = new OpenAIApi(configuration);

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openAI.createImage({
      prompt,
      n: 1,
      size: "1024*1024",
      response_format: "b64_json",
    });
    //   const photoUrl = await cloudinary.uploader.upload(photo);

    //   const newPost = await Post.create({
    //     name,
    //     prompt,
    //     photo: photoUrl.url,
    //   });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ success: true, photo: image });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to create a post, please try again",
      });
  }
});

export default router;
