import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }


class Index extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }
    state = {};
    handleChange = (info) => {
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    render() {
        const imageUrl = this.state.imageUrl;
        return (
          <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {
              imageUrl ?
                <img src={imageUrl} alt="" className="avatar" /> :
                <Icon type="plus" className="avatar-uploader-trigger" />
            }
          </Upload>
        );
      }
}

Index.propTypes = {

}

export default Index