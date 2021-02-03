'use strict';
 

const savedList = [];
module.exports = {
  metadata: () => ({
    name: 'saveData',
    properties: {
      ship: { required: true, type: 'string' },
      shipmentList: { required:false, type:'string'}
    }
  }),
  invoke: (conversation, done) => {
    const _variable = conversation.properties().shipmentList;
    conversation.logger().info('shipment ID is ' + _variable);

    // Add label and value for each choice to JSON object
    let value = conversation.properties().ship.id;
    let data = [];
    data.push(value);
    conversation.variable('shipmentList', data);
    conversation.keepTurn(true);
    conversation.transition();
    done();
}

}
