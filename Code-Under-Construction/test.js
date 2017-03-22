var assert = require('assert');
var Embark = require('embark');
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;
    
describe("functionality", function() {
  before(function(done) {
    var contractsConfig = {
      "functionality": {
        args: [100]
      }
    };
    EmbarkSpec.deployAll(contractsConfig, done);
  });

  it("string_equal check", function(done) {
    functionality.string_equal("abc","abc", function(err,result) {
      console.log(result)
      assert.equal(result, true);
      done();
    });
  });

  it("strConcat check", function(done) {
    functionality.strConcat("abc"," ","def", function(err,result) {
      console.log(result)
      assert.equal(result, "abc def");
      done();
    });
  });

  it("cordinate_convert check", function(done) {
    functionality.cordinate_convert("102.14538264829", function(err,result) {
      console.log(result)
      //assert.equal(result, true);
      done();
    });
  });

  it("compare_cordinates check", function(done) {
    functionality.compare_cordinates( [102,14538264829], [102,14538264829], function(err,result) {
      console.log(result)
      assert.equal(result,0);
      done();
    });
  });

});