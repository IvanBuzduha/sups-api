const Sups = require("../service/sups-service");
const mongoose = require("mongoose");
const { asyncWrapper } = require("../helpers/async-wrapper");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const createFolder = require("../helpers/create-dir");

const getSuperherosList = asyncWrapper(async (req, res, next) => {
  try {
    const superheroes = await Sups.getSuperherosList();
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        superheroes,
      },
    });
  } catch (error) {
    next(error);
  }
});

const getSuperheroById = asyncWrapper(async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const superhero = await Sups.getSuperheroById(req.params.id);

      if (superhero) {
        return res.json({
          status: "success",
          code: HttpCode.OK,
          data: {
            superhero,
          },
        });
      } else {
        return res.status(HttpCode.NOTFOUND).json({
          status: "error",
          code: HttpCode.NOTFOUND,
          message: "Not Found",
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Id doesn't exist",
    });
  }
});

const addSuperhero = asyncWrapper(async (req, res, next) => {
  try {
    const superhero = await Sups.createSuperhero({ ...req.body });
    const { id } = addSuperhero;
    console.log("superhero :>> ", superhero);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      message: "New Superhero has been added",
      data: {
        superhero,
      },
    });
  } catch (error) {
    next(error);
  }
});

const removeSuperhero = asyncWrapper(async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const superhero = await Sups.removeSuperhero(req.params.id);

      if (superhero) {
        return res.json({
          status: "success",
          message: "Superhero has been deleted",
          code: HttpCode.OK,
          data: {
            superhero,
          },
        });
      } else {
        return res.status(HttpCode.NOTFOUND).json({
          status: "error",
          code: HttpCode.NOTFOUND,
          message: "Not Found",
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(HttpCode.NOTFOUND).json({
      status: "error",
      code: HttpCode.NOTFOUND,
      message: "Id doesn't exist",
    });
  }
});

const updateSuperhero = asyncWrapper(async (req, res, next) => {
  if (req.body && mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const superhero = await Sups.updateSuperhero(req.params.id, req.body);

      if (superhero) {
        return res.json({
          status: "success",
          message: "Data has been updated",
          code: HttpCode.OK,
          data: {
            superhero,
          },
        });
      } else {
        return res.status(HttpCode.NOTFOUND).json({
          status: "error",
          code: HttpCode.NOTFOUND,
          message: "Not found",
        });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Id doesn't exist",
    });
  }
});
const uploadImg = async (req, res, next) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to upload image" });
  }

  //try {
  // const superhero = await Sups.updateSuperhero(req.params.id, req.body);
  // const id = req.sups.id;
  // console.log("id", id);
  // const image = await saveStatic(req);
  // console.log("image", image);
  // await Sups.addImage(id, image);

  // return res.json({
  //   status: "success",
  //   code: HttpCode.OK,
  //   data: {
  //     ...req.body,
  //     image,
  //   },
  // url: `/uploads/${req.file.originalname}`,
  //   });
  // } catch (err) {
  //   next(err);
  //}
};
// const saveStatic = async (req) => {
//   const folderForImage = superhero.id;
//   const filePath = req.file.path;
//   const imageName = req.file.originalname;
//   const file = await Jimp.read(filePath);
//   await file.resize(250, 250).quality(70).writeAsync(filePath);

//   await createFolder(path.join("uploads", "images", folderForImage));

//   await fs.rename(
//     filePath,
//     path.join("uploads", "images", folderForImage, imageName)
//   );

//   const imageURL = path.join(folderForImage, imageName).replace("\\", "/");
//   try {
//     await fs.unlink(req.file.path);
//   } catch (err) {
//     console.log(err.message);
//   }

//   return imageURL;
// };

module.exports = {
  getSuperherosList,
  getSuperheroById,
  addSuperhero,
  removeSuperhero,
  updateSuperhero,
  uploadImg,
};
