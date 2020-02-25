import React, { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Content from "./components/Content";
import './App.css';


//App이 내부적으로 사용할 것들은 state에서 해결!
class App extends Component{
  constructor(props){   //constructor : render 함수 보다 먼저 실행되면서 컴포넌트를 초기화시켜주는 역할!
    super(props);
    this.state = {
      mode : 'read',
      selected_content_id : 2,
      subject : {title : 'WEB이다!!', sub : 'World wide web'},
      welcome:{title:'welcome', desc:'hello react'},
      contents : [
        {id:1, title:'html', desc:'나는 HTML...'},
        {id:2, title:'CSS', desc:'나는 CSS...'},
        {id:3, title:'JavaScript', desc:'나는 JS...'}
      ]
    } //this.state => state 값을 초기화 시켜줌
  }
  render() {
    var _title, _desc = null;

    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read'){
      var i = 0; 
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
    }
    return (
      <div className="App">
        <Subject
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}
        >
        </Subject>
        
        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id : Number(id)
        });
        }.bind(this)} data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }

  //react에서 props나 state 값이 바뀌면 해당되는 컴포넌트의 render 함수가 다시 호출됨!
}

export default App;
