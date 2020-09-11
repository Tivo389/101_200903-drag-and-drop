import React, { Component } from 'react';
import { throttle } from './Helper';

class DropItemIntermediate extends Component {
  // COMPONENT VARIABLES
  cursorAxis = {xStart:0, yStart:0, xMove:0, yMove:0, xEnd:0, yEnd:0};
  deliveryItemNumber;
  dropItemTarget;
  mouseDown = false;
  targetLandingPadsDOM;
  validLandingPads = [];
  validLandingPadIndex;
  withinLandingZone = false;






  // LIFECYCLE METHODS
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}







  // RENDER OF COMPONENT
  render() {
    return (
      <div
      className="deliveryItem"
      // onMouseDown={this.onMouseDown}
      onTouchStart={this.onTouchStart}
      onTouchMove={throttle(this.onTouchMove, 8)}
      onTouchEnd={this.onTouchEnd}>
      </div>
    );
  }






  // HANDLER FUNCTION
  handleStart = (e) => {
    document.body.classList.add('bodyScrollLock'); // Scroll Bounce prevention in Safari
    this.updateOtherElements(e, 'Start');
    this.getCursorAxis(e,'Start');
    this.defineLandingPads();
  };
  handleMove = (e) => {
    this.getCursorAxis(e, 'Move');
    this.getLandingPadCoordinates(e);
    this.updateOtherElements(e, 'Move');
    // this.applyAxis(e);
  };
  handleEnd = (e) => {
    document.body.classList.remove('bodyScrollLock');
    this.updateOtherElements(e, 'End');
    // if (this.dropItemTarget) {
    //   this.dropItemTarget.classList.remove('pseudoHover');
    //   this.dropItemTarget.classList.remove('noTransition');
    // } else {
    //   e.currentTarget.classList.remove('pseudoHover');
    //   e.currentTarget.classList.remove('noTransition');
    // }
    // this getLandingPadCoordinates(e);
    // this.getCursorAxis(e, 'End');
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
  //   this.dropItemTarget = e.currentTarget;
  //   if (this.mouseDown) {
  //     this.handleStart(e);
  //     window.addEventListener('mousemove', this.onMouseMove);
  //     window.addEventListener('mouseup', this.onMouseUp);
  //   }
  // };
  // onMouseMove = (e) => {
  //   throttle(this.handleMove(e), 8);
  // };
  // onMouseUp = (e) => {
  //   this.mouseDown = false;
  //   this.handleEnd(e);
  //   window.removeEventListener('mousemove', this.onMouseMove);
  //   window.removeEventListener('mouseup', this.onMouseUp);
  // };







  // COMPONENT FUNCTIONS
  // - Apply XY axis values to the current Drop Item
  applyAxis = (e) => {
    const xAxisMovement = this.cursorAxis.xMove - this.cursorAxis.xStart;
    const yAxisMovement = this.cursorAxis.yMove - this.cursorAxis.yStart;
    const styleValue = `transform: translate(${xAxisMovement}px, ${yAxisMovement}px);`
    // // console.log(`styleValue: ${styleValue}`);
    if (this.dropItemTarget) {
      this.dropItemTarget.style = styleValue;
    } else {
      e.currentTarget.style = styleValue;
    }
  };

  // - Check if the Drop Item is above a valid Landing Pad. If so, assign the Pad index.
  getLandingPadCoordinates = (e) => {
    this.validLandingPads.forEach((landingPad, i) => {
      const cursorAxisX = this.cursorAxis.xMove;
      const cursorAxisY = this.cursorAxis.yMove;
      const validAxisX = (cursorAxisX >= landingPad.xOrigin) && (cursorAxisX <= landingPad.xEnd);
      const validAxisY = (cursorAxisY >= landingPad.yOrigin) && (cursorAxisY <= landingPad.yEnd);
      const validLandingPad = validAxisX && validAxisY;
      if (validLandingPad) {
        this.validLandingPadIndex = i;
        this.validLandingPads[i].activeLandingPad = true;
      } else {
        this.validLandingPads[i].activeLandingPad = false;
      };
    });
    // console.log(`this.validLandingPadIndex: ${this.validLandingPadIndex}`);
    // this.validLandingPads.forEach(landingPad => console.log(landingPad.activeLandingPad));
  };

  // - Once the Drop Item is selected, define the Coordinates for each Landing Pad.
  defineLandingPads = () => {
    const allLandingPads = this.targetLandingPadsDOM.querySelectorAll('.landingPad');
    allLandingPads.forEach((landingPad, i) => {
      this.validLandingPads[i] = {
        xOrigin: landingPad.getBoundingClientRect().x,
        yOrigin: landingPad.getBoundingClientRect().y,
        xEnd: landingPad.getBoundingClientRect().x + landingPad.getBoundingClientRect().width,
        yEnd: landingPad.getBoundingClientRect().y + landingPad.getBoundingClientRect().height
      };
    });
    // console.log(this.validLandingPads);
  };

  // - Get the XY axis values based on the requested Phase
  getCursorAxis = (e,phase) => {
    let eClientX;
    let eClientY;
    let eTargetTouchesClientX;
    let eTargetTouchesClientY;
    let xPhase = `x${phase}`;
    let yPhase = `y${phase}`;
    const initialMovement = this.cursorAxis.xEnd === 0;
    const subsequentMovement = this.cursorAxis.xEnd !== 0;
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
          eTargetTouchesClientX = this.cursorAxis.xEnd + Math.round(e.targetTouches[0].clientX);
          eTargetTouchesClientY = this.cursorAxis.yEnd + Math.round(e.targetTouches[0].clientY);
        } else {
          eClientX = this.cursorAxis.xEnd + Math.round(e.clientX);
          eClientY = this.cursorAxis.yEnd + Math.round(e.clientY);
        }
      } else {
        eClientX = this.cursorAxis.xEnd + Math.round(e.clientX);
        eClientY = this.cursorAxis.yEnd + Math.round(e.clientY);
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
          this.cursorAxis[xPhase] = eTargetTouchesClientX;
          this.cursorAxis[yPhase] = eTargetTouchesClientY;
        } else {
          this.cursorAxis[xPhase] = eClientX;
          this.cursorAxis[yPhase] = eClientY;
        }
      } else {
        this.cursorAxis[xPhase] = eClientX;
        this.cursorAxis[yPhase] = eClientY;
      }
    } else if (phase === 'End' && this.withinLandingZone === true) {
      let regexMatch;
      const regexPattern = /-?\d+/g;
      if (this.dropItemTarget) {
        regexMatch = this.dropItemTarget.style.transform.match(regexPattern);
      } else {
        regexMatch = e.currentTarget.style.transform.match(regexPattern);
      }
      this.cursorAxis[xPhase] = parseFloat(regexMatch[0]);
      this.cursorAxis[yPhase] = parseFloat(regexMatch[1]);
    } else if (phase === 'End' && this.withinLandingZone === false) {
      this.cursorAxis[xPhase] = 0;
      this.cursorAxis[yPhase] = 0;
    }
  };

  // - Once a Drop Item is selected, update the class of the unselected Items and Landing Zone
  updateOtherElements = (e, phase) => {
    const deliveryItemParent = e.currentTarget.parentElement;
    const allDeliveryItems = deliveryItemParent.querySelectorAll('.deliveryItem');
    const landingZoneContainer = document.querySelector('.landingZoneContainer');
    const allLandingPadsDOM = landingZoneContainer.querySelectorAll('.landingZone');
    const allTargetLandingPads = this.targetLandingPadsDOM;

    // - Add active/inactive class to the delivery items
    this.deliveryItemNumber = parseInt(deliveryItemParent.attributes['data-item-number'].value);
    allDeliveryItems.forEach(item => {
      if (phase === 'Start' && item !== e.currentTarget) {
        item.classList.add('inactive');
      } else if (phase === 'End' && item !== e.currentTarget) {
        item.classList.remove('inactive');
      }
    });

    // - Add active/inactive class to the Landing Zones
    allLandingPadsDOM.forEach(landingZone => {
      this.targetZoneNumber = parseInt(landingZone.attributes['data-item-number'].value)
      const notSameNumber = this.targetZoneNumber !== this.deliveryItemNumber;
      const sameNumber = this.targetZoneNumber === this.deliveryItemNumber;
      if (phase === 'Start' && sameNumber) {
        this.targetLandingPadsDOM = landingZone;
      } else  if (phase === 'Start' && notSameNumber) {
        landingZone.classList.add('inactive');
      } else if (phase === 'End' && sameNumber) {
        this.targetLandingPadsDOM = null;
      } else if (phase === 'End' && notSameNumber) {
        landingZone.classList.remove('inactive');
      }
    });

    // - Add active/inactive class to Landing Pad
    if (phase === 'Move') {
      const padStatus = [];
      this.validLandingPads.forEach(landingPad => padStatus.push(landingPad.activeLandingPad));
      const activePadPresent = padStatus.includes(true);
      if (activePadPresent) {
        // console.log('There is an active pad');
        allTargetLandingPads.childNodes.forEach((landingPad, i) => {
          if (i !== this.validLandingPadIndex) landingPad.classList.add('inactive');
        });
      } else if (!activePadPresent) {
        // console.log('There are no active pads');
        allTargetLandingPads.childNodes.forEach((landingPad) => {
          landingPad.classList.remove('inactive');
        });
      }
    };
  };
}

export default DropItemIntermediate;
