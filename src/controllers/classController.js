export default class Controllers {
    constructor(service) {
      this.service = service;
    }
  
    async getAll(req, res, next) {
      try {
        const data = await this.service.getAll();
        createResponse(req, res, 200, data);
      } catch (error) {
        next(error);
      }
    };
  
    async getById(req, res, next) {
      try {
        const { id } = req.params;
        const data = await this.service.getById(id);
        if(!data) createResponse(req, res, 404, data)
        else createResponse(req, res, 200, data);
      } catch (error) {
        next(error);
      }
    };
  
    async create(req, res, next) {
      try {
        const data = await this.service.create(req.body);
        createResponse(req, res, 200, data);
      } catch (error) {
        next(error);
      }
    };
  
    async update(req, res, next) {
      try {
        const { id } = req.params;
        const data = await this.service.update(id, req.body);
        if(!data) createResponse(req, res, 404, data)
          else createResponse(req, res, 200, data);
      } catch (error) {
        next(error);
      }
    };
  
    async delete(req, res, next) {
      try {
        const { id } = req.params;
        const data = await this.service.delete(id);
        if(!data) createResponse(req, res, 404, data)
          else createResponse(req, res, 200, data);
      } catch (error) {
        next(error);
      }
    };
  }