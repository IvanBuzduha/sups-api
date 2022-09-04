const SuperheroModel = require("../model/schemas/sups-model");

const getSuperherosList = async () => {
  return await SuperheroModel.find();
};

const getSuperheroById = async (id) => {
  const superhero = await SuperheroModel.findById(id);
  if (!superhero) {
    throw new NotFound("Superhero with id  not found");
  }

  return superhero;
};

const removeSuperhero = async (id) => {
  const superhero = await SuperheroModel.findByIdAndRemove(id);

  return superhero;
};

const createSuperhero = async ({
  nickname,
  realName,
  originDescription,
  superpowers,
  catchPhrase,
}) => {
  const superhero = new SuperheroModel({
    nickname,
    realName,
    originDescription,
    superpowers,
    catchPhrase,
  });
  return await superhero.save();
};

const updateSuperhero = async (id, body) => {
  const superhero = await SuperheroModel.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );

  return superhero;
};

const addImage = async (id, image) => {
  return await SuperheroModel.updateOne({ _id: id }, { image });
};

module.exports = {
  createSuperhero,
  getSuperheroById,
  getSuperherosList,
  removeSuperhero,
  updateSuperhero,
  addImage,
};
