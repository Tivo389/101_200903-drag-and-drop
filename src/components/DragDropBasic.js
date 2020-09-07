import React, { Component } from 'react';
import DropItem from './DropItem';

class DragDropBasic extends Component {
  // COMPONENT VARIALBES
  state = {
    landingZoneArea: {xOrigin:0, yOrigin:0, xEnd:0, yEnd:0}
  };



  // LIFECYCLE METHODS
  componentDidMount() {
    this.getLandingZoneArea();
  }
  componentDidUpdate() {}
  componentWillUnmount() {}



  // RENDER OF COMPONENT
  render() {
    return (
      <div className="dragDropContainer">
        <div className="landingZone"></div>
        <div className="dropItemContainer">
          <DropItem color="cyan" landingZoneArea={this.state.landingZoneArea}></DropItem>
          <DropItem color="magenta" landingZoneArea={this.state.landingZoneArea}></DropItem>
          <DropItem color="yellow" landingZoneArea={this.state.landingZoneArea}></DropItem>
        </div>
      </div>
    );
  }



  // COMPONENT FUNCTIONS
  // - Get coordinates for the Landing Zone and set State
  getLandingZoneArea = () => {
    const lzBoundary = document.querySelector('.landingZone').getBoundingClientRect();
    const landingZoneArea = { ...this.state.landingZoneArea };
    landingZoneArea['xOrigin'] = lzBoundary.x;
    landingZoneArea['yOrigin'] = lzBoundary.y;
    landingZoneArea['xEnd'] = lzBoundary.x + lzBoundary.width;
    landingZoneArea['yEnd'] = lzBoundary.y + lzBoundary.height;
    this.setState({
      landingZoneArea: landingZoneArea
    });
  };
}

export default DragDropBasic;