const Energy = require("../../models/settings/Energy");
const energyService = require("../../services/energyService");

// Mock Mongoose model methods
jest.mock("../../models/settings/Energy");

describe("Energy Service", () => {
  // Test for getAllEnergies
  describe("getAllEnergies", () => {
    it("should return all energies sorted by name_fr", async () => {
      const mockEnergies = [{ name_fr: "Diesel" }, { name_fr: "Electric" }];

      // Mocking Energy.find().sort()
      Energy.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockEnergies),
      });

      const energies = await energyService.getAllEnergies();
      expect(energies).toEqual(mockEnergies);
      expect(Energy.find).toHaveBeenCalled();
      expect(Energy.find().sort).toHaveBeenCalledWith({ name_fr: 1 });
    });
  });

  // Test for createNewEnergy
  describe("createNewEnergy", () => {
    it("should create and return a new energy", async () => {
      const energyData = { name_fr: "Diesel" };
      const mockEnergy = {
        _id: "123",
        name_fr: "Diesel",
        save: jest.fn().mockResolvedValue(energyData),
      };

      // Mocking Energy constructor and save()
      Energy.mockImplementation(() => mockEnergy);

      const newEnergy = await energyService.createNewEnergy(energyData);
      expect(newEnergy).toEqual(energyData);
      expect(mockEnergy.save).toHaveBeenCalled();
    });
  });

  // Test for deleteEnergyById
  describe("deleteEnergyById", () => {
    it("should delete an energy by ID", async () => {
      const mockEnergy = { _id: "123", name_fr: "Diesel" };

      // Mocking Energy.findByIdAndRemove()
      Energy.findByIdAndRemove.mockResolvedValue(mockEnergy);

      const deletedEnergy = await energyService.deleteEnergyById("123");
      expect(deletedEnergy).toEqual(mockEnergy);
      expect(Energy.findByIdAndRemove).toHaveBeenCalledWith("123");
    });

    it("should return null if energy not found", async () => {
      // Mocking Energy.findByIdAndRemove() to return null
      Energy.findByIdAndRemove.mockResolvedValue(null);

      const deletedEnergy = await energyService.deleteEnergyById(
        "nonExistingId"
      );
      expect(deletedEnergy).toBeNull();
      expect(Energy.findByIdAndRemove).toHaveBeenCalledWith("nonExistingId");
    });
  });
});
