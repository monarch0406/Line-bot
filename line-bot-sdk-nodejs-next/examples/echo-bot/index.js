'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: '+fEiWF1LD9cFWWgxDjgQ7xSFA27hiYVD72FlUgrsr2Ay4x0jsdbIjP/YqnLG3NQh/Dgl9etF3CIptKLLTnfnhncQwGoKU2CVY2tpfo9f90XQLaWeWrg/JM+5N8xWy5Q+un6S9QQnGFToKgCiVvR2ZgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'af0c3dd7be3cb96182f727d5ae730d48',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  //Location message
  if (event.message.text === '勇士主場') {
    return client.replyMessage(event.replyToken, [
    {
      type: 'location',
      title: 'Chase Center',
      address: "1 Warriors Way, San Francisco, CA 94158美國",
      latitude: 37.76827151497287,
      longitude: -122.38799208986092
    }
    ]);}
  //Imagemap message
  if (event.message.text === 'imagemap') {
    return client.replyMessage(event.replyToken, [
      {
        type: 'imagemap',
        baseUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/rich',
        altText: 'Imagemap alt text',
        baseSize: {
          width: 1040,
          height: 1040
        },
        actions: [
          {
            area: {
              x: 0,
              y: 0,
              width: 520,
              height: 520
            },
            type: 'uri',
            linkUri: 'https://store.line.me/family/manga/en'
          },
          {
            area: {
              x: 520,
              y: 0,
              width: 520,
              height: 520
            },
            type: 'uri',
            linkUri: 'https://store.line.me/family/music/en'
          },
          {
            area: {
              x: 0,
              y: 520,
              width: 520,
              height: 520
            },
            type: 'uri',
            linkUri: 'https://store.line.me/family/play/en'
          },
          {
            area: {
              x: 520,
              y: 520,
              width: 520,
              height: 520
            },
            type: 'message',
            text: 'URANAI!'
          },
        ],
      },
    ]);}
  // flex message
  if (event.message.text === '附近推薦咖哩') {
    return client.replyMessage(event.replyToken, [
      {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
          "type": "bubble",
          "hero": {
            "type": "image",
            "url": "https://s3-ap-northeast-1.amazonaws.com/ichef-images/3897fe94-6981-4757-984c-d51cf9894266/48755176-4c22-11ec-8f0a-0242ac110002.jpeg?channel=online-restaurant",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
              "type": "uri",
              "uri": "http://linecorp.com/"
            }
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "濟濟一堂咖哩專賣店",
                "weight": "bold",
                "size": "xl"
              },
              {
                "type": "box",
                "layout": "baseline",
                "margin": "md",
                "contents": [
                  {
                    "type": "icon",
                    "size": "sm",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                  },
                  {
                    "type": "icon",
                    "size": "sm",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                  },
                  {
                    "type": "icon",
                    "size": "sm",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                  },
                  {
                    "type": "icon",
                    "size": "sm",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                  },
                  {
                    "type": "icon",
                    "size": "sm",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                  },
                  {
                    "type": "text",
                    "text": "4.0",
                    "size": "sm",
                    "color": "#999999",
                    "margin": "md",
                    "flex": 0
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "margin": "lg",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "baseline",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "Place",
                        "color": "#aaaaaa",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": "嘉義縣民雄鄉復興路55號",
                        "wrap": true,
                        "color": "#666666",
                        "size": "sm",
                        "flex": 5
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "Time",
                        "color": "#aaaaaa",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": "10:30 - 21:00",
                        "wrap": true,
                        "color": "#666666",
                        "size": "sm",
                        "flex": 5
                      }
                    ]
                  }
                ]
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "點餐",
                  "uri": "https://shop.ichefpos.com/store/4oqy9t2q/ordering"
                }
              },
              {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "FB 粉專",
                  "uri": "https://www.facebook.com/profile.php?id=100064095362793&locale=zh_TW"
                }
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [],
                "margin": "sm"
              }
            ],
            "flex": 0
          }
        }
      }
    ]);}
  // Confirm template
  if (event.message.text === '訂位') {
    return client.replyMessage(event.replyToken, [
      {
        type: 'template',
        altText: 'this is a confirm template',
        template: {
          type: 'confirm',
          text: '你是想用餐嗎?',
          actions: [
            {
              "type": "postback",
              "label": "Yes",
              "data": "action=buy&itemid=111",
              "displayText": "請填寫訂位姓名、連絡電話及希望的用餐日期",
              "inputOption": "openKeyboard",
              "fillInText": "定位姓名: \n連絡電話: \n希望用餐日期:"
            },
            {
              type: 'message',
              label: 'No',
              text: 'no',
            },
          ],
        },
      }
    ]);}
  // Carousel template
  if (event.message.text === '附近餐廳') {
      return client.replyMessage(event.replyToken, [
        {
          "type": "template",
          "altText": "this is a carousel template",
          "template": {
            "type": "carousel",
            "columns": [
              {
                "thumbnailImageUrl": "https://travelimg.yamedia.tw/20180811/20180811024023656.jpg",
                "imageBackgroundColor": "#FFFFFF",
                "title": "Nice Nine 雙醬咖哩",
                "text": "Google 評價 : 3.8",
                "defaultAction": {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "https://www.nicenine99.com/"
                },
                "actions": [
                  {
                    "type": "uri",
                    "label": "官網",
                    "uri": "https://www.nicenine99.com/"
                  },
                  {
                    "type": "uri",
                    "label": "FB 粉專",
                    "uri": "https://www.facebook.com/Nice.nine.curry/"
                  },
                  {
                    "type": "message",
                    "label": "地址",
                    "text": "621嘉義縣民雄鄉"
                  }
                ]
              },
              {
                "thumbnailImageUrl": "https://megapx-assets.dcard.tw/images/566a676c-6876-4786-a946-261b0451d549/full.jpeg",
                "imageBackgroundColor": "#000000",
                "title": "丼飽處",
                "text": "Google 評價 : 4.7",
                "defaultAction": {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://example.com/page/222"
                },
                "actions": [
                  {
                    "type": "uri",
                    "label": "官網",
                    "uri": "https://www.facebook.com/profile.php?id=100082871845477&locale=hi_IN"
                  },
                  {
                    "type": "uri",
                    "label": "FB 粉專",
                    "uri": "https://www.facebook.com/profile.php?id=100082871845477&locale=hi_IN"
                  },
                  {
                    "type": "message",
                    "label": "地址",
                    "text": "嘉義縣民雄鄉神農路148-1號"
                  }
                ]
              }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
          }
        },
    ]);}
  // Image carousel template
  if (event.message.text === '咖哩做法') {
    return client.replyMessage(event.replyToken, [
      {
        type: 'template',
        altText: 'this is a image carousel template',
        template: {
          type: 'image_carousel',
          columns: [
            {
              imageUrl: 'https://tokyo-kitchen.icook.network/uploads/recipe/cover/414983/9eeb2c106ee4c81f.jpg',
              action: {
                type: 'uri',
                label: '日式咖哩食譜',
                uri:"https://icook.tw/recipes/414983"
              },
            },
            {
              imageUrl: 'https://tokyo-kitchen.icook.network/uploads/recipe/cover/367736/03c48a465bc3be57.jpg',
              action: {
                type: 'uri',
                label: '綠咖哩食譜',
                uri:"https://icook.tw/recipes/367736"
              },
            },
            {
              imageUrl: 'https://tokyo-kitchen.icook.network/uploads/recipe/cover/432485/8aae37bc4fafbc67.jpg',
              action: {
                type: 'uri',
                label: '紅咖哩食譜',
                uri: 'https://icook.tw/recipes/432485',
              },
            },
          ],
        },
      }
  ]);}
  // Quick Replies
  if (event.message.text === '相關問題') {
      return client.replyMessage(event.replyToken, [
        {
          type: 'text',
          text: '請問有甚麼問題呢 ?',
          quickReply: {
            items: [
              {
                "type": "action", // ③
                "imageUrl": "https://png.pngtree.com/element_our/20200702/ourmid/pngtree-red-positioning-image_2286101.jpg",
                "action": {
                  "type": "message",
                  "label": "餐廳位置",
                  "text": "嘉義縣民雄鄉大學路一段168號"
                }
              },
              {
                "type": "action", // ③
                "imageUrl": "https://img.ltn.com.tw/Upload/food/page/2019/02/23/190223-8666-123-vuVvI.jpg",
                "action": {
                  "type": "postback",
                  "label": "餐廳訂位",
                  "data": "action=buy&itemid=111",
                  "displayText": "請輸入您的姓名、連絡電話及希望用餐的時間",
                  "inputOption": "openKeyboard",
                  "fillInText": "定位姓名: \n連絡電話: \n希望用餐日期:"
                }
              },
              {
                type: 'action',
                action: {
                  type: 'camera',
                  label: '開啟相機'
                }
              },
              {
                type: 'action',
                action: {
                  type: 'cameraRoll',
                  label: '發送圖片庫照片'
                }
              },
              {
                type: 'action',
                action: {
                  type: 'location',
                  label: '發送目前地點'
                }
              }
            ]
          },
        }
    ]);}

  // create a echoing text message
  const echo = { type: 'text', text: '您好，很高興為您服務' };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
