const Equipment = require("../../models/settings/Equipment");
const equipmentService = require("../../services/equipmentService");

// Mock Mongoose model methods
jest.mock("../../models/settings/Equipment");

describe("Equipment Service", () => {
  // Test for getSingleEquipment
  describe("getSingleEquipment", () => {
    it("should return the single equipment item", async () => {
      const mockEquipment = { name: "Basic Equipment" };

      // Mocking Equipment.findOne()
      Equipment.findOne.mockResolvedValue(mockEquipment);

      const equipment = await equipmentService.getSingleEquipment();
      expect(equipment).toEqual(mockEquipment);
      expect(Equipment.findOne).toHaveBeenCalled();
    });

    it("should return null if no equipment found", async () => {
      // Mocking Equipment.findOne() to return null
      Equipment.findOne.mockResolvedValue(null);

      const equipment = await equipmentService.getSingleEquipment();
      expect(equipment).toBeNull();
      expect(Equipment.findOne).toHaveBeenCalled();
    });
  });

  // Test for updateSingleEquipment
  describe("updateSingleEquipment", () => {
    it("should update and return the single equipment item", async () => {
      const updateData = { name: "Updated Equipment" };
      const mockUpdatedEquipment = { name: "Updated Equipment" };

      // Mocking Equipment.findOneAndUpdate()
      Equipment.findOneAndUpdate.mockResolvedValue(mockUpdatedEquipment);

      const updatedEquipment = await equipmentService.updateSingleEquipment(
        updateData
      );
      expect(updatedEquipment).toEqual(mockUpdatedEquipment);
      expect(Equipment.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, {
        new: true,
      });
    });

    it("should return null if no equipment found to update", async () => {
      // Mocking Equipment.findOneAndUpdate() to return null
      Equipment.findOneAndUpdate.mockResolvedValue(null);

      const updateData = { name: "Non-existing Equipment" };
      const updatedEquipment = await equipmentService.updateSingleEquipment(
        updateData
      );
      expect(updatedEquipment).toBeNull();
      expect(Equipment.findOneAndUpdate).toHaveBeenCalledWith({}, updateData, {
        new: true,
      });
    });
  });
});
