import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { reverseString } from "./reverseString.ts";

Deno.test("reverseString()", async () => {
  assertEquals(reverseString("Hello World!"), "!dlroW olleH");
});
