/******************************************************************
 * Web Worker Example
 * description: Profiling the cost of passing memory
 * author: Chris Wood
 * date: April 4, 2012
 ******************************************************************/
self.addEventListener('message',function(e) {
  var data = e.data;
  var i=0;
  var retVal = [];

  switch(data.command) {
    case 'kb':
      var numints = 1024/4; // num bytes in kb divided by num bytes in int
      for(i=0; i<numints; i++) {
        retVal.push(i);
      }
      var time = (new Date).getTime();
      self.postMessage({'data':retVal,'time':time});
      break;
    case 'mb':
      var numints = 1048576/4; // num bytes in mb divided by num bytes in int
      for(i=0; i<numints; i++) {
        retVal.push(i);
      }
      var time = (new Date).getTime();
      self.postMessage({'data':retVal,'time':time});
      break;
    case 'tenMb':
      var numints = 10485760/4; // num bytes in 10 mb (roughly) divided by num bytes in int
      for(i=0; i<numints; i++) {
        retVal.push(i);
      }
      var time = (new Date).getTime();
      self.postMessage({'data':retVal,'time':time});
      break;
    case 'hundredMb':
      var numints = 104857600/4; // num bytes in 100 mb (roughly) divided by num bytes in int
      for(i=0; i<numints; i++) {
        retVal.push(i);
      }
      var time = (new Date).getTime();
      self.postMessage({'data':retVal,'time':time});
      break;
    case 'twoHundredMb':
      var numints = (104857600*2)/4; // num bytes in 200 mb (roughly) divided by num bytes in int
      for(i=0; i<numints; i++) {
        retVal.push(i);
      }
      var time = (new Date).getTime();
      self.postMessage({'data':retVal,'time':time});
      break;
    case 'gb':
      var counter = 0;
      var numints = 1073741824/4; // num bytes in 100 mb (roughly) divided by num bytes in int
      for(i=0; i<numints; i++) {
        if(i%100000000==0) {
          self.postMessage({'msg':"Created " + i + " integers so far (" + counter + "/10)..."});
          counter++;
        }
        retVal.push(i);
      }
      var time = (new Date).getTime();
      self.postMessage({'data':retVal,'time':time});
      break;
    default:
      self.postMessage({'msg':"Unknown Command: " + data.msg});
  }

  // force garbage collector to run
  delete retVal;
  if(typeof(CollectGarbage)=='function') {
    CollectGarbage();
  }
}, false);
