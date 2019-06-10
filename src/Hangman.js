import React, { Component } from "react";
import { randomWord } from './words';
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = { 
    maxWrong: 6,  // max number user can guess
    // Future change?? maxWrong: this.state.answer.length
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  restart(){
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }
  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "You win. Congrats!";
    if (gameOver) gameState = "Dang, You are a Looouusssser💩";
    
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>

        <img src={this.props.images[this.state.nWrong]} alt={altText} />

        <p>Number of Wrong Guesses: {this.state.nWrong}</p>

        <p className='Hangman-word'>
          {!gameOver 
            ? this.guessedWord() 
            : this.state.answer}
        </p>
        
        <p className='Hangman-btns'> 
          {gameState}
          {/* {!gameOver 
            ? this.generateButtons() 
            : `You are a Looouusssser💩`}   */}
        </p>

        <button id="restart" onClick = {this.restart}>Restart Game?</button>

      </div>
    );
  }
}

export default Hangman;
