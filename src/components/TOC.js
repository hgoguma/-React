import React, { Component } from 'react';

class TOC extends Component{

    shouldComponentUpdate(newProps, newState){
      //newProps, newState 를 매개변수로 받음
      //return false 이면 render 함수가 호출되지 않음
      //return true이면 render 함수가 호출됨!
      if(this.props.data === newProps.data){ //바뀐 값이 없는 경우
        return false;
      }
      return true;
    }
    render() {
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while( i< data.length){
        lists.push(<li key={data[i].id}>
          <a 
          href={"/content/"+data[i].id}
          data-id={data[i].id}
          onClick={function(e){
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this)}
          >{data[i].title}</a>
          </li>);
        i = i+1;
      }
      return (
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }
  

  export default TOC;