import { handleSubmit, postData, geoInfo, calculateDate, getImageData, updateUI, } from '../client/js/formHandler'

describe("handleSubmit function exist", () => {
	test("it should be defined", () => {
		expect(handleSubmit).toBeDefined();
})
	test("it should be a function", () => {
		expect(typeof handleSubmit).toBe("function");
})
	test("it should be defined", () => {
		expect(postData).toBeDefined();
		expect(typeof postData).toBe("function");
})
	test("it should work", () => {
		const postData = async (data) => {
    		expect(res.json()).toBeTruthy();
    		}
})
	test("it should be defined", () => {
		expect(geoInfo).toBeDefined();
})
	test("it should be an async function", () => {
		expect(typeof geoInfo).toBe("function");
})
	test("it should be defined", () => {
		expect(calculateDate).toBeDefined();
})
	test("it should be an async function", () => {
		expect(typeof calculateDate).toBe("function");
})
	test("it should be defined", () => {
		expect(getImageData).toBeDefined();
})
	test("it should be an async function", () => {
		expect(typeof getImageData).toBe("function");
})
	test("it should be defined", () => {
		expect(updateUI).toBeDefined();
})
	test("it should be an async function", () => {
		expect(typeof updateUI).toBe("function");
})
})


