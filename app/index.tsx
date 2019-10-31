import React from 'react';
interface IState {
    state: String,
}
interface IProps {
    name: String,
}

export default class TestComponent extends React.Component<IProps,IState>{
    static defalutProps ={
        name: "test Date"
    }
    static state = {
        state: 'show'
    }
    render (){
        return <div className='aa toast colors'>页面测试</div>
    }

}