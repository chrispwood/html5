/******************************************************************
 * Web Worker Example
 * description: churning processor time to demonstrate 
 *              multithreading.
 * author: Chris Wood
 * date: April 2, 2012
 ******************************************************************/
self.addEventListener('message',function(e) {
  var data = e.data;
  var i;

  switch(data.command) {
    case 'fibonacci':
      var value1 = 0;
      var value2 = 1;
      var currentValue = 0;

      for(i=0; i<=data.count; i++) {
        if(i==0) {
          value1 = value2 = currentValue = 0;
        }
        else if(i==1) {
          value1 = 0;
          value2 = 1;
          currentValue = value2;
        }
        else {
          currentValue = value1 + value2;
          value1 = value2;
          value2 = currentValue;
        }
      }

      self.postMessage({'value':currentValue});
      break;

    case 'idle':
      for(i=0; i<data.count; i++) {
        // One billion iterations
        for(var j=0; j<250000000; j++) {
          // just waiting
        }
      }

      self.postMessage({'value':'completed'});
      break;

    default:
      self.postMessage("Unknown Command: " + data.msg);
  }
}, false);
