const puppeteer = require('puppeteer');
const xlsx2j = require("xlsx-to-json");
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

(async () => {
  try {
    const downloadPath = path.resolve(__dirname, 'results');
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    // 设置下载行为
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath,
    });

    // 监听请求事件
    page.on('request', request => {
      console.log('Request URL:', request.url());
    });

    // 导航到目标页面
    await page.goto('https://boce.aliyun.com/detect/http');

    // 在指定的 XPath 路径下输入内容
    console.log('查找输入框元素...');
    const [inputElement] = await page.$x('//*[@id="url1"]');
    if (inputElement) {
      console.log('输入框元素找到，输入内容...');
      await inputElement.type('https://cirnoku.us.kg');
    } else {
      throw new Error('输入框元素未找到');
    }

    // 点击指定的 XPath 路径按钮
    console.log('查找第一个按钮元素...');
    const [buttonElement] = await page.$x('//*[@id="cms-console-one-probe"]/div/div[2]/div[3]/div[1]/div/div[2]/div/div/form/div[1]/div[2]/button[1]');
    if (buttonElement) {
      console.log('第一个按钮元素找到，点击按钮...');
      await buttonElement.click();
    } else {
      throw new Error('第一个按钮元素未找到');
    }

    console.log('等待80秒...');
    await page.waitForTimeout(80000);

    // 点击另一个指定的 XPath 路径按钮
    console.log('查找下载按钮...');
    const [secondButtonElement] = await page.$x('//*[@id="cms-console-one-probe"]/div/div[2]/div[3]/div[2]/div/div/div[4]/button/span');
    if (secondButtonElement) {
      console.log('下载按钮找到，点击按钮...');
      await secondButtonElement.click();
    } else {
      throw new Error('下载按钮未找到');
    }

    // 增加下载完成的等待时间
    console.log('等待下载完成...');
    await page.waitForTimeout(10000); // 增加等待时间到10秒

    // 检查下载目录中的文件
    const downloadedFiles = fs.readdirSync(downloadPath);
    console.log('下载目录中的文件:', downloadedFiles);
    if (downloadedFiles.length === 0) {
      throw new Error('未找到下载的文件');
    }

    const downloadedFile = downloadedFiles[0];
    const finalPath = path.join(downloadPath, 'result.xlsx');
    fs.renameSync(path.join(downloadPath, downloadedFile), finalPath);
    console.log(`已保存下载文件: ${finalPath}`);

    // 输出下载目录内容
    const files = execSync(`ls ${downloadPath}`).toString();
    console.log('下载目录内容:', files);

    let shareLink = "https://boce.aliyun.com/detect/http";
    const [shareElement] = await page.$x('//*[@class="share-link"]');
    if (shareElement) {
      shareLink = await page.evaluate(el => el.getAttribute('title'), shareElement);
      console.log(shareLink);
    } else {
      console.log('Element not found');
    }

    fs.writeFile(path.join(downloadPath, 'share_link.txt'), shareLink, err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Title written to share_link.txt');
      }
    });

    await browser.close();

    xlsx2j({
      input: path.join(downloadPath, 'result.xlsx'),
      output: path.join(downloadPath, 'result.json')
    }, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  } catch (error) {
    console.error('脚本运行中发生错误:', error);
    process.exit(1); // 以非零状态码退出以表示失败
  }
})();
