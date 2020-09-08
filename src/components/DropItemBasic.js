import React, { Component } from 'react';
import { throttle } from './Helper';

class DropItem extends Component {
  // COMPONENT VARIABLES
  axis = {xStart:0, yStart:0, xMove:0, yMove:0, xEnd:0, yEnd:0};
  className = `dropItem ${this.props.color}`;
  withinLandingZone = false;
  mouseDown = false;
  dropItemTarget;






  // LIFECYCLE METHODS
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}







  // RENDER OF COMPONENT
  render() {
    return (
      <div
      className={this.className}
      onMouseDown={this.onMouseDown}
      onTouchStart={this.onTouchStart}
      onTouchMove={throttle(this.onTouchMove, 8)}
      onTouchEnd={this.onTouchEnd}>
      </div>
    );
  }






  // HANDLER FUNCTION
  handleStart = (e) => {
    e.currentTarget.classList.add('pseudoHover');
    e.currentTarget.classList.add('noTransition');
    document.body.classList.add('bodyScrollLock'); // Scroll Bounce prevention in Safari
    this.updateOtherDropItems(e, 'Start');
    this.getAxis(e,'Start');
  };
  handleMove = (e) => {
    this.getAxis(e, 'Move');
    this.checkLandingZone(e);
    this.updateOtherDropItems(e, 'Move');
    this.applyAxis(e);
  };
  handleEnd = (e) => {
    if (this.dropItemTarget) {
      this.dropItemTarget.classList.remove('pseudoHover');
      this.dropItemTarget.classList.remove('noTransition');
    } else {
      e.currentTarget.classList.remove('pseudoHover');
      e.currentTarget.classList.remove('noTransition');
    }
    document.body.classList.remove('bodyScrollLock');
    this.checkLandingZone(e);
    this.updateOtherDropItems(e, 'End');
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
    this.dropItemTarget = e.currentTarget;
    if (this.mouseDown) {
      this.handleStart(e);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }
  };
  onMouseMove = (e) => {
    throttle(this.handleMove(e), 8);
  };
  onMouseUp = (e) => {
    this.mouseDown = false;
    this.handleEnd(e);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };







  // COMPONENT FUNCTIONS
  // - Apply XY axis values to the current Drop Item
  applyAxis = (e) => {
    const xAxisMovement = this.axis.xMove - this.axis.xStart;
    const yAxisMovement = this.axis.yMove - this.axis.yStart - 8; // -8px linked to .pseudoHover
    const styleValue = `transform: translate(${xAxisMovement}px, ${yAxisMovement}px);`
    // // console.log(`styleValue: ${styleValue}`);
    if (this.dropItemTarget) {
      this.dropItemTarget.style = styleValue;
    } else {
      e.currentTarget.style = styleValue;
    }
  };

  // - Check if the Drop Item is above the Landing Zone and update the component property
  checkLandingZone = (e) => {
    const lz = this.props.landingZoneArea;
    let dropItemBoundary;
    if (this.dropItemTarget) {
      dropItemBoundary = this.dropItemTarget.getBoundingClientRect();
    } else {
      dropItemBoundary = e.currentTarget.getBoundingClientRect();
    }
    const dropItemCenterX = dropItemBoundary.x + (dropItemBoundary.width / 2);
    const dropItemCenterY = dropItemBoundary.y + (dropItemBoundary.height / 2);
    const withinLandingZoneX = dropItemCenterX >= lz.xOrigin && dropItemCenterX <= lz.xEnd;
    const withinLandingZoneY = dropItemCenterY >= lz.yOrigin && dropItemCenterY <= lz.yEnd;
    const withinLandingZone = withinLandingZoneX && withinLandingZoneY;
    if (withinLandingZone) {
      this.withinLandingZone = true;
    } else {
      if (this.dropItemTarget) {
        this.dropItemTarget.style = "";
      } else {
        e.currentTarget.style = "";
      }
      this.withinLandingZone = false;
    }
    // console.log(`this.withinLandingZone: ${this.withinLandingZone}`);
  };

  // - Get the XY axis values based on the requested Phase
  getAxis = (e,phase) => {
    let eClientX;
    let eClientY;
    let eTargetTouchesClientX;
    let eTargetTouchesClientY;
    let xPhase = `x${phase}`;
    let yPhase = `y${phase}`;
    const initialMovement = this.axis.xEnd === 0;
    const subsequentMovement = this.axis.xEnd !== 0;
    // - Define variables
    if (phase === 'Start' || (phase === 'Move' && initialMovement)) {
      if (e.touches && e.touches.length > 1) {
        return;
      } else if (window.PointerEvent) {
        if (e.targetTouches) {
          eTargetTouchesClientX = Math.round(e.targetTouches[0].clientX);
          eTargetTouchesClientY = Math.round(e.targetTouches[0].clientY);
        } else {
          eClientX = Math.round(e.clientX);
          eClientY = Math.round(e.clientY);
        }
      } else {
        eClientX = Math.round(e.clientX);
        eClientY = Math.round(e.clientY);
      }
    } else if (phase === 'Move' && subsequentMovement) {
      if (e.touches && e.touches.length > 1) {
        return;
      } else if (window.PointerEvent) {
        if (e.targetTouches) {
          eTargetTouchesClientX = this.axis.xEnd + Math.round(e.targetTouches[0].clientX);
          eTargetTouchesClientY = this.axis.yEnd + Math.round(e.targetTouches[0].clientY);
        } else {
          eClientX = this.axis.xEnd + Math.round(e.clientX);
          eClientY = this.axis.yEnd + Math.round(e.clientY);
        }
      } else {
        eClientX = this.axis.xEnd + Math.round(e.clientX);
        eClientY = this.axis.yEnd + Math.round(e.clientY);
      }
    }
    // - Value Checker For Debugging
    // console.log(`eClientX: ${eClientX}`);
    // console.log(`eClientY: ${eClientY}`);
    // console.log(`eTargetTouchesClientX: ${eTargetTouchesClientX}`);
    // console.log(`eTargetTouchesClientY: ${eTargetTouchesClientY}`);
    // - If Statements to determine return value
    if (phase === 'Start' || phase === 'Move') {
      if (e.touches && e.touches.length > 1) {
        return;
      } else if (window.PointerEvent) {
        if (e.targetTouches) {
          this.axis[xPhase] = eTargetTouchesClientX;
          this.axis[yPhase] = eTargetTouchesClientY;
        } else {
          this.axis[xPhase] = eClientX;
          this.axis[yPhase] = eClientY;
        }
      } else {
        this.axis[xPhase] = eClientX;
        this.axis[yPhase] = eClientY;
      }
    } else if (phase === 'End' && this.withinLandingZone === true) {
      let regexMatch;
      const regexPattern = /-?\d+/g;
      if (this.dropItemTarget) {
        regexMatch = this.dropItemTarget.style.transform.match(regexPattern);
      } else {
        regexMatch = e.currentTarget.style.transform.match(regexPattern);
      }
      this.axis[xPhase] = parseFloat(regexMatch[0]);
      this.axis[yPhase] = parseFloat(regexMatch[1]);
    } else if (phase === 'End' && this.withinLandingZone === false) {
      this.axis[xPhase] = 0;
      this.axis[yPhase] = 0;
    }
  };

  // - Once a Drop Item is selected, update the class of the unselected Items and Landing Zone
  updateOtherDropItems = (e, phase) => {
    const allItems = document.querySelector('.dropItemContainer').querySelectorAll('.dropItem');
    const landingZone = document.querySelector('.landingZone');
    if (phase === 'Start') {
      allItems.forEach(item => {
        if (item !== e.currentTarget) item.classList.add('inactive');
      });
      landingZone.classList.add('active');
    } else if (phase === 'Move') {
      if (this.withinLandingZone) {
        landingZone.classList.add('withinLandingZone');
        landingZone.classList.remove('active');
      } else {
        landingZone.classList.remove('withinLandingZone');
        landingZone.classList.add('active');
      }
    } else if (phase === 'End') {
      allItems.forEach(item => {
        if (item !== e.currentTarget) item.classList.remove('inactive');
      });
      landingZone.classList.remove('active');
      landingZone.classList.remove('withinLandingZone');
    }
  };
}

export default DropItem;
