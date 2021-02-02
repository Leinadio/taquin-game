import React from 'react';
import './App.css';

function generateRandomNumber() {
  return Math.floor(Math.random() * 100)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [
        [2, 3, undefined, 10],
        [8, 9, 6, 12],
        [7, 1, 5, 11],
        [16, 13, 14, 15],
      ],
    }
  }

  searchEmptyPosition = () => {
    const { tab } = this.state;
    let elementEmpty = null
    tab.forEach((el, index) => {
      const positionOnRow = el.findIndex((cell) => !cell)
      if (positionOnRow === -1) {
        return;
      }
      elementEmpty = {
        row: index,
        cell: positionOnRow,
      }
    })
    return elementEmpty;
  }

  changePosition = ({ value, elementActive, elementEmpty }) => {
    const { tab } = this.state;
    const a = tab.map((row, index) => {
      if (index === elementActive.row) {
        return row.map((cell, index) => {
          if (index === elementActive.cell) {
            return undefined
          }
          return cell
        })
      }
      return row
    })
    const b = a.map((row, index) => {
      if (index === elementEmpty.row) {
        return row.map((cell, index) => {
          if (index === elementEmpty.cell) {
            return value
          }
          return cell
        })
      }
      return row
    })
    this.setState({
      tab: b
    })
  }

  isNearToEmpty = ({ value, indexRow, indexColumn}) => {
    const elementEmpty = this.searchEmptyPosition();
    const elementActive = {
      row: indexColumn,
      cell: indexRow,
    }
    // On the same cell
    if (elementActive.row === elementEmpty.row && elementActive.cell === elementEmpty.cell) {
      return;
    }

    // On the diagonal
    if (elementActive.row-1 === elementEmpty.row && elementActive.cell+1 === elementEmpty.cell) {
      return;
    }
    if (elementActive.row+1 === elementEmpty.row && elementActive.cell-1 === elementEmpty.cell) {
      return;
    }
    if (elementActive.row-1 === elementEmpty.row && elementActive.cell-1 === elementEmpty.cell) {
      return;
    }
    if (elementActive.row+1 === elementEmpty.row && elementActive.cell+1 === elementEmpty.cell) {
      return;
    }

    if (elementActive.row === elementEmpty.row || elementActive.row+1 === elementEmpty.row || elementActive.row-1 === elementEmpty.row) {
      if (elementActive.cell === elementEmpty.cell || elementActive.cell+1 === elementEmpty.cell || elementActive.cell-1 === elementEmpty.cell) {
        this.changePosition({
          value,
          elementActive,
          elementEmpty
        });
      }
    }
  }

  displayRow = (column, indexColumn) => {
    return column.map((row, indexRow) =>  (
      <button
        key={`${generateRandomNumber()}-${row}`}
        className="button"
        onClick={() => this.isNearToEmpty({
          value: row,
          indexRow,
          indexColumn
        })}
      >
        {row}
      </button>
    ))
  }

  displayColumn = (tab) => {
    return tab.map((column, indexColumn) => (
      <div key={`${generateRandomNumber()}-${indexColumn}`} className="column">
        {this.displayRow(column, indexColumn)}
      </div>
    ));
  }

  render() {
    const { tab } = this.state;
    return (
      <div className="App">
        <div className="container">
          <h1 className="title">Jeu de Taquin</h1>
          <div className="game">
            {this.displayColumn(tab)}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
