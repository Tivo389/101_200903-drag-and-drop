import React, { Component } from 'react';
// import DropItemIntermediate from './DropItemIntermediate';

class DrapDropIntermediate extends Component {
  // COMPONENT VARIALBES
  state = {
    landingZoneArea: {xOrigin:0, yOrigin:0, xEnd:0, yEnd:0}
  };



  // LIFECYCLE METHODS
  componentDidMount() {
    this.getLandingZoneArea();
    this.handleWindowHeight();
    window.addEventListener('resize', this.handleWindowHeight);
  }
  componentDidUpdate() {}
  componentWillUnmount() {}



  // RENDER OF COMPONENT
  render() {
    return (
      <div className="dragDropContainerIntermediate">
        <div className="landingZoneContainer">
          <div className="itemContainer" data-zone-type="alpha">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-zone-type="beta">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-zone-type="charlie">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-zone-type="delta">
            <div className="item"></div>
          </div>
        </div>
        <div className="deliveryItemContainer">
          <div className="itemContainer" data-zone-type="delta">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-zone-type="charlie">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-zone-type="beta">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-zone-type="alpha">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
      </div>
    );
  }



  // COMPONENT FUNCTIONS
  // - Get coordinates for the Landing Zone and set State
  getLandingZoneArea = () => {
    const lzBoundary = document.querySelector('.landingZoneContainer').getBoundingClientRect();
    const landingZoneArea = { ...this.state.landingZoneArea };
    landingZoneArea['xOrigin'] = lzBoundary.x;
    landingZoneArea['yOrigin'] = lzBoundary.y;
    landingZoneArea['xEnd'] = lzBoundary.x + lzBoundary.width;
    landingZoneArea['yEnd'] = lzBoundary.y + lzBoundary.height;
    this.setState({
      landingZoneArea: landingZoneArea
    });
  };
  handleWindowHeight = () => {
    document.querySelector('.mainContainer').style = `height: ${window.innerHeight}px`;
  };
}

export default DrapDropIntermediate;
