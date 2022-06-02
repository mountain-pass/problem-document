import { StatusCodes } from "http-status-codes";
import { ProblemDocument } from "../src";

test("create", () => {
  const problemDocument = new ProblemDocument({
    detail: "a",
    instance: "b",
    status: 400,
    title: "d",
    type: "e",
  });
  expect(problemDocument).toBeInstanceOf(ProblemDocument);
  const { detail, instance, status, title, type, ...other } = problemDocument;
  expect(detail).toBe("a");
  expect(instance).toBe("b");
  expect(status).toBe(400);
  expect(title).toBe("d");
  expect(type).toBe("e");
  expect(other).toEqual({});
});

test("createEmpty", () => {
  const problemDocument = new ProblemDocument({});
  expect(problemDocument).toBeInstanceOf(ProblemDocument);
  const { detail, instance, status, title, type, ...other } = problemDocument;
  expect(detail).toBeUndefined();
  expect(instance).toBeUndefined();
  expect(status).toBeUndefined();
  expect(title).toBeUndefined();
  expect(type).toBeUndefined();
  expect(other).toEqual({});
});

test("createWithExtension", () => {
  const problemDocument = new ProblemDocument({
    detail: "a",
    instance: "b",
    status: StatusCodes.BAD_REQUEST,
    title: "d",
    type: "e",
    foo: "bar",
  });
  expect(problemDocument).toBeInstanceOf(ProblemDocument);
  const { detail, instance, status, title, type, ...other } = problemDocument;
  expect(detail).toBe("a");
  expect(instance).toBe("b");
  expect(title).toBe("d");
  expect(type).toBe("e");
  expect(other).toEqual({ foo: "bar" });
});

test("createEmptyWithExtension", () => {
  const problemDocument = new ProblemDocument({ foo: "bar" });
  expect(problemDocument).toBeInstanceOf(ProblemDocument);
  const { detail, instance, status, title, type, ...other } = problemDocument;
  expect(detail).toBeUndefined();
  expect(instance).toBeUndefined();
  expect(status).toBeUndefined();
  expect(title).toBeUndefined();
  expect(type).toBeUndefined();
  expect(other).toEqual({ foo: "bar" });
});

test("example from RFC", () => {
  const problemDocument = new ProblemDocument({
    type: "https://example.com/probs/out-of-credit",
    title: "You do not have enough credit.",
    detail: "Your current balance is 30, but that costs 50.",
    instance: "/account/12345/msgs/abc",
    balance: 30,
    accounts: ["/account/12345", "/account/67890"],
  });
  expect(problemDocument).toBeInstanceOf(ProblemDocument);
  const { type, title, detail, instance, balance, accounts, ...other } =
    problemDocument;
  expect(type).toEqual("https://example.com/probs/out-of-credit");
  expect(title).toEqual("You do not have enough credit.");
  expect(detail).toEqual("Your current balance is 30, but that costs 50.");
  expect(instance).toEqual("/account/12345/msgs/abc");
  expect(balance).toEqual(30);
  expect(accounts).toEqual(["/account/12345", "/account/67890"]);
  expect(other).toEqual({});
});
