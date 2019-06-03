import { observable,action,toJS, runInAction } from 'mobx';

class Index {
    @observable flag = false;
    @observable upload = 0;
    @action setUpload = () => {
        this.upload = 1;
    }
}
export default new Index();