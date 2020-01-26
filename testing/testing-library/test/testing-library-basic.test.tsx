import {
  getByText,
  prettyDOM,
  findByText,
  queryByText,
  getByLabelText,
  within,
  getByDisplayValue,
  getByTestId,
  wait,
  waitForElement,
  waitForDomChange,
  fireEvent
} from "@testing-library/dom";

const createHTML = (
  context = `<span> Hello World! </span>`
) => {
  const div = document.createElement("div");
  div.innerHTML = context;
  return div.firstElementChild as HTMLElement;
};

// https://testing-library.com/docs/dom-testing-library/cheatsheet

// * ------------------------------------------------ Query Basic

test("Query Basic", () => {
  const container = createHTML(
    `<span> Hello World! </span>`
  );

  // * ---------------- getBy

  // getByText(dom, 'Hello'); // ❌ => Error, unable to find
  getByText(container, "Hello World!"); // ✅ => HTMLSpanElement {}
  getByText(container, /hello/i); // ✅
  getByText(container, "Hello", { exact: false }); // ✅

  // * MatcherFunction
  getByText(container, (content, element) => {
    return (
      content.startsWith("Hello") &&
      element.tagName.toLowerCase() === "span"
    );
  }); // ✅

  // * ---------------- queryBy

  queryByText(container, "Hello"); // ⭕ => null
  queryByText(container, "Hello World!"); // ✅

  // * ---------------- findBy (Promise)

  findByText(container, /hello/i).then(e => {
    // console.log(prettyDOM(e));
  }); // ✅ =>
  // `<span>
  //   Hello World!
  // </span>`
});

// * ------------------------------------------------ Query API

test("By***", () => {
  const container = createHTML(`
    <form>
      <label for="username-input">Username</label>
      <input id="username-input" />
    </form>
    `);
  getByText(container, "Username"); // ✅ => HTMLLabelElement
  getByLabelText(container, "Username"); // ✅ => HTMLInputElement

  container.querySelector("input").value = "Learn Test";
  getByDisplayValue(container, "Learn Test"); // ✅
});

test("ByTestId", () => {
  const container = createHTML(`
    <div>
      <span data-testid='notThis'> Hello World! </span>
      <span data-testid='target'> Hello World! </span>
    </div>
  `);

  getByTestId(container, "target"); // ✅
});

test("within", () => {
  const container = createHTML(
    `<span> Hello World! </span>`
  );
  const { getByText } = within(container);
  getByText(/Hello/); // ✅
});

// * ------------------------------------------------ event

test("fireEvent", () => {
  const container = createHTML(
    `<button onClick="console.log('fire')"></button>`
  );

  fireEvent(container, new MouseEvent("click"));
  fireEvent.click(container);
});

// * ------------------------------------------------ wait

test("wait", async () => {
  const container = createHTML(
    `<span> Hello World! </span>`
  );

  const asyncRender = fn => setTimeout(fn, 0);
  asyncRender(() => (container.textContent = "Learn Test"));

  await wait(() => getByText(container, "Learn Test"));
  getByText(container, "Learn Test"); // ✅ => HTMLSpanElement
});

test("waitForElement", async () => {
  const container = createHTML(`<div></div>`);

  const asyncRender = fn => setTimeout(fn, 0);
  asyncRender(() =>
    container.appendChild(createHTML(`<span>Hello</span>`))
  );

  const dom = await waitForElement(
    () => getByText(container, "Hello"),
    { container }
  ); // ✅ => HTMLSpanElement
});

test("waitForDomChange", async () => {
  const container = createHTML(`<div></div>`);

  const asyncRender = fn => setTimeout(fn, 0);
  asyncRender(() =>
    container.appendChild(createHTML(`<span>Hello</span>`))
  );

  await waitForDomChange({ container });
  getByText(container, "Hello"); // ✅ => HTMLSpanElement
});
