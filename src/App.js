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
        [4, 13, 14, 15],
      ],
    }
  }

  /**
   * This function get the empty position
   * @return {null}
   */
  getEmptyPosition = () => {
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

  /**
   * This function takes as a parameter iterateOn in order to iterate over it
   * and find the position provided by elementActiveOrEmpty 
   * to change the value by changeBy
   * @param tab
   * @param iterateOn
   * @param changeBy
   * @return {*}
   */
  changePosition = ({ iterateOn, elementActiveOrEmpty, changeBy }) => {
    return iterateOn.map((row, index) => {
      if (index === elementActiveOrEmpty.row) {
        return row.map((cell, index) => {
          if (index === elementActiveOrEmpty.cell) {
            return changeBy
          }
          return cell
        })
      }
      return row
    })
  }

  /**
   * First change position of the undefined element
   * Then change position of the element that the user has clicked
   * @param value
   * @param elementActive
   * @param elementEmpty
   */
  updateTab = ({ value, elementActive, elementEmpty }) => {
    const { tab } = this.state;
    const tabWithUndefinedPositionChanged = this.changePosition({
      iterateOn: tab,
      elementActiveOrEmpty: elementActive,
      changeBy: undefined
    })
    const newTab = this.changePosition({
      iterateOn: tabWithUndefinedPositionChanged,
      elementActiveOrEmpty: elementEmpty,
      changeBy: value
    })
    this.setState({
      tab: newTab
    })
  }

  isOnTheSameCell = (elementActive, elementEmpty) => {
    return elementActive.row === elementEmpty.row && elementActive.cell === elementEmpty.cell
  }

  isOnTheCorner = (elementActive, elementEmpty) => {
    if (elementActive.row-1 === elementEmpty.row && elementActive.cell+1 === elementEmpty.cell) {
      return true;
    }
    if (elementActive.row+1 === elementEmpty.row && elementActive.cell-1 === elementEmpty.cell) {
      return true;
    }
    if (elementActive.row-1 === elementEmpty.row && elementActive.cell-1 === elementEmpty.cell) {
      return true;
    }
    if (elementActive.row+1 === elementEmpty.row && elementActive.cell+1 === elementEmpty.cell) {
      return true;
    }
    return false
  }

  isNearToEmpty = (elementActive, elementEmpty) => {
    if (elementActive.row === elementEmpty.row || elementActive.row+1 === elementEmpty.row || elementActive.row-1 === elementEmpty.row) {
      if (elementActive.cell === elementEmpty.cell || elementActive.cell + 1 === elementEmpty.cell || elementActive.cell - 1 === elementEmpty.cell) {
        return true
      }
      return false;
    }
    return false;
  }

  onClickOnCell = ({ value, indexRow, indexColumn}) => {
    const elementEmpty = this.getEmptyPosition();
    const elementActive = {
      row: indexColumn,
      cell: indexRow,
    }
    if (this.isOnTheSameCell(elementActive, elementEmpty)) {
      return;
    }
    if (this.isOnTheCorner(elementActive, elementEmpty)) {
      return;
    }

    if (!this.isNearToEmpty(elementActive, elementEmpty)) {
      return;
    }
    this.updateTab({
      value,
      elementActive,
      elementEmpty
    });
  }

  displayRow = (column, indexColumn) => {
    return column.map((row, indexRow) =>  (
      <button
        key={`${generateRandomNumber()}-${row}`}
        className="button"
        onClick={() => this.onClickOnCell({
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
