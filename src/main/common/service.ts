import { Browser } from "puppeteer";
import puppeteerks from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";


class LiveService {
  public browser: Browser | null = null;

  public async openChrome() {
    const liveRoomUrl = "https://live.kuaishou.com/u/3x4546nfkivjsxe";
    puppeteerks.use(StealthPlugin());
    // 启动浏览器
    this.browser = await puppeteerks.launch({
      // executablePath: path.join(__dirname, 'chrome-win', 'chrome.exe'),
      // executablePath: chrome,

      // executablePath: '../../../resources/puppeteer_chrome/chrome.exe?asset&asarUnpack',
      // executablePath: '../../../resources/puppeteer_chrome/chrome.exe',
      // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      // executablePath:kexecutablePath,
      channel: "chrome",
      headless: false,
      defaultViewport: null,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--start-maximized",
      ],
    });

    // 创建新页面
    const page = await this.browser.newPage();
    // 设置视窗大小
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
    });

    // 设置用户代理
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
    );

    // 创建 CDP 对象
    const client = await page.target().createCDPSession();

    // 打开网络跟踪，允许网络事件通知到浏览器
    await client.send("Network.enable");

    client.on("Network.webSocketClosed", function () {
      console.log(`WebSocket close`);
      page.reload();
    });

    client.on("Network.webSocketFrameReceived", (params) => {
      console.log(`ks message：${params.response.payloadData}`);
    });

    // await page.setRequestInterception(true);
    // page.on('request', (request) => {
    //   request.continue();
    // });

    // page.on('response', (response) => {
    //   if (response.url().includes('/webcast/im/fetch') && response.headers()['application/protobuffer']) {
    //     this.eventHandler.onDyEvents(response.text());
    //   }
    // });
    console.log("====> roomUrl: ", liveRoomUrl);
    await page.goto(liveRoomUrl, { waitUntil: "networkidle2" });
    // await page.goto(`https://live.douyin.com/${room.roomid}`, { waitUntil: 'networkidle2' });

    console.log("已连接到直播间");

    await page.addScriptTag({
      content: `const simulatedEvent = new KeyboardEvent('keydown', {
  key: 'Virtual_Alt',
  keyCode: 18,
  bubbles: true,
  cancelable: true
});

const targetElement = document.documentElement;

setInterval(() => {
  targetElement.dispatchEvent(simulatedEvent);
}, 1000 * 60 * 2);

targetElement.addEventListener('keydown', event => {
  if (event.key == "Virtual_Alt") {
    console.log('[防挂机处理] 按下了', event.key);
  }
});

WebSocket.prototype.close = function () { return; }

var pauseIdx = setInterval(() => {
  let playbtn = document.querySelector(".xgplayer-play");
  if (!playbtn) return;
  let status = playbtn.getAttribute("data-state");
  if (status !== "play") return;
  playbtn.click();
  clearInterval(pauseIdx);
  console.log("已自动暂停播放");
}, 500);
`,
    });
  }
}
export default LiveService;
