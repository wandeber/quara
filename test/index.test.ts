import {CommentsTests} from "./CommentsTests";
import {Quara} from "../src/Quara";
import {TextProcessorTests} from "./TextProcessor/TextProcessorTests";



describe("Comments", CommentsTests.test);

describe("TextProcessor", TextProcessorTests.test);

describe("Multiine scripts", () => {
  it("should process multiline scripts", () => {
    expect(Quara.scriptSync(`
      var num1 = 1;\n\r

      var num2 = 2;\n
      var num3 = 3;\r

      num1 + num2 + num3;
    `)).toBe(6);
  });
  it("should support tabs", async () => {
    expect(await Quara.script("var num1 = 1;\t\tvar num2 = 2;num1 + num2")).toBe(3);
  });
  it("should skip unnecessary spaces", () => {
    expect(Quara.scriptSync("var num1 = 1;   var num2 = 2;num1 + num2")).toBe(3);
  });
});

describe("Quara strings", () => {
  it("should process multiline string", () => {
    expect(Quara.textSync(
      "El resultado es:\n"
      +"{var num1 = 1}\n\r"
      +"{"
      +"  var num2 = 2;\n"
      +"  var num3 = 3;\r"
      +"}\n"
      +"{num1 + num2 + num3}",
    )).toBe("El resultado es:\n\n\r\n6");
  });
  it("should support tabs", async () => {
    expect(await Quara.script("var num1 = 1;\t\tvar num2 = 2;num1 + num2")).toBe(3);
  });
  it("should skip unnecessary spaces", () => {
    expect(Quara.scriptSync("var num1 = 1;   var num2 = 2;num1 + num2")).toBe(3);
  });
});

describe("Quara class", () => {
  it("should create a new instance with global variables", () => {
    const quara = new Quara("var1 + 5", {var1: 10});
    expect(quara.run()).toBe(15);
  });

  it("should create a new instance without global variables", () => {
    const quara = new Quara("var1");
    expect(quara.run()).toBe(undefined);
  });

  it("should work with text static method", async () => {
    expect(await Quara.text("{var num1 = 1; var num2 = 2; num1 + num2}")).toBe("3");
  });

  it("should work with file static method and a script", async () => {
    expect(await Quara.file("./test/test1.quara")).toBe(3);
  });

  it("should work with file static method and qtml format", async () => {
    expect(await Quara.file("./test/test2.qtml")).toBe("3");
  });

  it("should throw an error with file static method and unsupported extension", async () => {
    try {
      await Quara.file("./test/test3.txt");
    }
    catch (error) {
      expect(error.message).toBe("File extension not supported.");
    }
  });
});
