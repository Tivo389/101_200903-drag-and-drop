import React, { Component } from 'react';
import { throttle } from './Helper';

class DropItem extends Component {
  // COMPONENT VARIABLES
  axis = {xStart:0, yStart:0, xMove:0, yMove:0, xEnd:0, yEnd:0};
  className = `dropItem ${this.props.color}`;
  mouseDown = false;




  // LIFECYCLE METHODS
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}




  // RENDER OF COMPONENT
  render() {
    return (
      <div
      className={this.className}
      // onMouseDown={this.onMouseDown}
      // onMouseMove={throttle(this.onMouseMove, 0)}
      // onMouseUp={this.onMouseUp}
      onTouchStart={this.onTouchStart}
      onTouchMove={throttle(this.onTouchMove, 8)}
      onTouchEnd={this.onTouchEnd}>
      </div>
    );
  }



  // HANDLER FUNCTION
  handleStart = (e) => {
    e.currentTarget.classList.add('pseudoHover');
    this.getAxis(e,'Start');
  };
  handleMove = (e) => {
    document.body.classList.add('bodyScrollLock');
    e.currentTarget.classList.add('noTransition');
    this.getAxis(e, 'Move');
    this.applyAxis(e);
  };
  handleEnd = (e) => {
    e.currentTarget.classList.remove('pseudoHover');
    document.body.classList.remove('bodyScrollLock');
    e.currentTarget.classList.remove('noTransition');
    this.getAxis(e, 'End');
  };



  // TOUCH EVENT FUNCTIONS
  onTouchStart = (e) => {
    this.handleStart(e);
  };
  onTouchMove = (e) => {
    this.handleMove(e);
  };
  onTouchEnd = (e) => {
    this.handleEnd(e);
  };



  // MOUSE EVENT FUNCTIONS
  onMouseDown = (e) => {
    this.mouseDown = true;
    if (this.mouseDown) {
      this.handleStart(e);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }
  };
  onMouseMove = (e) => {
    if (this.mouseDown) { this.handleMove(e); }
  };
  onMouseUp = () => {
    this.handleEnd();
    this.mouseDown = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };
  onMouseLeave = (e) => {
    if (this.mouseDown) { this.onMouseUp(); }
  };



  // COMPONENT FUNCTIONS
  // - Get the XY axis values based on the requested Phase
  getAxis = (e,phase) => {
    let xPhase = `x${phase}`;
    let yPhase = `y${phase}`;
    if (phase === 'Start' || (phase === 'Move' && this.axis.xEnd === 0)) {
      if (e.touches && e.touches.length > 1) {
        return;
      } else if (window.PointerEvent) {
        if (e.targetTouches) {
          this.axis[xPhase] = Math.round(e.targetTouches[0].clientX);
          this.axis[yPhase] = Math.round(e.targetTouches[0].clientY);
        } else {
          this.axis[xPhase] = Math.round(e.targetTouches[0].clientX);
          this.axis[yPhase] = Math.round(e.targetTouches[0].clientY);
        }
      } else {
        this.axis[xPhase] = Math.round(e.clientX);
        this.axis[yPhase] = Math.round(e.clientY);
      }
      this.reviewAxisThreshold(xPhase, yPhase);
    } else if (phase === 'Move' && this.axis.xEnd !== 0) {
      if (e.touches && e.touches.length > 1) {
        return;
      } else if (window.PointerEvent) {
        if (e.targetTouches) {
          this.axis[xPhase] = this.axis.xEnd + Math.round(e.targetTouches[0].clientX);
          this.axis[yPhase] = this.axis.yEnd + Math.round(e.targetTouches[0].clientY);
        } else {
          this.axis[xPhase] = this.axis.xEnd + Math.round(e.targetTouches[0].clientX);
          this.axis[yPhase] = this.axis.yEnd + Math.round(e.targetTouches[0].clientY);
        }
      } else {
        this.axis[xPhase] = this.axis.xEnd + Math.round(e.clientX);
        this.axis[yPhase] = this.axis.yEnd + Math.round(e.clientY);
      }
      this.reviewAxisThreshold(xPhase, yPhase);
    } else if (phase === 'End') {
      const regexPattern = /-?\d+/g;
      const regexMatch = e.currentTarget.style.transform.match(regexPattern);
      this.axis[xPhase] = parseFloat(regexMatch[0]);
      this.axis[yPhase] = parseFloat(regexMatch[1]);
    }
  };
  // - Review the XY axis to ensure they are with the viewport min and max
  reviewAxisThreshold = (xAxis, yAxis) => {
    if (xAxis <= 0) {
      xAxis = 0;
    } else if (xAxis >= window.innerWidth) {
      xAxis = window.innerWidth;
    }
    if (yAxis <= 0) {
      yAxis = 0;
    } else if (yAxis >= window.innerHeight) {
      yAxis = window.innerHeight;
    }
  };
  // - Apply the XY axis values to the e.currentTarget
  applyAxis = (e) => {
    const xAxisMovement = this.axis.xMove - this.axis.xStart;
    const yAxisMovement = this.axis.yMove - this.axis.yStart;
    const styleValue = `transform: translate(${xAxisMovement}px, ${yAxisMovement}px);`
    e.currentTarget.style = styleValue;
  };
}

export default DropItem;
