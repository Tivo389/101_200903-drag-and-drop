import React, { Component } from 'react';
import { throttle } from './Helper';

class DropItem extends Component {
  // COMPONENT VARIABLES
  axis = {xStart:0, yStart:0, xMove:0, yMove:0, xEnd:0, yEnd:0};
  className = `dropItem ${this.props.color}`;
  withinLandingZone = false;
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
      // onMouseMove={throttle(this.onMouseMove, 8)}
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
    document.body.classList.add('bodyScrollLock');
    e.currentTarget.classList.add('noTransition');
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
    e.currentTarget.classList.remove('pseudoHover');
    document.body.classList.remove('bodyScrollLock');
    e.currentTarget.classList.remove('noTransition');
    this.updateOtherDropItems(e, 'End');
    this.checkLandingZone(e);
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
  // onMouseDown = (e) => {
  //   this.mouseDown = true;
  //   if (this.mouseDown) {
  //     this.handleStart(e);
  //     window.addEventListener('mousemove', (e) => {
  //       this.onMouseMove(e)
  //     });
  //     // window.addEventListener('mouseup', this.onMouseUp(e));
  //   }
  // };
  // onMouseMove = (e) => {
  //   if (this.mouseDown) {
  //     this.handleMove(e)
  //   };
  // };
  // onMouseUp = (e) => {
  //   this.mouseDown = false;
  //   this.handleEnd(e);
  //   // window.removeEventListener('mousemove', this.onMouseMove);
  //   // window.removeEventListener('mouseup', this.onMouseUp);
  // };



  // COMPONENT FUNCTIONS
  // - Apply XY axis values to the current Drop Item
  applyAxis = (e) => {
    const xAxisMovement = this.axis.xMove - this.axis.xStart;
    const yAxisMovement = this.axis.yMove - this.axis.yStart - 8; // -8px linked to .pseudoHover
    const styleValue = `transform: translate(${xAxisMovement}px, ${yAxisMovement}px);`
    e.currentTarget.style = styleValue;
  };
  // - Check if the Drop Item is above the Landing Zone and update the component property
  checkLandingZone = (e) => {
    const lz = this.props.landingZoneArea;
    const dropItemBoundary = e.currentTarget.getBoundingClientRect();
    const dropItemCenterX = dropItemBoundary.x + (dropItemBoundary.width / 2);
    const dropItemCenterY = dropItemBoundary.y + (dropItemBoundary.height / 2);
    const withinLandingZoneX = dropItemCenterX >= lz.xOrigin && dropItemCenterX <= lz.xEnd;
    const withinLandingZoneY = dropItemCenterY >= lz.yOrigin && dropItemCenterY <= lz.yEnd;
    const withinLandingZone = withinLandingZoneX && withinLandingZoneY;
    if (withinLandingZone) {
      this.withinLandingZone = true;
    } else {
      e.currentTarget.style = "";
      this.withinLandingZone = false;
    }
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
      this.reviewAxisThreshold(xPhase, yPhase);
    } else if (phase === 'End' && this.withinLandingZone === true) {
      const regexPattern = /-?\d+/g;
      const regexMatch = e.currentTarget.style.transform.match(regexPattern);
      this.axis[xPhase] = parseFloat(regexMatch[0]);
      this.axis[yPhase] = parseFloat(regexMatch[1]);
    } else if (phase === 'End' && this.withinLandingZone === false) {
      this.axis[xPhase] = 0;
      this.axis[yPhase] = 0;
    }



  };
  // - Review the XY axis to ensure they are with the viewport min and max
  reviewAxisThreshold = (xPhase, yPhase) => {
    if (this.axis[xPhase] <= 0) {
      this.axis[xPhase] = 0;
    } else if (this.axis[xPhase] >= window.innerWidth) {
      this.axis[xPhase] = window.innerWidth;
    }
    if (this.axis[yPhase] <= 0) {
      this.axis[yPhase] = 0;
    } else if (this.axis[yPhase] >= window.innerHeight) {
      this.axis[yPhase] = window.innerHeight;
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
