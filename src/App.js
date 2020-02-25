import React, { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';


import './App.css';


//App이 내부적으로 사용할 것들은 state에서 해결!
class App extends Component{
  constructor(props){   //constructor : render 함수 보다 먼저 실행되면서 컴포넌트를 초기화시켜주는 역할!
    super(props);
    this.max_content_id = 3;  
    this.state = {
      mode : 'welcome',
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
  getReadContent(){
    var i = 0; 
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i++;
      }
  }
  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={function(_title, _desc) {
        //add content to this.state.contents
        this.max_content_id++;
        // var _contents = this.state.contents.concat(
        //   {id : this.max_content_id, title:_title, desc:_desc}
        // );
        var newContents = Array.from(this.state.contents); //새로 배열 복제
        newContents.push({id : this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents : newContents,
          mode:'read',
          selected_content_id : this.max_content_id
        })
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === "update"){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc) {
        var _contents = Array.from(this.state.contents); //기존 배열을 복제해서 새로 배열을 만듦
        var i = 0;
        while(i<_contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i++;
        }
        this.setState({
          contents : _contents,
          mode :'read'
        })
      }.bind(this)}>
      </UpdateContent>
    }
    return _article;

  }
  render() {
    
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
        }.bind(this)} data={this.state.contents}>
        </TOC>
        <Control onChangeMode={function(mode){
          if(mode === 'delete'){ //삭제 모드일 때
            if(window.confirm('really?')){ //실제 삭제한다고 할 때
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i<_contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1); //_contents의 원본을 바꿈!
                  break;
                }
                i++;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('delete success');
            }
          } else {
            this.setState({
              mode:mode
            });
          }
         
          
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }

  //react에서 props나 state 값이 바뀌면 해당되는 컴포넌트의 render 함수가 다시 호출됨!
}

export default App;
