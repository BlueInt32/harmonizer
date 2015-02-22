var assert = require("assert");
describe('Array', function(){
	before('some description 1', function(){
		// runs before all tests in this block
		console.log("runs before all tests in this block");
	});
	after('some description 2', function(){
		// runs after all tests in this block
		console.log("runs after all tests in this block");
	});
	beforeEach('some description 3', function(){
		// runs before each test in this block
		console.log("runs before each test in this block");
	});
	afterEach('some description 4', function(){
		// runs after each test in this block
		console.log("runs after each test in this block");
	});
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
			assert.equal(-1, [1, 2, 3].indexOf(5));
			assert.equal(-1, [1, 2, 3].indexOf(0));
		});
		it('should return -1 when the value is not present', function(){
			assert.equal(-1, [1, 2, 3].indexOf(5));
			assert.equal(-1, [1, 2, 3].indexOf(0));
		});
	});
});
describe('other', function(){
	it('should return 10 when the value is not present', function(){
			assert.equal(-1, [1, 2, 3].indexOf(5));
			assert.equal(-1, [1, 2, 3].indexOf(0));
		});
});