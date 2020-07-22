import React, {Component} from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {

  state = {
      data: '',
      imgurl: '',
      explanation: ''
    };
      
  componentDidMount() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=bj1T8UV0iK0Nybs09IbbVfrio0XaQDirc8zkiRz3')

    .then((response) => response.json()) 
    .then((data) => { 
        console.log(data);
        this.setState({ 
          imgurl: data.url,
          date: data.date,
          explanation: data.explanation
        }); 
    });
  }

  render () {

    const displayPicture = () => {

      let datePicker = document.getElementById("date");
      let date = datePicker.value;
      let url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=bj1T8UV0iK0Nybs09IbbVfrio0XaQDirc8zkiRz3`;
      
      axios.get(url)
          .then(function(response) {
            
              let image = response.data.url;
              let newDate = response.data.date; 
              let explanation = response.data.explanation;            

              if(image) {
                document.getElementById("image").src = image;
                document.getElementById("image").style.display = "initial";
                document.getElementById("explanation").style.display = "block";
                document.getElementById("newDate").innerHTML = newDate;
                document.getElementById("newDate").style.display = "block";
                document.getElementById("explanation").innerHTML = explanation;
                
                //Removing default
                document.getElementById("default_image").style.display = "none";
                document.getElementById("default_date").style.display = "none";
                document.getElementById("default_explanation").style.display = "none";
              } 

          }).catch(error => {
            console.log(error.response)})
    };

    return (
      <div className="App">
        
        <h1>ASTRONOMY PICTURE OF THE DAY</h1>

        <div>
          <h4>Please choose a date</h4>
          <input id="date" type="date"/>
          <button onClick={displayPicture} id="button" href="">Search</button>
        </div>
        
        <img src="" id="image" alt="photo_of_the_day" style={{display: 'none'}} />
        <p id="newDate" style={{display: 'none'}}></p>
        <p id="explanation" style={{display: 'none'}}></p>

        <div id="default">
          <img src={this.state.imgurl} id="default_image" alt="default_image"/>
          <p id="default_date"> {this.state.date}</p>
          <p id="default_explanation"> {this.state.explanation} </p>
        </div>

      </div>
    );
  }
}


export default App;
