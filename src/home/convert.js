const transactions = {"items":[{"created":"2024-02-29T00:00:46.171948","hash":"\\xdf33beb2143e942b381389898433898a8a5215e315d6e96ebde5c6952240f2a9","height":60661627,"is_clear_admin":false,"is_execute":true,"is_ibc":false,"is_instantiate":false,"is_migrate":false,"is_send":false,"is_signer":true,"is_store_code":false,"is_update_admin":false,"messages":[{"detail":{"contract":"sei1fzpktq5wd28urluasu5tw0tznjk92whvd8r2fahpvkts2gsqrags47y7aq","funds":[],"msg":{"approve":{"spender":"sei152u2u0lqc27428cuf8dx48k8saua74m6nql5kgvsu4rfeqm547rsnhy4y9","token_id":"535"}},"msg_json":"{\"approve\":{\"spender\":\"sei152u2u0lqc27428cuf8dx48k8saua74m6nql5kgvsu4rfeqm547rsnhy4y9\",\"token_id\":\"535\"}}","sender":"sei1cnm35wr3grxgpssyffqtp4p9lazeyh6n222l4y"},"type":"/cosmwasm.wasm.v1.MsgExecuteContract"},{"detail":{"contract":"sei152u2u0lqc27428cuf8dx48k8saua74m6nql5kgvsu4rfeqm547rsnhy4y9","funds":[],"msg":{"create_auction":{"info":{"auction_type":"fixed_price","prices":[{"amount":"89000000","denom":"usei"}]},"nft":{"address":"sei1fzpktq5wd28urluasu5tw0tznjk92whvd8r2fahpvkts2gsqrags47y7aq","token_id":"535"}}},"msg_json":"{\"create_auction\":{\"info\":{\"auction_type\":\"fixed_price\",\"prices\":[{\"denom\":\"usei\",\"amount\":\"89000000\"}]},\"nft\":{\"address\":\"sei1fzpktq5wd28urluasu5tw0tznjk92whvd8r2fahpvkts2gsqrags47y7aq\",\"token_id\":\"535\"}}}","sender":"sei1cnm35wr3grxgpssyffqtp4p9lazeyh6n222l4y"},"type":"/cosmwasm.wasm.v1.MsgExecuteContract"}],"sender":"sei1cnm35wr3grxgpssyffqtp4p9lazeyh6n222l4y","success":true},{"created":"2024-02-28T22:20:16.4688","hash":"\\x2fc97cef8a4ebfbd5970dc405ed2dabac526d92239d3f3c8468e76430dacf10a","height":60647950,"is_clear_admin":false,"is_execute":true,"is_ibc":false,"is_instantiate":false,"is_migrate":false}]}
const formattedTransactions = JSON.stringify(transactions, null, 2); // 2 is the number of spaces for indentation
console.log(formattedTransactions);