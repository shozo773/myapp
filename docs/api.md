# API仕様

## POST /api/items
説明：新しいアイテムを登録する

リクエスト：
{ "name": "りんご", "quantity": 3 }

レスポンス：
{ "name": "りんご", "quantity": 3 }

## GET /api/items
説明：アイテムの一覧を返す

レスポンス：
[{ "name": "りんご", "quantity": 3 }]