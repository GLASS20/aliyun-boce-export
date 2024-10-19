# aliyun-boce-export
- 使用Actions和阿里云拨测工具获得指定域名的大部分IP
- 使用xlsx-to-json将xlsx转为json, 并且推送到results分支下
## 开发原因
- 有些cdn死活不给IP列表，用这个服务可以获取到目标的大部分IP
- 检测网站连通性
## 使用方法
- 使用到了Node.js和Puppeteer来使用无头浏览器来进行操作
### 文件修改说明
- **index.js** 修改36行“await inputElement.type('DOMAIN'); // 替换DOMAIN为你获取的域名, 可加HTTP://”
