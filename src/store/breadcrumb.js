import { observable, action } from 'mobx'

class Breadcrumb {
  @observable list = []
  @action setNav = (list) => {
    this.list = list
  }
} 

export default new Breadcrumb()