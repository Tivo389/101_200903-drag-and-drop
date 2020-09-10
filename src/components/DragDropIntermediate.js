import React, { Component } from 'react';
import DropItemIntermediate from './DropItemIntermediate';

class DrapDropIntermediate extends Component {
  // COMPONENT VARIALBES
  state = {};


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
          <div className="landingZone" data-item-type="alpha" data-item-number="4">
            <div className="landingPad"></div>
            <div className="landingPad"></div>
            <div className="landingPad"></div>
          </div>
          <div className="landingZone" data-item-type="beta" data-item-number="3">
            <div className="landingPad"></div>
            <div className="landingPad"></div>
            <div className="landingPad"></div>
          </div>
          <div className="landingZone" data-item-type="charlie" data-item-number="2">
            <div className="landingPad"></div>
            <div className="landingPad"></div>
            <div className="landingPad"></div>
            <div className="landingPad"></div>
          </div>
          <div className="landingZone" data-item-type="delta" data-item-number="1">
            <div className="landingPad"></div>
            <div className="landingPad"></div>
          </div>
        </div>
        <div className="deliveryZoneContainer">
          <div className="deliveryItems" data-item-type="delta" data-item-number="1">
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
          </div>
          <div className="deliveryItems" data-item-type="charlie" data-item-number="2">
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
          </div>
          <div className="deliveryItems" data-item-type="beta" data-item-number="3">
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
          </div>
          <div className="deliveryItems" data-item-type="alpha" data-item-number="4">
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
            <DropItemIntermediate/>
          </div>
        </div>
      </div>
    );
  }



  // COMPONENT FUNCTIONS
  handleDeliveryItemDisplay = () => {
    const deliveryItemContainer = document.querySelector('.deliveryZoneContainer');
    const itemContainer = deliveryItemContainer.querySelectorAll('.deliveryItems');
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
