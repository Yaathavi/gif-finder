import React, { Component } from 'react';
import axios from 'axios';
/*import './App.css';*/

export default class Input extends Component {

constructor(){
    super();
    this.state = {"link":'', "giflinks":[]};

}
myChangeHandler = (event) => {
    this.setState({link: event.target.value});
  }
  submit = (event) => {
    event.preventDefault();


    axios.post('/getdata', {'first': this.state.link})
    .then((res) => {
        this.setState({"giflinks":res.data})
    //   this.setState ({
    //     data: res.data
    //   });
    //   console.log(this.state.data);
    }, (error) => {
      console.log(error);
    });
    
  }

    render() {

        var gifs = [];
        for (var x=0; x<10; x++){
            gifs.push(<img src={this.state.giflinks[x]}></img>)
            
        }

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
      {
          gifs
      }
                </div>
             

                )
    }
}

