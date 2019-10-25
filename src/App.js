import React, {Component} from 'react';
import logo from './ttt.svg';
import './App.css';
import styled, { css } from 'styled-components';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;
const Container = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  max-width: 400px;
  padding: 20px;
`;

const Grid = styled.div`
  max-width: 600px;
  width: 95%;
  background: white;
  height: 600px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  border-radius: 10px;
`;

const Square = styled.button`
  max-width: calc(600px / 3);
  width: 95%;
  border: none;
  height: calc(600px / 3);
  background: none;
`;

const calcWins = n => {
  const winsTmp  = [[],[]],
        min = [n - 1 , 0],
        max  = [(n**2) - n, (n**2) - 1],
        mult = [n - 1, +n + 1];
  // Diagonals
  for (let i = min[0]; i <= max[0]; i += mult[0]) winsTmp[0].push(i);
  for (let i = min[1]; i <= max[1]; i += mult[1]) winsTmp[1].push(i);
  // Rows
  for (let i = 0; i < n; i++) {
    const x = i*n, tmp = [];
    for (let j = 0; j < n; j++) tmp.push(x+j);
    winsTmp.push(tmp);
  };
  // Columns
  for (let i = 0; i < n; i++) {
    const tmp = [];
    for (let j = 0; j < n; j++) tmp.push(i + n*j);
    winsTmp.push(tmp);
  };
  return winsTmp;
};

const fill = n => {
  
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      scores: {x: 0, o: 0},
      players: [],
      moves: [],
      wins: [],
      turn: 'X',
      gridSize: 3
    }
  }

  didWin = () => this.state.wins.some(arr => arr.every(x => this.state.moves[x] === this.state.turn));

  handleClick = e => {
    const { turn, moves } = this.state;
    // Get position of the square that was clicked
    const square = e.target.getAttribute("data-index"),
      tmp = moves;
    
    // // Don't allow changes if the square is already claimed
    if (e.target.innerText !== '') return;
    tmp[square] = turn;
    e.target.innerText = turn;
    this.setState({ moves: tmp, turn: turn === 'X' ? '0' : 'X' });
    
    if (this.didWin(square)) {
      alert(`${turn} wins!`);
      // reset();
    } else if (!moves.includes('')) {
      alert(`It's a tie!`);
      // reset();
    };
  };

  componentDidMount() {
    this.setState({wins: calcWins(3)});
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Logo src={logo} /><br />
          <Button>Normal Button</Button>
          <Button primary>Primary Button</Button>
          <Grid>
            <Square onClick={this.handleClick} />
            <Square onClick={this.handleClick} />
            <Square onClick={this.handleClick} />
            <Square onClick={this.handleClick} />
            <Square onClick={this.handleClick} />
            <Square onClick={this.handleClick} />
            <Square onClick={this.handleClick} />
            <Square onClick={this.handleClick} />
            <Square onClick={this.handleClick} />
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;