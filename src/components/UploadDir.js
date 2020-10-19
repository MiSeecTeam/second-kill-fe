import React from "react";
import BaseComponent from './BaseComponent'
import { Button,Upload,Row, Typography } from 'antd';

export default class UploadDir extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            OSSData:{},
            fileList:[],
            showList:true,
            timeStamp:Date.now()
        }
    }

    componentDidMount() {
       this.init();
    }
    
    init =() => {
        // const OSSData = await this.mockGetOSSData();
        var OSSData={
            dir: this.props.folder+'/'+this.loadStorage("user").username+"/",
            expire: '1577811661',
            host: '//oceania-usercodes.oss-cn-shanghai.aliyuncs.com',
        }
        if(this.props.zip){
            OSSData={
                dir: "zip/",
                expire: '1577811661',
                host: '//oceania-usercodes.oss-cn-shanghai.aliyuncs.com',
            }
        }

        this.setState({
            OSSData,
        });
    }

    onChange = ({fileList }) => {
        //todo:遍历list修改url
        const { onChange } = this.props;
        if(fileList.length>10){
            this.setState({showList:false})
        }
        fileList = fileList.slice(-10);
        if (onChange) {
            onChange([...fileList]);
        }
        this.setState({fileList})
    };
    
    transformFile = file => {
        const { OSSData } = this.state;
        // console.log(file)
        var filename=""
        var root=""
        if(file.webkitRelativePath!=""){
            //保留相对目录结构
            filename = file.webkitRelativePath;
            //todo:找到src文件夹
            root=filename.substring(0,filename.indexOf('/'));
        }else{
            filename= file.name
            root=filename
        }
        var rename=""
        if(this.props.autoRename){
            rename=this.state.timeStamp+"/"
        }
        if(this.props.zip){
            rename=this.state.timeStamp
        }
        file.url=OSSData.dir+rename+filename
        if(this.props.zip)
            this.props.setDir("public/"+rename+root.substring(0,root.lastIndexOf(".zip")))
        else
            this.props.setDir(OSSData.dir+rename+root)
        return file;
    };

    getExtraData = file => {
        const { OSSData } = this.state;
    
        return {
          key: file.url,
        //   OSSAccessKeyId: OSSData.accessId,
        //   accesskey:OSSData.accesskey,
        //   signature:"",
        //   policy:""
        };
    };
    
    beforeUpload = async () => {
        const { OSSData } = this.state;
        return true;
    };

    renderWarning=()=>{
        //todo:如果上传完成，给予用户反馈
        if(!this.state.showList){
            return(
                <Typography>File number over 10 and part of file list is concealed</Typography>
            )
        }
    }

    render(){
        const props = {
            name: 'file',
            accept:this.props.accept,
            fileList: this.state.fileList,
            action: this.state.OSSData.host,
            onChange: this.onChange,
            // onRemove: this.onRemove,
            transformFile: this.transformFile,
            data: this.getExtraData,
            beforeUpload: this.beforeUpload,
            directory:this.props.directory,
            showUploadList:true
        };
        return (
            <Upload {...props} style={styles.container}>
                <Button style={styles.btn} icon="upload">
                    {this.props.label}
                </Button>
                {this.renderWarning()}
            </Upload>
        );
    }

    
}

const styles = {
    container:{
        padding:0
    },
    btn:{
        marginTop:5,
        marginBottom:5
    }
}

