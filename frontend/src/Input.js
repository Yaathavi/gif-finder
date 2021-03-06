import React, { Component } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import axios from 'axios';
import './App.css';

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
        var carousel = (<Carousel slides={[]} arrows />)
        for (var x=0; x<10; x++){
            gifs.push(<img src={this.state.giflinks[x]}></img>)
            carousel = (<Carousel slides={gifs} arrows />)
        }

        return(     

                <div className="App-div">

                    <header className="App-header"> 
                    <h1> Gif-Finder! </h1>
                  
                    </header>
        
                  <div2 className="App-div2"> 
                     <a href="https://github.com/Yaathavi/gif-finder" target="_blank" rel="noopener noreferrer"> Github</a>
                    </div2>

                    <h2> Enter the URL of the image you want to find similar GIFs for: </h2>
                    <form className="App-form">
                    
                        <input
                            type='text'
                            onChange={this.myChangeHandler}
                            style={{ width:"800px" }}/>

                            <button onClick={this.submit}> Submit </button>
                            
                          <p> {this.state.data} </p>  
                        
                        
                    </form > 

          {carousel}

            
                </div>
             

                )
    }
}

