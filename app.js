var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;
var _ = require('underscore');


// List cameras / assign list item to variable to use below options
GPhoto.list(function(list){
  if(list.length === 0) return;
  var camera = list[0];
  console.log("Found", camera.model);
  
// Shell command; OS X starts the Picture-Transfer-Protocol daemon which occupies the device.

  function puts(error, stdout, stderr) { sys.puts(stdout) }
  exec("launchctl list | grep PTP", function(err, stdout){
	if(stdout){
	   exec("killall PTPCamera", puts);
	}else{
	   console.log(stdout);
	}
  });
  function canRecursive(elem){ 
	//if(_.isArray(elem) || _.isObject(elem)){
	if(_.isObject(elem)){
	   //console.log(elem)
	   return true;
	} 
	return false;
  }
  function forEach(elem){
	var jData;
	if( canRecursive(elem) ){
	   _.each(elem, function(item){
		jData += item;
		console.log(item)
		forEach(item);
           });
	return jData;
	}
  }

  // get configuration tree
  camera.getConfig(function(er, settings){
	console.log('Config:');
	console.log(forEach(settings));
	console.log(':EndConfig');
  });

  // Set configuration values
  /*camera.setConfigValue('capturetarget', 1, function(er){
    //...
  })*/

  // Take picture with camera object obtained from list()
  /*camera.takePicture({download:true}, function(er, data){
    fs.writeFile("picture.jpg", data);
  });*/

  // Take picture and download it to filesystem
  /*camera.takePicture({
      download:true,
      targetPath:"/tmp/foo.XXXXX"
    }, function(er, tmpname){
      fs.rename(tmpname, "./picture.jpg");
  });*/

  // Download a picture from camera
  /*camera.downloadPicture({
      cameraPath:'/store_00020001/DCIM/100CANON/IMG_1231.JPG',
      targetPath:'/tmp/foo.XXXXX'
    }, function(er, tmpname){
      fs.rename(tmpname, './picture.jpg');
  });*/


 // Take picture without downloading immediately - camera.takePicture({download:false}, function(er, path){ console.log("Path:", path); });
  // Get preview picture (from AF Sensor, fails silently if unsupported) - camera.getPreview(function(data){ fs.writeFile("picture.jpg", data); });
});
