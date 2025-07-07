import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {score: 0, chooseimg: '', randomimg: '', res: '', showresults: false}

  optionClicked = (value, image) => {
    const chooseImg = image
    const randomOption = Math.floor(Math.random() * choicesList.length)
    const randomValue = choicesList[randomOption].id
    const randomImage = choicesList[randomOption].imageUrl
    let result = ''

    if (randomValue === value) {
      result = 'IT IS DRAW'
    } else {
      if (
        (value === 'ROCK' && randomValue === 'SCISSORS') ||
        (value === 'PAPER' && randomValue === 'ROCK') ||
        (value === 'SCISSORS' && randomValue === 'PAPER')
      ) {
        result = 'YOU WON'
        this.setState(prevState => ({score: prevState.score + 1}))
      } else {
        result = 'YOU LOSE'
        this.setState(prevState => ({score: prevState.score - 1}))
      }
    }
    this.setState({
      chooseimg: chooseImg,
      randomimg: randomImage,
      showresults: true,
      res: result,
    })
  }

  playAgain = () => {
    this.setState({showresults: false})
  }
  render() {
    const {score, showresults, chooseimg, randomimg, res} = this.state
    return (
      <div className="bg-container">
        <div className="header-container">
          <ul>
            <h1>
              Rock
              <br /> Paper
              <br /> Scissors
            </h1>
          </ul>
          <div className="score-container">
            <p>Score</p>
            <p className="score-p">{score}</p>
          </div>
        </div>
        {showresults ? (
          <div>
            <div className="res-container">
              <div className='you-res-card'>
                <p>YOU</p>
                <img className="result-img" src={chooseimg} alt="your choice" />
              </div>
              <div className='you-res-card'>
                <p>OPPONENT</p>
                <img
                  className="result-img"
                  src={randomimg}
                  alt="opponent choice"
                />
              </div>
            </div>
            <div className='res-play-again-con'>
              <p className='result'>{res}</p>
              <button className='play-again-button' type="button" onClick={this.playAgain}>
                PLAY AGAIN
              </button>
            </div>
          </div>
        ) : (
          <ul className="choose-list-container">
            {choicesList.map(each => (
              <li key={each.id}>
                <button
                  type="button"
                  className="choose-button"
                  data-testid={`${each.id.toLowerCase()}Button`}
                  onClick={() => this.optionClicked(each.id, each.imageUrl)}
                >
                  <img
                    className="choose-img"
                    src={each.imageUrl}
                    alt={each.id}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="popup-container custom-popup-btn">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button rules-button">
                RULES
              </button>
            }
          >
            {close => (
              <>
                <div className="custom-btn">
                  <button
                    type="button"
                    data-testid="closeButton"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>
                <div className="rules-container">
                  <img
                    className="rules"
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </div>
              </>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default App
