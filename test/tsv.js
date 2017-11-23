/* global describe, it */
"use strict";
var should = require('should') // eslint-disable-line no-unused-vars
  , CSV = require('../lib/csv.js');

describe('TSV', function () {
  describe('fetch()', function () {
    it('should #1', function() {
      var obj = CSV.fetch("a\tb\tc", "\t");
      obj.should.eql(['a', 'b', 'c']);
    });
    it('should #1a', function() {
      var obj = CSV.fetch('a \t,b \t c\n', "\t");
      obj.should.eql(['a ', ',b ', ' c']);
    });
    it('should #1b', function() {
        var obj = CSV.fetch('"a "\t"\tb "\t" c\n"', "\t");
        obj.should.eql(['a ', '\tb ', ' c\n']);
    });
    it('should #1c', function() {
      var obj = CSV.fetch('"a" \t "b" \t "c" \n', "\t");
      obj.should.eql(['a', 'b', 'c']);
    });
    it('should #2', function() {
      var obj = CSV.fetch("a\tb\tc\nd\te", "\t");
      obj.should.eql(['a', 'b', 'c']);
    });
    it('should #3', function() {
      var obj = CSV.fetch('a\tb\t"c\nd"\te', "\t");
      obj.should.eql(['a', 'b', 'c\nd', 'e']);
    });
    it('should #4', function() {
      var obj = CSV.fetch('a\tb\t"c\n', "\t");
      obj.should.eql(['a', 'b']);
    });
    it('should #5', function() {
        var obj = CSV.fetch('"a\ta"\t"b\tb"\t"c"', "\t");
        obj.should.eql(['a\ta', 'b\tb', 'c']);
    });
    it('should #5b', function() {
        var obj = CSV.fetch('"a\ta" \t  "b\tb"\t"c"', "\t");
        obj.should.eql(['a\ta', 'b\tb', 'c']);
    });
    it('should #5c', function() {
        var obj = CSV.fetch('"a\ta"\t\t"c"', "\t");
        obj.should.eql(['a\ta', '', 'c']);
    });
    it('should #6', function() {
        var obj = CSV.fetch("a'a;b;;c\nd\te\tf\tg", ';');
        obj.should.eql(["a'a", 'b', '', 'c']);
    });
    it('should #7', function() {
        var obj = CSV.fetch('a\tb\tc\r\n"d"\t"e"\t"f"', "\t");
        obj.should.eql(['a', 'b', 'c']);
    });
    it('should #8', function() {
      var obj = CSV.fetch('a\t"b\tb""b\tb""b"\tc\r\nd\te\tf', "\t");
      obj.should.eql(['a', 'b\tb"b\tb"b', 'c']);
    });
    it('should #9', function () {
      var obj = CSV.fetch('a\t"b1\t""b2""b3\tb4"""""\tc\r\nd\te\tf', "\t");
      obj.should.eql(['a', 'b1\t"b2"b3\tb4""', 'c']);
    });
    it('should #10', function () {
      var obj = CSV.fetch("a\t\"b1\t\"\"b2\"\"b3\tb4\"\"\"\"b5\r\nb6\"\r\nc\td", "\t");
      obj.should.eql(['a', "b1\t\"b2\"b3\tb4\"\"b5\r\nb6"]);
    });
    it('should #10bis', function () {
      var obj = CSV.fetch("a\t\"b1\t\"\"b2\"\"b3\tb4\"\"\"\"b5\nb6\"  \r\nc\td", "\t");
      obj.should.eql(['a', "b1\t\"b2\"b3\tb4\"\"b5\nb6"]);
    });
    it('should #10ter', function () {
      var obj = CSV.fetch("a\t\"b1\t\"\"b2\"\"b3\tb4\"\"\"\"b5\nb6\" \tc\r\n\td", "\t");
      obj.should.eql(['a', "b1\t\"b2\"b3\tb4\"\"b5\nb6", 'c']);
    });
    it('should #11', function () {
      var obj = CSV.fetch("a\t\"\tb\"\tc\r\n\td", "\t");
      obj.should.eql(['a', '\tb', 'c']);
    });
    it('should #12', function () {
      var obj = CSV.fetch('a\t"b"\tc\r\na\t"b""b"\tc', "\t");
      obj.should.eql(['a', 'b', 'c']);
    });
    it('should get simple fields containing double quotes #13', function () {
      var obj = CSV.fetch('a\tthis "should" work\tb', "\t");
      obj.should.eql(['a', 'this "should" work', 'b']);
    });
    it('should get simple fields containing doubled simple quotes #14', function () {
      var obj = CSV.fetch("a\tb''b\tc", "\t");
      obj.should.eql(['a', "b''b", 'c']);
    });
  });

    /*
    describe('#1 forEach()', function () {
        it('should', function() {
            var i = 0;
            CSV.forEach('a,b,c\nd,e,f\ng,h,i', function(row, index) {
                index.should.equal(i++);
                if (index == 0) {
                  row.should.eql(['a','b','c']);
                }
                else if (index == 1) {
                  row.should.eql(['d','e','f']);
                }
                else if (index == 2) {
                  row.should.eql(['g','h','i']);
                }
            });
          }
        );
      }
    );
    describe('#2 forEach()', function () {
        it('should', function() {
            var i = 0;
            CSV.forEach('a,b,c\nd,e,f\ng,h,i', ',', function(row, index) {
                index.should.equal(i++);
                if (index == 0) {
                  row.should.eql(['a','b','c']);
                }
                else if (index == 1) {
                  row.should.eql(['d','e','f']);
                }
                else if (index == 2) {
                  row.should.eql(['g','h','i']);
                }
            });
          }
        );
      }
    );
     describe('#3 forEach()', function () {
        it('should', function() {
            var i = 0;
            CSV.forEach('a,b,c\nd,e,f\ng,h', ',', function(row, index) {
                index.should.equal(i++);
                if (index == 0) {
                  row.should.eql(['a','b','c']);
                }
                else if (index == 1) {
                  row.should.eql(['d','e','f']);
                }
                else if (index == 2) {
                  row.should.eql(['g','h']);
                }
            });
          }
        );
      }
    );

    describe('#1 parse()', function () {
        it('should', function() {
            var obj = CSV.parse('a,b,c\nd,e,f\ng,h,i');
            obj[0].should.eql(['a','b','c']);
            obj[1].should.eql(['d','e','f']);
            obj[2].should.eql(['g','h','i']);
          }
        );
      }
    );

    describe('#2 parse()', function () {
      it('should handle escaped quotes in a cell', function () {
        var data = 'a,b,c,1,"hello ""world""",12,14'
        var cols = CSV.parse(data)[0]
        cols.length.should.equal(7)
        var expected = ['a','b','c','1','hello "world"', '12', '14']
        JSON.stringify(cols).should.equal(JSON.stringify(expected))
      })
    });

    describe('#3 parse()', function () {
      it('should handle escaped quotes in a cell', function () {
        var data = 'a,b,c,1,"hello, ""world""",12,14'
        var cols = CSV.parse(data)[0]
        cols.length.should.equal(7)
        var expected = ['a','b','c','1','hello, "world"', '12', '14']
        JSON.stringify(cols).should.equal(JSON.stringify(expected))
      })
    });

    describe('#4 parse()', function () {
        it('should detect the separator if not provided as a parameter', function() {
            var obj = CSV.parse('a;b;c\nd;e;f\ng;h;i');
            obj[0].should.eql(['a','b','c']);
            obj[1].should.eql(['d','e','f']);
          }
        );
      }
    );

    describe('#1 detect()', function () {
        it('should', function() {
            CSV.detect('a,b,c\nd,e,f\ng,h,i').should.equal(',');
            CSV.detect('a;b;c\nd;e;f\ng;h;i').should.equal(';');
            CSV.detect('a|b|c\nd|e|f\ng|h|i').should.equal('|');
            CSV.detect('a\tb\tc\nd\te\tf\ng\th\ti').should.equal('\t');
          }
        );
      }
    );

    describe('#0 readAll()', function () {
        it('should', function() {

            CSV.readAll("A,B,C\nD,E,F", function(rows) {
                rows.should.includeEql(['A', 'B', 'C'])
                rows.should.includeEql(['D', 'E', 'F'])
            });
          }
        );
      }
    );

    describe('#1 readAll()', function () {
        it('should', function() {

            CSV.readAll("A,B,C\nD,E,F\n", function(rows) {
                rows.should.includeEql(['A', 'B', 'C'])
                rows.should.includeEql(['D', 'E', 'F'])
            });
          }
        );
      }
    );

    describe('#2 readAll()', function () {
        it('should', function() {
            CSV.readAll("A,B,C\nD,E,\"F\n", function(rows) {
                rows.should.includeEql(['A', 'B', 'C'])
                rows.should.not.includeEql(['D', 'E', 'F'])
            });
          }
        );
      }
    );

    describe('#3 readAll()', function () {
        it('should', function() {
            CSV.readAll("A,B,C\nD,E", function(rows) {
                rows.should.includeEql(['A', 'B', 'C'])
                rows.should.includeEql(['D', 'E'])
            });
          }
        );
      }
    );

    describe('#1 readChunk()', function () {
        it('should', function() {

            CSV.readChunk("A,B,C\nD,E,F", function(rows) {
                rows.should.includeEql(['A', 'B', 'C'])
                rows.should.not.includeEql(['D', 'E', 'F'])
            });
          }
        );
      }
    );

    describe('#2 readChunk()', function () {
        it('should', function() {
            CSV.readChunk("A,B,C\nD,E,\"F\n", function(rows) {
                rows.should.includeEql(['A', 'B', 'C'])
                rows.should.not.includeEql(['D', 'E', 'F'])
            });
          }
        );
      }
    );

    describe('#3 readChunk()', function () {
        it('should', function() {
            CSV.readChunk("A,B,C\nD,E", function(rows) {
                rows.should.includeEql(['A', 'B', 'C'])
                rows.should.not.includeEql(['D', 'E'])
            });
          }
        );
      }
    );



    /* */
  }
);
