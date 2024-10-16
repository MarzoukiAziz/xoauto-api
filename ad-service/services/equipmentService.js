const Equipment = require("../models/settings/Equipment");

const getSingleEquipment = async () => {
  return await Equipment.findOne();
};

const updateSingleEquipment = async (updateData) => {
  return await Equipment.findOneAndUpdate({}, updateData, { new: true });
};

module.exports = {
  getSingleEquipment,
  updateSingleEquipment,
};
