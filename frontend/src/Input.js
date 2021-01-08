import React, { Component } from 'react';
/*import './App.css';*/
import axios from 'axios';

export default class Input extends Component {

constructor(){
    super();
    this.state = {"link":'', "data":"hello"};

}
myChangeHandler = (event) => {
    this.setState({link: event.target.value});
  }
  submit = (event) => {
      console.log("test");
      this.setState ({
        data: "bye"
      });
      
    axios.post('/getdata', {'first': this.state.link})
    .then((res) => {
      console.log("test");  

    }, (error) => {
      console.log(error);
    });
  }

    render() {
        return(     

                <div className="App-div">

                    <header className="App-header"> 
                    <h1> Welcome to Gif-Finder! </h1>
                    </header>
        
                    
                    <h2> Enter the URL of the image you want to find similar GIFs for: </h2>
                    <form>
                    
                        <input
                            type='text'
                            onChange={this.myChangeHandler}
                            style={{ width:"800px" }}/>

                            <button onClick={this.submit}> Submit </button>
                            
                          <p> {this.state.data} </p>  
                        
                        
                    </form> 
      
                </div>
             

                )
    }
}