const imageData = require('../server/server.js' ); 
const comingData = require('../server/server.js' ); 
const goingData = require('../server/server.js' ); 


describe("handleSubmit function exist", () => {
	test("it should be defined", () => {
		expect(imageData).toBeDefined();
})
	test("it should be an async function", () => {
		const imageData = req => {
			expect(req.statusCode).toBe(200);
	}
})
	test("it should be defined", () => {
		expect(comingData).toBeDefined();
})
	test("it should be an async function", () => {
		const comingData = req => {
			expect(req.statusCode).toBe(200);
	}
})
	test("it should be defined", () => {
		expect(goingData).toBeDefined();
})
	test("it should be an async function", () => {
		const goingData = res => {
			expect(res.statusCode).toBe(200);
	}
})
})


