const propertyService = require("../services/propertyService");

class PropertyController {
  async createProperty(req, res, next) {
    try {
      const result = await propertyService.createProperty(req.body);
      res.status(200);
      res.json({status: `Property Created`, data: result});
    } catch(err) {
      res.status(400);
      res.json({status: `Property Not Created`, data: err.message});
    }
  }
  
  async getAllProperties(req, res, next) {
    const result = await propertyService.getAllProperties()
    res.status(200);
    res.json({status: `Showing All Property`, data: result});
  }

  async getProperty(req, res, next) {
    try {
      const result = await propertyService.getProperty(req.params.id);
      res.status(200);
      res.json({status: `Success`, data: result});
    } catch(err){
      res.status(404);
      res.json({status: `Failed`, data: err.message});
    }
  }

  async updateProperty(req, res, next) {
    try{
      const result = await propertyService.updateProperty(req.params.id, req.body);
      res.status(200);
      res.json({status : `Update Successful`, data: result});
    } catch(err){
      res.status(400);
      res.json({status : `Update Not Successful`, data: err.message});
    }
  }

  async deleteProperty(req, res, next) {
    try{
      const result = await propertyService.deleteProperty(req.params.id)
      res.status(200);
      res.json({status : `Property Deleted`})
    } catch(err){
      res.status(404);
      res.json({status: `Property Not Found`})
    }
  }
}


module.exports = PropertyController;
