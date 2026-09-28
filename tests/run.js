import assert from "node:assert";
import { minOf, bumpInto, replaceInto } from "../heavy.js";
import { step, close } from "../heavyrun.js";
import { render } from "../app.js";

const base = {
  budget: 1, k: 2,
  state: { cands: [], swaps: [], asks: [], ledger: [], applied: [] },
  events: [{ id: 1, kind: "hit", key: "a" }],
  bad_key_code: "E_BAD_KEY", no_key_code: "E_NO_KEY",
  event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("minOf returns a number", () => {
  assert.strictEqual(typeof minOf([["a", 1]]), "number");
});

check("bumpInto returns a list", () => {
  assert.ok(Array.isArray(bumpInto([["a", 1]], "a")));
});

check("replaceInto returns a list", () => {
  assert.ok(Array.isArray(replaceInto([["a", 1]], "b")));
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
