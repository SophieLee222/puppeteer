let page;

beforeEach(async () => {
   page = await browser.newPage(); 
   await page.setDefaultTimeout(); 
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
   await page.goto("https://github.com/team");
 });
  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub · Build and ship software on a single, collaborative platform · GitHub");
  }, 80000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 40000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 30000);
});  

describe("Github page home", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/home");  
  });

  test("The h1 header content page home", async () => {
    const expected = ("Build and ship software on a single, collaborative platform");
    const actual = await page.$eval("#hero-section-brand-heading", (link) => link.textContent);
    console.log(actual);
    await expect(actual).toEqual(expected);
  }, 30000);

  test("button Sign up for GitHub text", async () => {
    const expected = ("Sign up for GitHub");
    const actual = await page.$eval(".Primer_Brand__Button-module__Button___lDruK.Primer_Brand__Button-module__Button--primary___xIC7G.Primer_Brand__Button-module__Button--size-medium___EyCyw.CtaForm-primaryAction.js-hero-action", (link) => link.textContent);
    console.log(actual);
    await expect(actual).toEqual(expected);
  }, 30000);

  test("button Try GitHub Copilot text", async () => {
    const expected = ("Try GitHub Copilot");
    const actual = await page.$eval(".Primer_Brand__Button-module__Button___lDruK.Primer_Brand__Button-module__Button--secondary___akMC2.Primer_Brand__Button-module__Button--size-medium___EyCyw.CtaForm-secondaryAction.js-hero-action", (link) => link.textContent);
    console.log(actual);
    await expect(actual).toEqual(expected);
  }, 30000);
});