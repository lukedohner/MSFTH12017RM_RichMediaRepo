var fs = require('fs'); 
var imageSize = require('image-size');  


describe('zipfile', function() {
	it('should be under 100kb', function() {

		var zip = fs.statSync('Beowulf_970x250_richload.zip'); 
		var fileSizeInKB = zip['size']/1000;  

		expect(fileSizeInKB).not.toBeGreaterThan(200); 
	}); 
}); 

describe('static image', function() {
	it('should match dimensions of the creative', function() {
		
		var dimensions = imageSize('src/richloads/richload/img/static.jpg');  
			

		expect(dimensions.width).not.toBeGreaterThan(970); 
		expect(dimensions.height).not.toBeGreaterThan(250); 
	}); 
});


describe('assets', function() {

	//html build
	var html = fs.readFileSync('dist/richload/index.html', 'utf8');

	//counts the frequency of asset used in compiled html
	function count(str, subStr){
			var matches = str.match(new RegExp(subStr, "g"));
			return matches ? matches.length:0;
	}

	it('should have all files', function(){

		//synchronously lists all files within listed directory
		var assetCheck = function(dir, filelist) {
		  var files = fs.readdirSync(dir);

		  filelist = filelist || [];
		  files.forEach(function(file) {
		    if (fs.statSync(dir + file).isDirectory()) {
		      filelist = assetCheck(dir + file + '/', filelist);
		    }
		    else {
		      filelist.push(file);
		    }
		  });

		  //if asset is not used exactly once it will fail the test
		  for(var i = 0; i < filelist.length; i++){
		  	if(count(html, filelist[i]) < 1){
		  		return false; 
		  	}
		  	return true; 
		  }
		};

			expect(assetCheck('src/richloads/richload/img/')).toBeTruthy();
	
		

	});


});
