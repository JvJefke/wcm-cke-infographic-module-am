"use strict";

const expect = require("chai").expect;

const getResponseMock = require("../../mocks/response");
const boilerplateController = require("../../../app/controllers/boilerplate");

describe("Boilerplate", () => {
	describe("get", () => {
		it("Should return ok status with specified type", () => {
			const res = getResponseMock();

			const test = boilerplateController.test("admin");
			test({}, res);

			expect(res.spies.status.calledOnce).to.be.true;
			expect(res.spies.status.firstCall.args).to.eql([200]);
			expect(res.spies.json.calledOnce).to.be.true;
			expect(res.spies.json.firstCall.args).to.eql([{
				type: "admin",
				status: "Route ok"
			}]);
		});
	});
});
