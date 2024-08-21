import { AXIOS_INSTANCE } from '../api'

const contentManagement = {
  async getCategoriesList() {
    return await AXIOS_INSTANCE.get(`/categories`)
  }
}

export default contentManagement
