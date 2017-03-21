# spider-man / 蜘蛛侠

写个爬虫玩玩嗮

# 爬虫的组成
## 链接管理器
负责管理已经爬取的链接和等待爬取的链接，我们给它个别名 web（网）
## 内容管理器
负责管理从链接上爬取回来的内容，我们给它个别名 trouble-maker（搞蛋鬼）
## 链接处理器
负责抓取和解析链接内容，我们给它个别名 spider-man（蜘蛛侠）
## 抓取策略/调度器
负责提供策略，将链接管理器中的链接分配给 spider-man 处理，我们给它个别名 police-station（警察局）
# 处理流程
police-station 会按照它的策略，从 web 上选择应该先抓取的 trouble-maker 的地址，交由 spiderMan 抓取。spider-man 在抓取 trouble-maker 的同时，会顺带发现其他搞蛋鬼的地址并提交给 web。当然，如果 spider-man 先生抓取失败了，也会反馈给 web，然后由 police-station 的蜀黍们决定什么时候重新抓取。
## 系统架构图
简单画大概是这样子的
![架构图](https://raw.githubusercontent.com/chuigeng/spider-man/master/architecture.png)
# 接口设计
## web
`GET /web/url/:urlId`  
`PUT /web/url/:urlId`  
`POST /web/url`  
`GET /web/url/search`

## spider-man
`POST /spiderMan/crawl`  

## police-station

## trouble-maker
`GET /troubleMaker/:troubleMakerId`  
`POST /troubleMaker`  
