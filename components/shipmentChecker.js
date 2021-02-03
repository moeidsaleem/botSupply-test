"use strict"


const shipments = [{
  status: 'processing',
  date: new Date().toISOString(),
  id: 1202
},
{
  status: 'delivering',
  date: new Date().toISOString(),
  id: 4000
},
{
  status: 'declined',
  date: new Date().toISOString(),
  id: 3005
}
];

//API Integration

// const getData = fetch('atapi2.postnord.com').then(response=>{
//   console.log('response');
// })

const axios = require('axios');
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});


console.log('yo')

 
module.exports = {
 
    metadata: () => ({
        "name": "ShipmentChecker",
        "properties": {
          "minAge": { "type": "integer", "required": true },
          "shipment": { "type": "object", "required": true }
        },
        "supportedActions": [
            "allow",
            "block",
            "unsupportedPayload"
        ] 
    }),
 
    invoke: (conversation, done) => {
        // Parse a number out of the incoming message
        const text = conversation.text();
        let shipment;
        if (text){
          conversation.logger().info('item' + text);

          const matches = shipments.find(item => Number(text)===item.id);
          conversation.logger().info(matches)

          // const matches = text.match(/\d+/);
          if (matches) {
              shipment = matches;
          } else {
              conversation.invalidUserInput("Sorry! No result found. Please enter correct Tracking Number");
              done();
              return;
          }
        } else {
          conversation.transition("unsupportedPayload");
          done();
          return;
        }
 
        conversation.logger().info('AgeChecker: using shipment=' + JSON.stringify(shipment));
 
        // Set action based on age check
        // let minAge = conversation.properties().minAge || 18;
        conversation.variable(conversation.properties().shipment, shipment);
        conversation.logger().info('XXXX==> ' + conversation.properties().shipment);
        conversation.keepTurn(true);
        conversation.transition(shipment !== undefined  ? 'allow' : 'block' );
        done();
    }
};