import xs from 'classnames';
import React, { Component } from 'react';

export default class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      item: {},
      items: [],
      doneItems: 0
    };
  }

  onChange = (e) => {
    const newItem = {
      value: e.target.value,
      done: false
    };
  
    this.setState({ item: newItem });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.item.value) {
      this.setState({
        items: [...this.state.items, this.state.item],
        item: {
          value: ''
        }
      });  
    }
  }

  toggleComplete = (item, index) => {
    const newItems = []; //let
 
    this.state.items.forEach((value, key) => {
      if (key === index) {
        value.done = !item.done;

        this.doneItemsCounter(value.done);
      }

      newItems[key] = value;
    })

    this.setState({
      items: newItems
    })
  }

  doneItemsCounter = (increment) => {
    if (increment) {
      this.setState({
        doneItems: this.state.doneItems + 1
      })
    } else {
      this.setState({
        doneItems: this.state.doneItems - 1
      })
    }
  }

  render() {
    return (
      <>
        <div>
          <h2>TodoList</h2>
          <form onSubmit={this.onSubmit}>
            <input value={this.state.item.value || ""} type="text" onChange={this.onChange} />
            <button type="submit">Add</button> 
          </form>
          <p>{ this.state.items.length - this.state.doneItems } remaining out of { this.state.items.length } tasks</p>

          <ul>
            {
              this.state.items.map((item, index) =>
                <li
                  key={index}
                  onClick={() => this.toggleComplete(item, index)}
                  className={ xs({'is-done': item.done})}>
                  { item.value }
                </li>
              )
            }
          </ul>
        </div>
        <style>{`
          .is-done {
            text-decoration: line-through;
          }
        `}</style>
      </>
    );
  }
}