change `./paxful/config.example.json` to `./paxful/config.json`

update `config.json`

`npm install`

```
if user doesn't have enough reputation, then skip

if last user trade < 24 hours, then send 'one trade per day'

if chat does NOT have userEmail, then send 'provide email'

if chat does NOT have myEmail, then send 'send to myEmail and verify transaction number'

if chat does NOT have transactionNumber, then 'provide transactionNumber'

save({trade_hash, userEmail, transactionNumber})

paxful.releaseBitcoin()

'Please confirm that you received the bitcoin and provide feedback'
```
---

https://paxful.readthedocs.io/