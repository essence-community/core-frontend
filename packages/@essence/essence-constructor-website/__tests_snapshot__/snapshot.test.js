const puppeteer = require("puppeteer");
const {toMatchImageSnapshot} = require("jest-image-snapshot");

expect.extend({toMatchImageSnapshot});

const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const ANIMATION_DELAY = 500;
const loginPage = async (page, theme) => {
    await page.goto(baseUrl);
    await page.evaluate((themeOrigin) => {
        localStorage.setItem("gate_ub_dev_theme", JSON.stringify(themeOrigin));
    }, theme);
    await page.reload({waitUntil: "networkidle0"});
    await page.type("[name='cvLogin']", login);
    await page.type("[name='cvPassword']", password);
    await page.click("button[type='submit']");
    await page.waitForNavigation();
};
const openMulti = async (page) => {
    await page.waitFor(ANIMATION_DELAY);
    await page.keyboard.down("ArrowDown");
    await page.waitFor(ANIMATION_DELAY);
};

describe("snapshot", () => {
    beforeEach(() => {
        // eslint-disable-next-line no-magic-numbers
        jest.setTimeout(10000);
    });

    ["dark", "light"].forEach((theme) => {
        it(`Home page - ${theme}`, async () => {
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();

            await page.goto(baseUrl);
            await page.evaluate((themeOrigin) => {
                localStorage.setItem("gate_ub_dev_theme", JSON.stringify(themeOrigin));
            }, theme);
            await page.reload({waitUntil: "networkidle0"});
            const image = await page.screenshot();

            expect(image).toMatchImageSnapshot();

            await browser.close();
        });

        it(`161 - ${theme}`, async () => {
            const browser = await puppeteer.launch({defaultViewport: {height: 2000, width: 800}, headless: true});
            const page = await browser.newPage();

            await loginPage(page, theme);
            await page.goto(`${baseUrl}/161`, {waitUntil: "networkidle0"});

            const image = await page.screenshot();

            expect(image).toMatchImageSnapshot();

            await browser.close();
        });

        it(`161 - Добавление ОО - ${theme}`, async () => {
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();

            await loginPage(page, theme);
            await page.goto(`${baseUrl}/161`, {waitUntil: "networkidle0"});
            await page.click("button[data-qtip='Добавить']");
            await openMulti(page);

            const image = await page.screenshot();

            expect(image).toMatchImageSnapshot();

            await browser.close();
        });
    });
});
