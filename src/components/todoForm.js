import React from 'react'
import './todoForm.css'


function getLabels(keyword) {
    const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa', 'Alexander'];
    const result = allLabels
      .filter(function (x) {
        return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
    return result;
  }
  
  // This function mocks the asynchronous API to fetch the label list by keyword.
  // Example:
  //  getLabelsAsync('C').then(function(val) {
  //     console.log(val);
  //  })
  function getLabelsAsync(keyword) {
    const result = getLabels(keyword);
    const delay = Math.random() * 800 + 200; // delay 200~1000ms
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, delay, result);
    });
  }

class TodoForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        userInput: "",
        labels: [],
        list: [],
        displayDropDown: false,
        currentFocus: 0
      }
    }
  
    //async function getLabelsAsync()
  
    handleInputChange = (e) => {
      const userInput = e.target.value
      this.setState({ userInput })
      if (this.state.displayDropDown) {
        this.handleDisplayDropDown(userInput)
      }
    }
  
    handleDisplayDropDown = (input) => {
      getLabelsAsync(input.slice(input.lastIndexOf("@") + 1)).then((resolve, reject) => {
        if (resolve && resolve.length > 0) {
          this.setState({
            labels: resolve,
            currentFocus: 0
          })
        }
      })
    }
  
    handleClick = () => {
      this.setState({
        list: [...this.state.list, this.state.userInput],
        userInput: "",
        displayDropDown: false,
        currentFocus: 0
      })
    }
  
    handleOnKeyDown = (e) => {
      if (e.key === "@") {
        this.setState({ displayDropDown: true })
      }
  
      if (this.state.displayDropDown) {
        if (e.key === "ArrowUp") {
          if (this.state.currentFocus > 0) {
            this.setState({ currentFocus: this.state.currentFocus - 1 })
          }
        } else if (e.key === "ArrowDown") {
          if (this.state.currentFocus < this.state.labels.length) {
            this.setState({ currentFocus: this.state.currentFocus + 1 })
          }
        } else if (e.key === "Enter") {
          this.selectLabel(this.state.labels[this.state.currentFocus])
        }
      }
    }
  
    selectLabel = (item) => {
      const userInput = this.state.userInput
      const newInput = userInput.slice(0, userInput.lastIndexOf('@')) + item
      this.setState({
        userInput: newInput,
        displayDropDown: false,
        currentFocus: 0
      })
    }
  
  
    render() {
      return (
        <div>
          <input value={this.state.userInput}
            onKeyDown={e => this.handleOnKeyDown(e)}
            onChange={e => this.handleInputChange(e)}
          />
          <button onClick={() => this.handleClick()}>Add Task</button>
          {this.state.displayDropDown && <ul className='autoComplete'>
            {this.state.labels.map((item, index) => {
              return <li key={index} className={this.state.currentFocus === index ? 'select' : ''} value={item} onClick={() => this.selectLabel(item)} >{item}</li>
            })}
          </ul>}
          <ul>
            {this.state.list.map((item, index) => {
              return <li key={index} >{item}</li>
            })}
          </ul>
        </div>
      )
    }
  }

export default TodoForm
