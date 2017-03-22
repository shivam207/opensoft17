var assert = require('assert');
var Embark = require('embark');
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;

describe("ethPhoto", function() {
  before(function(done) {
    var contractsConfig = {
      "ethPhoto": {
      }
    };
    EmbarkSpec.deployAll(contractsConfig, done);
  });

  it("should set constructor value", function(done) {
    ethPhoto.getNoofImages(function(err, result) {
      assert.equal(result.toNumber(), 0);
      done();
    });
  });


/*it("string concatenate", function(done) {
    ethPhoto.strConcat("akhil"," ","open",function(err, result) {
      assert.equal(result,"akhil open");
      done();
    });
  });

*/

   it("setting image", function(done) {
	    ethPhoto.saveImage("abcd",0,function() {
	      //ethPhoto.getImage("2.84","3.96",function(err, result) {
	        //assert.equal(result, "abcd");
	      ethPhoto.saveImage1("2.3","3.8",function() {

	      	ethPhoto.getNoofImages(function(err, result) {
	      	console.log(result.toNumber(),1)
	      	assert.equal(result.toNumber(),1);
	       done();

	      });  
	      
	      });
	    });
	  });
	

   it("setting image 2", function(done) {
	    ethPhoto.saveImage("akhil",1,function() {
	      //ethPhoto.getImage("2.84","3.96",function(err, result) {
	        //assert.equal(result, "abcd");
	      ethPhoto.saveImage1("2.3","3.8",function() {

	      	ethPhoto.getNoofImages(function(err, result) {
	      	//console.log(result,typeof result)
	      	assert.equal(result.toNumber(), 2);
	        done();

	      });  
	      
	      });
	    });
	  });

   it("setting image 3", function(done) {
	    ethPhoto.saveImage("abhishek",1,function() {
	      //ethPhoto.getImage("2.84","3.96",function(err, result) {
	        //assert.equal(result, "abcd");
	      ethPhoto.saveImage1("20","25",function() {

	      	ethPhoto.getNoofImages(function(err, result) {
	      	//console.log(result,typeof result)
	      	assert.equal(result.toNumber(), 3);
	        done();

	      });  
	      
	      });
	    });
	  });




 it("checking savedImage", function(done) {
    	ethPhoto.getImage("2.3","3.8",function(err, result) {
     	console.log(result,typeof result);
     	//console.log(result[0],typeof result[0]);    
        assert.equal(result, "abcd akhil");
        //assert.equal(result[1][0], "check");
     	
     	done();
    });
  });

/*

  it("testing string to int", function(done) {
    	ethPhoto.stringToUint("2",function(err, result) {
     	console.log(result.toNumber(),typeof result);
     	//console.log(result[0],typeof result[0]);    
        //assert.equal(result, "abcd akhil abhishek");
        //assert.equal(result[1][0], "check");
     	
     	//done();
    });
    	ethPhoto.stringToUint("4",function(err, result) {
     	console.log(result.toNumber(),typeof result);
     	//console.log(result[0],typeof result[0]);    
        //assert.equal(result, "abcd akhil abhishek");
        //assert.equal(result[1][0], "check");
     	
     	done();
    });
  });
*/




  it("testing compare function", function(done) {
    	ethPhoto.compareValues("1","10",function(err, result) {
     	console.log(result,typeof result);
     	//console.log(result[0],typeof result[0]);    
        //assert.equal(result, "abcd akhil abhishek");
        //assert.equal(result[1][0], "check");
     	
     	done();
    });
  });





 it("checking longitiude-latitude", function(done) {
    	ethPhoto.browseImageOnMap("10","10","1","1",function(err, result) {
     	console.log(result,typeof result);
     	//console.log(result[0],typeof result[0]);    
        //assert.equal(result, "abcd akhil abhishek");
        //assert.equal(result[1][0], "check");
     	
     	done();
    });
  });




/*
	it("Deleting savedImage", function(done) {
    	ethPhoto.deleteImage("abcd",function(err, result) {
       
        assert.equal(result[0].toNumber(), 1);
     	assert.equal(result[1].toNumber(), 0);
     	
     	done();
    });
  });
	*/

});
