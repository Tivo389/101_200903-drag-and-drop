import React, { Component } from 'react';
import DropItemIntermediate from './DropItemIntermediate';

class DrapDropIntermediate extends Component {
  // COMPONENT VARIALBES
  state = {
    landingZoneArea: {xOrigin:0, yOrigin:0, xEnd:0, yEnd:0}
  };


  // LIFECYCLE METHODS
  componentDidMount() {
    this.handleWindowHeight();
    this.handleDeliveryItemDisplay();
  }
  componentDidUpdate() {}
  componentWillUnmount() {}



  // RENDER OF COMPONENT
  render() {
    return (
      <div className="dragDropContainerIntermediate">
        <div className="landingZoneContainer">
          <div className="itemContainer" data-item-type="alpha" data-item-number="4">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-item-type="beta" data-item-number="3">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-item-type="charlie" data-item-number="2">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="itemContainer" data-item-type="delta" data-item-number="1">
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
        <div className="deliveryItemContainer">
          <div className="itemContainer" data-item-type="delta" data-item-number="1">
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
          </div>
          <div className="itemContainer" data-item-type="charlie" data-item-number="2">
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
          </div>
          <div className="itemContainer" data-item-type="beta" data-item-number="3">
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
          </div>
          <div className="itemContainer" data-item-type="alpha" data-item-number="4">
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
            <DropItemIntermediate landingZoneArea={this.state.landingZoneArea}/>
          </div>
        </div>
      </div>
    );
  }



  // COMPONENT FUNCTIONS
  handleDeliveryItemDisplay = () => {
    const deliveryItemContainer = document.querySelector('.deliveryItemContainer');
    const itemContainer = deliveryItemContainer.querySelectorAll('.itemContainer');
    itemContainer.forEach(container => {
      const itemContainerOrder = parseInt(container.attributes['data-item-number'].value);
      if (itemContainerOrder !== 1) {
        container.classList.add('inactive');
      }
    });
  };
  handleWindowHeight = () => {
    document.querySelector('.mainContainer').style = `height: ${window.innerHeight}px`;
    window.addEventListener('resize', this.handleWindowHeight);
  };
}

export default DrapDropIntermediate;
