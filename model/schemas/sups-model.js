const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;

const supsSchema = new Schema(
  {
    nickname: {
      type: String,
      minlength: 3,
      required: [true, "Set name for hero"],
    },
    realName: { type: String },
    originDescription: { type: String },
    superpowers: { type: String },
    catchPhrase: { type: String },
    imageURL: String,
  },
  { versionKey: false }
);

const SupsModel = model("superhero", supsSchema);

module.exports = SupsModel;
