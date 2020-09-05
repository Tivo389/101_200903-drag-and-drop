import React, { Component } from 'react';

class DropItem extends Component {
  // COMPONENT VARIABLES
  className = `dropItem ${this.props.color}`;
  xAxis;
  yAxis;

  // LIFECYCLE METHODS
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  // RENDER OF COMPONENT
  render() {
    return (
      <div
      className={this.className}
      onTouchStart={this.handleOnTouchStart}
      onTouchEnd={this.handleOnTouchEnd}
      onTouchMove={this.handleOnTouchMove}>
      </div>
    );
  }

  // FUNCTIONS
  handleOnTouchStart = (e) => {
    e.currentTarget.classList.add('pseudoHover');
  };
  handleOnTouchEnd = (e) => {
    e.currentTarget.classList.remove('pseudoHover');
  };
  handleOnTouchMove = (e) => {
    if (e.touches && e.touches.length > 1) {
      return;
    } else if (window.PointerEvent) {
      if (e.targetTouches) {
        this.xAxis = Math.round(e.changedTouches[0].clientX);
        this.yAxis = Math.round(e.changedTouches[0].clientY);
      } else {
        this.xAxis = Math.round(e.clientX);
        this.yAxis = Math.round(e.clientY);
      }
    } else {
      this.xAxis = Math.round(e.clientX);
      this.yAxis = Math.round(e.clientY);
    }
    console.log(`this.xAxis: ${this.xAxis}`);
    console.log(`this.yAxis: ${this.yAxis}`);
  };
}

export default DropItem;
