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

  it("insert_elem check", function(done) {
    functionality.return_size(function(err,result4) {
      console.log(result4)
      functionality.insert_elem("102.14538264829", function(err,result) {
        functionality.insert_elem2("102.14538264829", "image1hash", function(err,result) {
          functionality.insert_elem3(12, function(err,result) {
            functionality.return_size(function(err,result2) {
              console.log(result2)
              done();
            });
          });
        });
      });
    });
  });

  it("show_entries check", function(done) {
    functionality.show_entries(function(err,result) {
      console.log(result)
      done();
    });
  });

  it("insert_elem check", function(done) {
    functionality.insert_elem("102.14538264829", function(err,result) {
      functionality.insert_elem2("101.14538264829", "image2hash", function(err,result) {
        functionality.insert_elem3(11, function(err,result) {
          functionality.return_size(function(err,result2) {
            console.log(result2)
            done();
          });
        });
      });
    });
  });

  it("show_entries check", function(done) {
    functionality.show_entries(function(err,result) {
      console.log(result)
      done();
    });
  });

  it("insert_elem check", function(done) {
    functionality.insert_elem("102.14538264829", function(err,result) {
      functionality.insert_elem2("100.14538264829", "image3hash", function(err,result) {
        functionality.insert_elem3(10, function(err,result) {
          functionality.return_size(function(err,result2) {
            console.log(result2)
            done();
          });
        });
      });
    });
  });

  it("show_entries check", function(done) {
    functionality.show_entries(function(err,result) {
      console.log(result)
      done();
    });
  });

  it("direct_search check", function(done) {
    functionality.direct_search("102.14538264829", "120.14538264829", function(err,result) {
      console.log(result)
      done();
    });
  });

  it("range_search check", function(done) {
    functionality.range_search("99.14538264829", "90.14538264829","109.14538264829", "101.14538264829", function(err,result) {
      console.log(result)
      done();
    });
  });

});