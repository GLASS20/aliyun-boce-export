# aliyun-boce-export
- 使用Actions和阿里云拨测工具获得指定域名的大部分IP
- 使用xlsx-to-json将xlsx转为json, 并且推送到results分支下
## 开发原因
- 有些cdn死活不给IP列表，用这个服务可以获取到目标的大部分IP。
- 检测网站连通性
## 使用方法
- 使用到了Node.js和Puppeteer来使用无头浏览器来进行操作。
### 文件修改说明
- **index.js** 修改36行“await inputElement.type('DOMAIN'); // 替换DOMAIN为你获取的域名, 可加HTTP://”
## 其他
- 因为个人能力有限，故写的些许潦草还请见谅。
- 偷偷的挂上我的博客，[颂伊博客](https://eqing.cton.top/)还有写这个东西的[过程](https://eqing.cton.top/%e5%88%a9%e7%94%a8%e9%98%bf%e9%87%8c%e4%ba%91%e6%8b%a8%e6%b5%8b%e8%8e%b7%e5%8f%96%e5%88%b0%e5%9f%9f%e5%90%8d%e7%9a%84%e5%a4%a7%e9%83%a8%e5%88%86ip/)
