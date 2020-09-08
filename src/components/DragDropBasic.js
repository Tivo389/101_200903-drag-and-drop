import React, { Component } from 'react';
import DropItemBasic from './DropItemBasic';

class DragDropBasic extends Component {
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
      <div className="dragDropContainer">
        <div className="landingZone"></div>
        <div className="dropItemContainer">
          <DropItemBasic color="cyan" landingZoneArea={this.state.landingZoneArea}></DropItemBasic>
          <DropItemBasic color="magenta" landingZoneArea={this.state.landingZoneArea}></DropItemBasic>
          <DropItemBasic color="yellow" landingZoneArea={this.state.landingZoneArea}></DropItemBasic>
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
  handleWindowHeight = () => {
    document.querySelector('.mainContainer').style = `height: ${window.innerHeight}px`;
  };
}

export default DragDropBasic;
