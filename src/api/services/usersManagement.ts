import { AXIOS_INSTANCE } from '../api'

const userManagementService = {
  async getUsersList() {
    return await AXIOS_INSTANCE.get(`/users`)
  }
}

export default userManagementService
