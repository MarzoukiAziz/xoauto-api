const Model = require("../../models/settings/Model");
const modelService = require("../../services/modelService");

// Mock Mongoose model methods
jest.mock("../../models/settings/Model");

describe("Model Service", () => {
  // Test for getAllModels
  describe("getAllModels", () => {
    it("should return all models", async () => {
      const mockModels = [{ name: "Model A" }, { name: "Model B" }];

      // Mocking Model.find()
      Model.find.mockReturnValue({
        sort: jest.fn().mockReturnValue(mockModels),
      });
      const models = await modelService.getAllModels();
      expect(models).toEqual(mockModels);
      expect(Model.find).toHaveBeenCalled();
    });
  });

  // Test for getAllModelsWithBrand
  describe("getAllModelsWithBrand", () => {
    it("should return all models with brand info", async () => {
      const mockModels = [{ name: "Model A", brandId: { name: "Brand A" } }];

      // Mocking Model.find().populate()
      Model.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockModels),
        }),
      });

      const models = await modelService.getAllModelsWithBrand();
      expect(models).toEqual(mockModels);
      expect(Model.find).toHaveBeenCalled();
    });
  });

  // Test for getModelsByBrandIds
  describe("getModelsByBrandIds", () => {
    it("should return models by brand IDs", async () => {
      const brandIds = ["brand1", "brand2"];
      const mockModels = [{ name: "Model A", brandId: { name: "Brand A" } }];

      // Mocking Model.find()
      Model.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockModels),
        }),
      });

      const models = await modelService.getModelsByBrandIds(brandIds);
      expect(models).toEqual(mockModels);
      expect(Model.find).toHaveBeenCalledWith({ brandId: { $in: brandIds } });
    });
  });

  // Test for createNewModel
  describe("createNewModel", () => {
    it("should create a new model", async () => {
      const modelData = { name: "New Model" };
      const mockModel = { name: "New Model", brandId: { name: "Brand A" } };

      // Mocking Model.save()
      Model.prototype.save = jest.fn().mockResolvedValue(mockModel);
      Model.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockModel),
      });

      const model = await modelService.createNewModel(modelData);
      expect(model).toEqual(mockModel);
      expect(Model.findById).toHaveBeenCalledWith(mockModel._id);
    });
  });

  // Test for deleteModelById
  describe("deleteModelById", () => {
    it("should delete the model by ID", async () => {
      const modelId = "model1";
      const mockModel = { name: "Model A" };

      // Mocking Model.findByIdAndRemove()
      Model.findByIdAndRemove.mockResolvedValue(mockModel);

      const deletedModel = await modelService.deleteModelById(modelId);
      expect(deletedModel).toEqual(mockModel);
      expect(Model.findByIdAndRemove).toHaveBeenCalledWith(modelId);
    });
  });
});
