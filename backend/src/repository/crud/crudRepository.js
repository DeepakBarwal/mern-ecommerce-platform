class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error(`Error at CRUD Repo layer: ${error}`);
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.model.find({});
    } catch (error) {
      console.error(`Error at CRUD Repo layer: ${error}`);
      throw error;
    }
  }

  async get(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      console.error(`Error at CRUD Repo layer: ${error}`);
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error(`Error at CRUD Repo layer: ${error}`);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error(`Error at CRUD Repo layer: ${error}`);
      throw error;
    }
  }
}

export default CrudRepository;
