import { CrudRepository } from "../../repository/index.js";
import User from "../../models/User.js";

class UserService extends CrudRepository {
  constructor() {
    super(User);
  }
}

export default UserService;
