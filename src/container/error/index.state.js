import {  action , observable } from 'mobx';

class Index{
    @observable queryData = ""
    @action changeQueryData = () => {
        console.log('2222')
        this.queryData = 'heheh'
    }
}
export default new Index();