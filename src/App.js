import React, {Component} from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            imgurl: '',
            explanation: '',
            show: false
        }
    }
      
  componentDidMount() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=bj1T8UV0iK0Nybs09IbbVfrio0XaQDirc8zkiRz3')

    .then((response) => response.json()) 
    .then((data) => { 
        console.log(data);
        this.setState({
          date: data.date,
          explanation: data.explanation,
          show: true
        });
    });
  }

  searchDateData = () => {
    let url = `https://api.nasa.gov/planetary/apod?date=${this.state.date}&api_key=bj1T8UV0iK0Nybs09IbbVfrio0XaQDirc8zkiRz3`;
    
    axios.get(url)
      .then(response  => {
        console.log('nesto', response);
          this.setState({ 
              imgurl: response.data.url,
              date: response.data.date,
              explanation: response.data.explanation
          });
      }).catch(error => {
          console.log(error.response)}
      )
  };

  handleDateChange = date => {
      this.setState({ date: date });
  }
  render () {
    return (
      <div className="App">
        
        <h1>ASTRONOMY PICTURE OF THE DAY</h1>

        {this.state.show && <div>
          <h4>Please choose a date</h4>
          <input id="date" type="date" onChange={event => this.handleDateChange(event.target.value)} />
          <button onClick={this.searchDateData} id="button" href="">Search</button>
        </div>}
        
        <div>
          <p>{this.state.date}</p>
          <div className="container">
            <img src={this.state.imgurl} alt="photo_of_the_day" />
            <p>{this.state.explanation}</p>
          </div>
          
        </div>        
        
      </div>
    );
  }
}


export default App;