const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
// const gravatar = require('gravatar');

const supsSchema = new Schema({

  nickname:{type:String,
    minlength: 3,
    required: [true, "Set name for hero"],
  },
  realName:{type:String,},
  originDescription:{type:String,},
  superpowers:{type:String,},
  catchPhrase:{type:String,},
  imageURL: {
    type: String,
    // default: function(){
    //   return gravatar.url(this.email,{s:'250'}, true);
    // }
  },


});

const SupsModel = model("superhero", supsSchema);

module.exports = SupsModel;