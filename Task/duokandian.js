/* ziye 
github地址 https://github.com/ziye66666
TG频道地址  https://t.me/ziyescript
TG交流群   https://t.me/joinchat/AAAAAE7XHm-q1-7Np-tF3g
boxjs链接  https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/ziye.boxjs.json

转载请备注个名字，谢谢
⚠️多看点APP
请点击前往下载  http://dkd-api.dysdk.com/share.html?uid=13209201
或者自行下载    邀请码13209201 谢谢支持

2.9 制作
2.10 增加看视频，基本完善
2.11 完善判定
2.11-2  修复视频和广告以及提现判定问题
2.12 增加碎片显示以及兑换
2.14 修复宝箱问题
2.16 修复报错
2.19 修复碎片兑换问题

⚠️一共1个位置 1个ck  👉 2条 Secrets
多账号换行

第一步 添加  hostname=dkd-api.dysdk.com,

第二步 添加body重写 

登录多看点APP  点击  我的  获取ck
刷视频获取body，一个body一天可以只领取两次奖励

duokandianbodyVal 👉DKD_duokandianBODY
duokandianvideobodyVal 👉DKD_duokandianvideoBODY

提现标准 可设置 0 1 3 5 15 50
duokandianCASH 👉DKD_duokandianCASH

⚠️主机名以及重写👇
hostname=dkd-api.dysdk.com,

############## 圈x
#多看点APP获取body
http:\/\/dkd-api\.dysdk\.com\/* url script-request-body https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/duokandian.js   

############## loon
http-request http:\/\/dkd-api\.dysdk\.com\/* script-path=https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/duokandian.js,requires-body=1,max-size=0, tag=多看点APP获取body

############## surge
多看点APP获取body = type=http-request,pattern=http:\/\/dkd-api\.dysdk\.com\/*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/duokandian.js 
*/



const $ = Env("多看点APP");
$.idx = ($.idx = ($.getval('duokandianSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : ``;
const logs = 0; // 0为关闭日志，1为开启
const notifyttt = 1 // 0为关闭外部推送，1为12 23 点外部推送
const notifyInterval = 2; // 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 
$.message = '', gg = '', sp = '', yi = '', er = '', txtx = '', COOKIES_SPLIT = '', CASH = '', ddtime = '';

 
let duokandianbodyVal = ``;
let middleduokandianBODY = [];

let duokandianvideobodyVal = ``;
let middleduokandianvideoBODY = [];
duokandianbodyArr = ['token=b4a927f1a79241f4deff237ead335000',
                    'token=627c195068f7aaf374bf318ae9244863'];

duokandianvideobodyArr = ['"params=BH5zeqMkdV2SeQectKiWBlAweXTcr6ePfr3CXdWgM%2BZ9nFap6ICwTquPM0ajxfv/tSPP94sobDWQ26QvTbLSyPHO0D4DAvmU%2BqVNle44CcM1eYBkagTVOYEC7sdTTlae&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI756kskevzqfWtaPjPoAZE7SzxAe3U/aGDSgcYZBce1aMaij%2BHKtvNCEfTZG0XIqGB&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7VIGKylGtZfm9NyaH%2BRFFvfTp%2Bqg%2BjwWMvyAZVV7nHWc%3D&params=t0m/5sjKb7qw38cpYfObBJQAhhsp6H1h20nwNfY6ZGgPlAVDTgp8CvXveedDuJ%2B09yQw8Wvsqij9h2EAhVLHW/uFZnIEYLbnmnZbfMvvV30W68%2BL%2BlMrjj2dpJg23k9A&params=bDQYkAj1P9o89zAUqyXmPKsW6d3r47UGammCFiWhY0qfayp2Xrk/dNiD2zr9/DPzLFESGI6eEYsf1n2j6xwpiVCgClwK4l5eVCmG%2BVJY%2BuM%3D&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7qpc3zkeX3uwiW2AJwyjnrq1WYK/6OQfmQtmqr%2BhdCjBYFrYfsOJsOExBwMN3GTLZ&params=geQFqiG89xmkFFCeFpu6x/Q5xhbgpzQM%2B7Q0vgn9MlyKtCLepKYxuvmhSzB%2B8grSD45BwopIc9v5dG1oFgffFE3VmGtNa0lrjqmsPoViZPlQDe8RQqqWjOSHxnDQxHjL&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7aaMIrg2/2s6ncl0q6ykKN4stiHWOa%2B5vYEB7v6p2496jxhMJnskyXQuO807qcNQK&params=geQFqiG89xmkFFCeFpu6xxII2Z7lpOYz8yqAlXabMxhxT99bqkPLeX4U60ZfhTYJrO25kKkerzv40kEqBqHRxLtSLiOsXmmw6bnQRxC0vKVSrjFU2Eji9MiX47c74nla&params=UJ/CfR%2BZOhHpqzxOAgCg5oVU02WyLLs7mWbZjd7jDvCh9Dqh6FzKll4ICkR7pt0cosH57cxgqyhFb9qgKQ1oEoHeF2kowpr/xPhsN3uLXy4FqMQ6BzpmSaJjvQfK8ILc&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7KbmRKO7gQpOiqK3IOfetU4YkvO5ozeClIyb6wmIiQEQ%3D&params=Ygo3nkIliJ1Jk5%2BENHLvYqw%2Bw8AiPfuZeO4Lh8mwHBtpy04VrHIvaZAv%2BnZ3Ol5bb3IWi4X93E2rrB1%2BIryH%2BZrBLClQ84h%2Bsm57hsIwsMNCBL0%2B0QRACpjhMv4SDMSD&params=geQFqiG89xmkFFCeFpu6x3GFcB4t3vzAbNuZi1eSuNdw9Ik/VMoQGMrDH17N9XwZQF3DGDIhO1BSriGmpWdCSwMin4%2BlLwDFQv/r1UQy3AlYW2E3dEQdrM7aOp0QKOvA&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7mgR7Wv2G%2BypGg5ezVMsr5DhlPB1%2B45U3aE%2BrG72qNJT%2Bd2RMbVrzXtWoDX1AVWx1&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7pzQvG7JqAHTaNlWXY6pp32z7aEFBSmAzBj1S/y3TbtkAQ3%2BAWMTxxp9pFIpPUSkT&params=yQqhB0aDNOA/O3tILxwDoAtVv4kTRqli3rvx1KSOCH8hpD8SB6Y5n/xbryISf1caoEMGMfIOo%2BqZRXNnh0BoplBfMEoY2MSzjlfZ/RBMiEoL9S/wgDWcqoYHDhDfg41X&params=0ApQXfmuTjjaalNK8OLTCeDI%2B0dyDyi6WaZ%2BlzRm90IOaA0Y1j6yqwcVY2HLJ7j9fFxEV0DmwuBdUJ37//57EXE544Y1IYy9gSd9pcG%2BiowFGZwJmtknRep4S%2BUhNISz&params=A6BcQSAPlYnTOxkxngmZKcPR3Xh5T6gjpWK2qO25yWAyXUKofYX2NOuCcBqG4R9xFJVtF4u7whffx1EEGkuE96v6%2BowEdOfyEleiemK8f45lf6BDj3jKdKkAXNt3cbY9&params=zezpfyOsPAgXawjfRhaxkNADemUUVUoUjkVZfObjTbMfoLQOYPKg1D7zv5OXfMN1yza5hfSS8L5nuJ3cwu1hfnDJ0Hs3UI9yAfVKd4CHkt2Z08RppgAUx8VEf9fau5Fu&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI77zwu1iePwJNFcolgNtfdBth6oLdzTAbRsI6WaZWIg5E/vKb6VSv3jwfTwZW%2Bqb/d&params=gW69jPmqo4kkNna8AjweGJ26UcMbNQxuBjS1Mt3ViKig9BWYox0VYKJ5aczVxPBBsiOnM29t3oTmXG/I4CPYVUXVurfdQFYJhhr68PFA%2BidY2aLIJ4OyjSraSo/%2BLbAl&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7teEhzgP3KI3B7fCIX5PHQ5LwOsObdGFsi/P7VPOLEaU%3D&params=geQFqiG89xmkFFCeFpu6x2ogZ8NHxv8rvn66SWqtWex/qoF16eOvkJMW43J6m04evXHqAC%2B7mDTVcZqKhfZ9s9x6TlfzNP8n%2BM%2B1E8YbHOR6dLCjLFPJJsTs1YDr5TH6&params=5AE56OzrDgOoKEXQEKoJhDX1XnvCby8RR40yBM2ucS4303zbbiDcNtU55fOlPOmU5H5kpui587dsxW75oLtmU/BazJz/AG1%2BeKKI0seEJB9uUjs68jCTZ7crPabzW1lT&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7%2BkPTZU15ykcC7yackk9Blh1XTK1UNna6oInxJngROkTV4i35WGfbF/pu1kM3ahd%2B&params=AcSHDI5ZkzqYpXh2XE0YVp23/rz/2fViUe9GPy5fmTMrrPuMclgZJ7GhF1DPa7pafd0f1cX92O2//BNeeftHD%2BZpMwafGVBQyD87k4wUNP6NhOjQuLYIIKMRqpn/CGfp&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7sCCo4%2BC/4BLcsoM0lu00GrW6jiVA0cVZHIkjxLkZcWWZERcbMlA0ONKkxDSwZqCJ&params=jNsgDDMqTmbZCCX%2BzJ%2Bvk39AbZ/1E0F9Blh9MUasGTFyeUgIys1r%2BBpEXs64YYBF%2BuTanXS3xUCUlQHBpr7MOkB8PT/0kbgiiRYL3TB3GU0hq1LLEimFz9/qy7NOdcJ9&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7FACKryHJUJ2PkagohefJUfT77Q3V%2BbUJHgMgnK33pE934qsgpq%2BQBy38FGCz%2BdhQ&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7vAAweDgYWpFdhSGKn1JWaCMWoMBOKUGBTnpwNTTVXPqIu1BTz9F%2BL2qzVv8mXNJ%2B&params=Zg9qX2lfyvABDIc%2BKBYzdfFItYh1j58o3OB81gbViU70SbaWVMCZla1OkRAHOngqDCELztFFluMMKKJ1t0xbV%2BxRelBf4SGfjqU5lqLbIcZft2PR7Nw2cFx5iLxv4LWV&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7NXn2/pv3fCJRTIZ2UAI36n5n9tEuwPhX9XrwuyQ69dBfvUKHydG05B95XAu0x1c3&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7aEaCH/S81NdWR7xTLR8gaI27DBZHSz0tjc9Qa61eT9K9xnm08OpQodbJb27G0RGC&params=geQFqiG89xmkFFCeFpu6x4Bt6XxRC51OGRkMcgmR/p6rqlwQJRLQs0QPNKn8bdNn%2BQrGV1lz8AuUEFz889xUpbf3Q5V2YtzOXLsc7sjIhWVZ7CffFYnbC1/zUupjCg7E&params=geQFqiG89xmkFFCeFpu6x0XALo/JkqzOsgQ5XKhFHqhnQZ3M8a3zYYr08jVMXxRXLqPmzfx4g23Eq82S4GybObERS%2BYDlzI3Lh/twVtTsrvIgZ6bDnyNlxr71N/xzru%2B&params=geQFqiG89xmkFFCeFpu6x9zPg6MFW7UyzBDy//1AJe6N3LXIxSnDVQhAkP2Krnal3oS9ZtJ4kdGVhggWHd2x3sxTDbmzF8vsSK%2BWX39t%2BMHjRuDoE4W42AS4p5dAWDlE&params=geQFqiG89xmkFFCeFpu6x83%2B0swd1fzcMJ0VRQoqWMlbtbkcQz3d7/9fsZBURYnefVtLi9RUdpjNOz3CclbhWeUak%2BAcQXlMk7J5VyqDN/6Rp1%2BC9QVcO7sj9vjIfp3M&params=geQFqiG89xmkFFCeFpu6x5RijPVGxmVLcFSRb3YouHEIQjkeensV6WhI75J2miPX8JJxid1YF6MGi0n6T3XuvVh7A2JmTjmP6DeoxgX6vhEgSieyztGSbIMh84TcuKTB&params=geQFqiG89xmkFFCeFpu6x3FxTjWiMkhS3R8W5xxGJF9sRNJYCN8KNj/TZzuGAW7T/ddNaZTEuBS1NTZUkEMBMAruSYI2geubDwB4Ur75a8vLQc03MywM6yb1l0pQpVwU&params=geQFqiG89xmkFFCeFpu6x/L/T1jGAdQu98Ss0BYJKagdz02uQWv5ggWCOvd9TigIuG/POty1sY/m5HBBD4qtol214xpIgzbxEXPDze/d8Gy1IZIldlM3CioTwV/myCVD&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7XOsScy7K3MljnvOOADdZO4CWdUiHhYj7u9UUIL5ojByKJqN1/bnIWIVzHhoWAGVy&params=TngwCcO/FtjvXIGMFWbw9FU8GWlSlNqafMp84U7fUDEnwyWDneWPr3g%2BMFmejRCK3OlL%2BkvJ6H65QfWrtgT1u8dlgGbjDJ9jN98PHMyzzkBdFvfb4nYzUb1JIjBS4LC%2B&params=geQFqiG89xmkFFCeFpu6x3jJa3Gcqc%2B35jKNH8ficSkfNdDPY2n9ZeIAoyhIjqg0oSfQaQ8/lja8l/LcfAUATvSo7qmTkyOxqzLhpy1sfPr2UbWE3fEpGp5pYE7uoMLJ&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7xQpWIYvs7yyJ5qo6%2B2vOtu3n0dvVHp5kXxajFbHHrhA9DxB1brYQUSDoZ4xcP/Xy&params=iFQKjyTS9FRoTlNZBrM/FMrIgJyQzXVmL7FVU8Js0%2BSr7yynP%2BozwlH6XcCkZ6sN5skluLDZLBGB8sz2oLQbVsXtS7z6GytvUGQvk4f1dLc%3D&params=geQFqiG89xmkFFCeFpu6x2Bc%2BByYV/jwVr9Sq/ooIgYOof19hfP5vOspwKZG0MP8fSdf3xFMAD71KeDxJChw63l/sPpLTByU2%2BQ7a3h7A3K4D9yymN/P275d64Yei5SL&params=geQFqiG89xmkFFCeFpu6x547Kb97I3IA2yf2VgM6ncwJF/nq65zXssVm0%2BsfOHfnHGztenPhwBOuBUSE461h/E20jUqmliylUkLA5ee7EMg%3D&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7Y3gQslqxXNm5V4y97CBf4L2fJy6Je3VG4NVU4ZZLcco8AOizaiiREld0vZl7QSvP&params=%2Blr3vGaYp8EDeVcasxiIv9PMTznZWZLQJMSzbQiDLKFpM9CQpAehACdW%2Ba1tujI7fw8h/V57odvG05QAGzUWtW0I08wSg0R1vSCJWpvfaEQcSw0bluIjquQjezB6OGR4&params=geQFqiG89xmkFFCeFpu6x%2BYY8AyeKspKl9CwbPgN354AE99RWlzBCIVrh8I4omew82%2B4yvXmUHaT3rC8AagM/tBw8IaZRzg7XtHqEwUeqGeD4s4nYu6d2oKLauTsCVkL"',
                         '"params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UykDBRm5IJX/a8UAvXM63WkcDStFiSHBe4ZFbixIXMzQRvWaci9uWOokWGkTtQ%2BO4i&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyezThlZN8e2Ag98fEdDhwRI2F7nAJVJRjxxzldU1WaWU4/2G1sYtyIo3J%2BKyv9LUK&params=jmlK/ekhwUFj9i/s/EaZeEht/Xn6Jcnpypm3iYdR96/zZbyaa%2BFLK09NVFLJC5%2BssrLA5UuK6okJCAYiHHqpd/GqpQ%2B%2BUXYOqB1E90xn8b0EATC/ZU3oQSn7NMKSkQ0R&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyTwGeJQ8qCkDJyUUuc98YhC60agxtPa2zSCRXgVngYlxC1e7qV%2BUsTfa1prNWkwdq&params=geQFqiG89xmkFFCeFpu6x5G3CBemUA8NOL%2BoIBps4wFLlX/Oa3eo%2Bzjx03luZXUoOx8tJbmZDMrNnSK0XlBL8dtW9TfJ4p1vCQq7KeIIY4C85sxvXMKGuILq0lgQnXET&params=geQFqiG89xmkFFCeFpu6xzTBNwG6J1UzTS3drsvP7LZdFa3ur41IJLq4e56OkLGJgjUEk/d8luUBkVC7XBegChJqQsJpFhSFYLrCZ9kZLeTktbh2EHXjvNbN7FU8ds/T&params=geQFqiG89xmkFFCeFpu6xyVssjLfBjJsE7CEqXc5xgWQJJt5P6tob90%2BUUwUxXyjc40TghWjd9rN49UJqaYK68I6A1WoHFVfxTMOTqgu95jzLb3FYFmXW%2BCmAAToIqd7&params=geQFqiG89xmkFFCeFpu6x7YDDP3jQNsXgAN75TbTPO/mnyOUyggmODG9UzLBJyUgdKZXUTKJ6/j2NnbSW%2BGdw6B4KFoJA1CPLm1Zkl3NQbWa3nyVkmi0UyMh90MBES8g&params=B9yVsP9R5dH6deozhcaVWuLNAKnTxJAJ9fd/kj62TUbxjy/SAwirULsSlVhexkqLhyeXLZYQDjNE%2B4vPVVwA6dyF%2Bf1g2kNNuqUgKiWbElTLcjofK87gDHwBAVTGDztB&params=EVmJjLZmixjg/k2zxmP8TWtluyCVhZsr6luFaDl9GpKu4CfGy2F7h7kNib3l%2BzFw0rGn/avTqTZHnaqlQSMiz7s0zLYsrAVPUV5eY1csLq7t4gIsPvdEHg%2BxuljcSGdR&params=gwBA8av6x3uBRl3piJnmJ4AUFv%2Bn%2BAFsW4fs1UHnaJEtffgSsWd2xFz0OkRX2sTKKGlnfBLZjANiHT/%2B%2BIot1Z6IHNSAtpwgN7ktHmOR1aG8kPtFiu2GzBWwUYOUk8gW&params=5%2Bq3w1CKG9USVUhKwwyGMhO7Ff50A8G3dgW%2B%2BPqYL2E3u/TfuSDr5ApMI2NpGphsk4OcpF3al3UiuR19aLbsV7hfUs5cfoFIU0pb60FOgQjQwm6NRhQpVcADQa8eEQ2H&params=gwvVKkIcGveNsn1H708BFYHksA9/OfsVeltYHM1wIbMsfClsKE9SytNFBkLeU5YrYUQXMuQepix6RtFTUTDv7v3WiJb4XcdaQmb5Ie0HUKJVktiDd5nAw9hSA2M8ncgG&params=C6CEE/7A3nSgZTjQMz5/tcKG5Qds19MEi5zPYsKk5KCU%2BMdb3bOcRv%2Bb86q4kY429O5/tgK5svtiIIBImVy3%2BGyRHZX5uhbzgSp85Op9niXFcdWGPsVvPzYlyRGw9sAS&params=geQFqiG89xmkFFCeFpu6x6LOdn/QPiIm6N5xbmo5uGP2beEksDE3mSM8RKGgn1sc8sbAezeOzFtYPU3XmMl6566ZiwGLJY8uyVNT3b2lZKuBedccfLEEDo6JiL2TRiQT&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UymrfMWKnfNWFMrmnF6n%2B2lpzrXTIzfMCIde3UWRXmHkDGD3R1bTnE3ds4AnnuuUyJ&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UymLdPm%2BxeiR2sGYhigxTCTIiSOw9GNcmcUffnulPO6dUKQWGQ1dlhvATzdoRT2q2y&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UykPTHPy47T8RiGCNLslxRZ2Lhhu4RB1F6NIx1AgsyCtbfznbJnSQCVwg/7yg4y2ip&params=wTTT8oLxRtaRHvHc%2BmCMKf33bxu6gdVFOx4d4eGbV1EdLuz5M9ZyyAlSWh10L3kJeakviQTMoD3EisAssK8VCGBXblGRASSjrriWIgLZCahqR6BwQuICpD/sGWnAv2OP&params=dr%2B24Al2PvrWtnkhpa9MZPdPeNK%2Be8g3twgvONNHv09kg1KkUL3lhWM8xrumqboSjPE9fUEvMXlreOCf6HK/kjf6faUcPSjJ5tEjSwZfDkv6fTc1h%2BosNJAHLbgZWNGQ&params=y0WFr/PL9k5fgu6TRuMlQboBXJ7GopLBw4e9PyBLUU365SIOkynCvhihcinrt5llF9jsMSucRSXbAGaaKfW0NYddHvk%2BOOCptALZ3BXHVhDM90/p0hjmJ6NLspsflx1C&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyEhTyijO/jgwPtnnZEv2VfOmACZNUg25JiwmZ%2B1sG6vJHf%2BVATyU64AIV9f/iWP9m&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02Uy4KdW15dauc1ji1/dTKLqnKNgI5qKek5aILZzcrteSUv/sdiUOpH0Tp1OR9RUIpkm&params=k8QAiROwxal7M3xmo3HhEYiRDEePKF1amMAhYpkm/6LXvj/v9lea35g9NOkN0t0WUTT0OVKEZJ5kHx03SKwu%2BPKMRoQGh13%2B%2B3n3mnemqPuEmp6urRiRMqDGoYWMG3ul&params=Ahh/WS6Md3AuYcOv%2BwhI0UC1yAwMZa%2B9kIoyisBFhxGuuigl7msBClb47au2QG7ZLf4BYyRDrOB7CWPyPBKP3T7WWzCny9Kl7sk3Lcof6u%2BVec/mxLJDrvxAf4mnYsUQ&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02Uy1UYGrCGj6A08%2BBGZELCt58IZZzbk79rKoEzMa4qfYxU%3D&params=geQFqiG89xmkFFCeFpu6x%2Bj7k2d0vx3TTsHFdP6RcDFqtZF1jjyOXA29WtRDc2YBarAZHs/Vpkb8SuwpkVSR7Lh/KhRhvhR8CuPZuaz7fSFXQ5yv4llMOXSYCZ/LEVIh&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02Uyob/LBR0iyMiCVQLfKHzwliCH4iN8cJYw87ILuWzK6rsC8AKtOFODSDNsqCwQvb%2BJ&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyW2btuwTtMNoXCxKXZFYREAhFpNPvzpUDKOVGypAULks%3D&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyMyxYwiasR2TaRAv/3aXvEPzQ51B6iqXybZp8IXFQU3w%3D&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyBn3/UVnTntJbkETD%2BE7oTkbLTdExhPZKCyXwuJrDJaVep5X1m8aaQpwuhzvi8fLv&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02Uyjf%2BBVpG7G2ueGl/UKes7ZThEkbVjbExFv0iFi70fUxkvVJkpvcySo0d5YaxG7O/3&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyTXWlQhtaAUwqz%2BUeFeL0FsKTUexTzYZIPb%2Bm5nbGTtHK3zVqFQdwXvMW1Y5PeVE1&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02Uy5lpzjCYYYVcDj3SWmMQXt55P5jILymXEfvwDL4P7wRqTXJ5AwBR5u7vyai4Un1qQ&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyFTloIgM1/ds5bO/7oVqlPgdNqXmvB4g8mgKaV8aJTudf1SSOnSrckI8V9tDwIjKr&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyJSXXwldqPe5QA4lKvfw54mfArxEnkd1OQRtP1nLFiaTHaQKO3uQ41zGhGc1PrpdL&params=geQFqiG89xmkFFCeFpu6xy4nTOz402Z84W4vQMNlJ4SDA6jV3pmt%2BG7OaqvO5y5wXTUmes/oMhIJDJMXMw7bL%2BnZXBZqfXBGqoLgHgL1B5s/Re8uQCOIYKhFEUQa0MiV&params=geQFqiG89xmkFFCeFpu6xyHX%2BUk0o2TAGDVhisvgePI4b0yqPFsJ3gMRIYoQhTBVQ1Ng%2BZ5WxloveCZYlI6FsgYdVxbcWzXI8xTQV3wdadg2Ka/KjXb0fqcc1jWeorZE&params=1KutIOadxNT3qYvw/V1%2BASG%2Bx1wJlLObAl/xnDgce7vQx5bgA1QIhPula5KV/dK3O8Lnv7zA8%2BvK17%2BmzLfrLvj9wjUMa7C%2BPi9J7dOsbGpED9zFc2PBIBkqnV/aNFjG&params=ug2nzJzhCyDAV2ZzzSAup6KqUhbzqLKqTDYJ2fPtTEpM%2BZQPrXNA5m0r1FFHDUPCii96sb2Ysdb1e11Ehvbk1R3VN0gkEMTDbXHWYSrmcwU5g3xFRcnXb2HiAd7lyl/V&params=qFjGhaRJaCn9fRc4fTpC2%2BLQ%2B3nbV9DdvZeQXGOLfbJvmPOPIun9ieZvqSUWTJjKhUdS92jzRDzgVmUYYCoBP5NT7FPzPGBE/KfRaPNGxZgrus7i161N2OSbgtpZCigP&params=UaRxkwDu7HHnnXchJr2dn9EfjhL2Y1Wp7fDyktVrRrLziScBUCCGrww%2B8S67j2g8ADZnTQvNYKYXPS9dRXkm1GmBrCoyQnSHyaIHFOgAaBEYZhbjXnj3QVFPhpbgy9Bx&params=geQFqiG89xmkFFCeFpu6xzdSU4of/IJ7xltvkFIstM4cMpm/t5FCIyH/ptlx505FLdB5BXcJvJoFjBsXuf6NhEJXeHRVfvImtA6kxvrHBv1fcKgC/C7oxPRPn%2BrXBwJX&params=lgelxsxXTxfVIcdbm8ozEcK%2BdyDe0xKIBJVZemWuA0fqoJjoNM74Q9F6bs1TWc77X4EKQjqYz63lYKiuM0Uvx5emuEtboeSZffaWeW9AnaD4s8ul25zigg1VAAJYeqld&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02Uy5TPTmxZw6HxoHFspi1/V2dlibBbooM0vQc7x/eFrrko%2BU%2BgzZzSAaHBSgpjKQSrR&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyTqlaJnyEzY5T95yalAAFJwJnJmmjpoZmDZeZM6fgYTO0AWpXuXLpE7wLFO9Yt4dK&params=19M1z8RRpvjqsKDkOfkD39rKA5WD1P4QZv8L0Gp7B1WxKT7jjCkzuUEzGKDI02UyPO9f8cQ%2B4KZ3BASobm1NlRi/2DvDP98IolkqRgOr859gw5yciao1iICQ2HL7xt2/&params=geQFqiG89xmkFFCeFpu6x5D44dM34jyTsWPWArS/XMoXyUJ%2BtttQv38qF5jBnhuYx0ygkE/t2ajiiYlkCFw8BpRyxLpk1%2BU8DGY1dRaNnLgUmt4wfW5hb1P57ZQSbxok&params=geQFqiG89xmkFFCeFpu6x8u7fWdIE7wN79WOtJI0SrirOpkdzyxM1rEE4GZZMUyo1U6Rb8lEzjRttCiHbZXyBg0dliwnQAZO0vWbMBtEWcfZZwcM1jORI2AYqLaS3HaC&params=geQFqiG89xmkFFCeFpu6x4fUK4mDI9aEQ77VxhnlxytyKBP8LiwslFDiz2fbbdn6pelkTTSe4KZw3bIwqP1mwiGGcPblb1/eQOea9ETruZb3CHceHJgKKQ%2BPbw6809LW"'];








duokandianheaderVal = {
    'Accept': `*/*`,
    'Accept-Encoding': `br;q=1.0, gzip;q=0.9, deflate;q=0.8`,
    'Connection': `close`,
    'Content-Type': `application/x-www-form-urlencoded; charset=utf-8`,
    'Host': `dkd-api.dysdk.com`,
    'User-Agent': `duokandian/3.0.2 (com.duoyou.duokandian1; build:0; iOS 14.2.0) Alamofire/5.4.0`,
    'Accept-Language': `zh-Hans-CN;q=1.0`
};

duokandianspdhheaderVal = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "Content-Length": "8",
    "Content-Type": "application/json;charset=utf-8",
    "Host": "dkd-api.dysdk.com",
    "Origin": "http://dkd-api.dysdk.com",
    "Referer": "http://dkd-api.dysdk.com/index.html",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
};

Length=duokandianbodyArr.length;
  
CASH = 15;


console.log(
    `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()} =====================\n`
);
console.log(
    `============ 共 ${Length} 个${$.name}账号=============\n`
);
console.log(`============ 提现标准为：${CASH} =============\n`);
//时间
nowTimes = new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
);
//今天
Y = nowTimes.getFullYear() + '-';
M = (nowTimes.getMonth() + 1 < 10 ? '0' + (nowTimes.getMonth() + 1) : nowTimes.getMonth() + 1) + '-';
D = (nowTimes.getDate() < 10 ? '0' + (nowTimes.getDate()) : nowTimes.getDate());
ddtime = Y + M + D;
console.log(ddtime)
//当前时间戳
function tts(inputTime) {
    if ($.isNode()) {
        TTS = Math.round(new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000).toString();
    } else TTS = Math.round(new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toString();
    return TTS;
};
//当前10位时间戳
function ts(inputTime) {
    if ($.isNode()) {
        TS = Math.round((new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000) / 1000).toString();
    } else TS = Math.round((new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000) / 1000).toString();
    return TS;
};
//今天0点时间戳时间戳
function daytime(inputTime) {
    if ($.isNode()) {
        DAYTIME =
            new Date(new Date().toLocaleDateString()).getTime() - 8 * 60 * 60 * 1000;
    } else DAYTIME = new Date(new Date().toLocaleDateString()).getTime();
    return DAYTIME;
};
//时间戳格式化日期
function time(inputTime) {
    if ($.isNode()) {
        var date = new Date(inputTime + 8 * 60 * 60 * 1000);
    } else var date = new Date(inputTime);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
};

    !(async () => {
        await all();
        //await $.wait(1000);
        await msgShow();
    })()
    .catch((e) => {
            $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
        })
        .finally(() => {
            $.done();
        })

async function all() {

    for (let i = 0; i < Length; i++) {

        duokandianbodyVal = duokandianbodyArr[i];
        duokandianvideobodyVal = duokandianvideobodyArr[i];
        
        O = (`${$.name + (i + 1)}🔔`);
        await console.log(`-------------------------\n\n🔔开始运行${$.name+(i+1)}【${$.name+(i+1)}】`)
        videoBODY = duokandianvideobodyVal.split('&');

        if (duokandianvideobodyVal == '') {
            videoBODY.length = 0
            tt = 0
        } else tt = videoBODY.length * 30 - 29




        await user(); //用户信息
        await signindex(); //签到
        if ($.user.data && $.user.data.today_gold >= 2000 && $.signindex.data.sign_status == 0) {
            await sign(); //签到
        }
        await days(); //任务列表
        await lottoindex(); //转盘查询
        if ($.lottoindex.data && $.lottoindex.data.times >= 1) {
            await lotto(); //转盘抽奖
        }
        if ($.lottoindex.data && $.lottoindex.data.chip >= 4) {
            await chip(); //碎片兑换
        }

        if (gg && gg.status != 2) {
            await advideo(); //广告视频
            await extratime(); //时段刷新
            if ($.extratime.data && $.extratime.data.status == 1) {
                await timeaward(); //时段奖励
                await timeawardsss(); //时段翻倍
            }
            await extrabox(); //宝箱刷新
            await boxaward(); //宝箱奖励
            await boxbox(); //宝箱翻倍
        }
        if (gg && gg.status == 2) {
            console.log(`【时段奖励】：已完成\n`);
            $.message += `【时段奖励】：已完成\n`
            console.log(`【宝箱奖励】：已完成\n`);
            $.message += `【宝箱奖励】：已完成\n`
        }

        if (sp && sp.status == 1) {
            await spaward(); //视频达成
        }
        if (yi && yi.status == 1) {
            await rw1(); //日常任务1
        }
        if (er && er.status == 1) {
            await rw2(); //日常任务2
        }
        await txcx(); //提现查询
        if (CASH == 1 && $.user.data && $.user.data.cash >= 1 && txtx >= 5) {
            await tx(); //提现
        }
        if (CASH == 3 && $.user.data && $.user.data.cash >= 3 && txtx >= 10) {
            await tx(); //提现
        }
        if (CASH == 5 && $.user.data && $.user.data.cash >= 5 && txtx >= 15) {
            await tx(); //提现
        }
        if (CASH == 15 && $.user.data && $.user.data.cash >= 15 && txtx >= 30) {
            await tx(); //提现
        }



        if (videoBODY.length != 0 && sp && sp.status != 2) {
            console.log(`【视频统计】：共有${videoBODY.length}个body,预计运行${tt}秒\n`);
            $.message += `【视频统计】：共有${videoBODY.length}个body,预计运行${tt}秒\n`

            await video(); //刷视频
            await $.wait(tt * 1000)
        }


        if (videoBODY.length != 0 && sp && sp.status == 2) {
            console.log(`【视频统计】：共有${videoBODY.length}个body,已完成\n`);
            $.message += `【视频统计】：共有${videoBODY.length}个body,已完成\n`

        }


    }
}
//通知
function msgShow() {
    return new Promise(async resolve => {
        if (notifyInterval != 1) {
            console.log($.name + '\n' + $.message);
        }
        if (notifyInterval == 1) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 2 && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 12 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10))
            await notify.sendNotify($.name, $.message);
        resolve()
    })
}
//用户信息
function user(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/user/index`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 用户信息🚩: ${data}`);
                    $.user = JSON.parse(data);
                    if ($.user.data && $.user.status_code == 200) {
                        console.log(`\n${O}\n========== 【${$.user.data.nickname}】 ==========\n`);
                        $.message += `\n${O}\n========== 【${$.user.data.nickname}】 ==========\n`;
                        $.message += `【账户信息】：账户余额${$.user.data.cash}元,今日获得${$.user.data.today_gold / 10000}元\n`;
                    }
                    if ($.user.status_code == 10020) {
                        console.log(`账户信息：${$.user.message}\n`);
                        $.message += `账户信息：${$.user.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//任务列表
function days(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/task/index_days`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 任务列表🚩: ${data}`);
                    $.days = JSON.parse(data);
                    if ($.days) {
                        sp = $.days.data.list.find(item => item.pathurl === "duokandian://video");
                        gg = $.days.data.list.find(item => item.pathurl === "duokandian://xxx");
                        yi = $.days.data.Task_comp.data.find(item => item.pro === 20);
                        er = $.days.data.Task_comp.data.find(item => item.pro === 50);


                        if ($.days.data && $.days.status_code == 200) {

                            console.log(`【${sp.title}】：${sp.task_go}， ${sp.award}金币\n【${gg.title}】 ：${gg.task_go}， ${gg.award}金币\n`);
                            $.message += `【${sp.title}】：${sp.task_go}， ${sp.award}金币\n【${gg.title}】：${gg.task_go}， ${gg.award}金币\n`;
                            if (yi.status == 2) {
                                console.log(`【日常任务1】：任务完成 ${yi.award}金币\n`);
                                $.message += `【日常任务1】：任务完成 ${yi.award}金币\n`;
                            }
                            if (er.status == 2) {
                                console.log(`【日常任务2】：任务完成 ${er.award}金币\n`);
                                $.message += `【日常任务2】：任务完成 ${er.award}金币\n`;
                            }
                        }
                        if ($.days.status_code == 10020) {
                            console.log(`任务列表：${$.days.message}\n`);
                            $.message += `任务列表：${$.days.message}\n`;
                        }

                    }

                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//签到查询
function signindex(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/task/index_sign`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 签到查询🚩: ${data}`);
                    $.signindex = JSON.parse(data);
                    if ($.signindex.data && $.signindex.status_code == 200 && $.signindex.data.sign_status == 1) {
                        console.log(`【签到查询】： 今日已签到\n`);
                        $.message += `【签到查询】： 今日已签到\n`;
                    }
                    if ($.signindex.status_code == 10020) {
                        console.log(`【签到查询】：${$.signindex.message}\n`);
                        $.message += `【签到查询】：${$.signindex.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//今日签到
function sign(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/task/sign`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 今日签到🚩: ${data}`);
                    $.sign = JSON.parse(data);
                    if ($.sign.data && $.sign.status_code == 200) {
                        console.log(`【今日签到】： ${$.sign.data.sign_award}金币\n`);
                        $.message += `【今日签到】： ${$.sign.data.sign_award}金币\n`;
                    }
                    if ($.sign.status_code == 10020) {
                        console.log(`【今日签到】：${$.sign.message}\n`);
                        $.message += `【今日签到】：${$.sign.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//视频达成
function spaward(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/task/get_ad_award`,
                headers: duokandianheaderVal,
                body: `adType=2&${duokandianbodyVal}&type=1&overLimit`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 视频达成🚩: ${data}`);
                    $.spaward = JSON.parse(data);
                    if ($.spaward.data && $.spaward.status_code == 200) {
                        console.log(`【视频达成】：${$.spaward.data.award}金币\n`);
                        $.message += `【视频达成】：${$.spaward.data.award}金币\n`;
                    }
                    if ($.spaward.status_code == 10020) {
                        console.log(`【视频达成】：${$.spaward.message}\n`);
                        $.message += `【视频达成】：${$.spaward.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//抽奖次数
function lottoindex(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/lotto/index?${duokandianbodyVal}`,
                headers: duokandianheaderVal,
                //body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 抽奖次数🚩: ${data}`);
                    $.lottoindex = JSON.parse(data);
                    if ($.lottoindex.data && $.lottoindex.status_code == 200) {
                        console.log(`【抽奖次数】：剩余${$.lottoindex.data.times}次\n`);
                        $.message += `【抽奖次数】：剩余${$.lottoindex.data.times}次\n`;
                        console.log(`【碎片信息】：剩余${$.lottoindex.data.chip}个\n`);
                        $.message += `【碎片信息】：剩余${$.lottoindex.data.chip}个\n`;
                    }
                    if ($.lottoindex.status_code == 10020) {
                        console.log(`【抽奖次数】：${$.lottoindex.message}\n`);
                        $.message += `【抽奖次数】：${$.lottoindex.message}\n`;
                        console.log(`【碎片信息】：${$.lottoindex.message}\n`);
                        $.message += `【碎片信息】：${$.lottoindex.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//转盘抽奖
function lotto(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/lotto/start`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 转盘抽奖🚩: ${data}`);
                    $.lotto = JSON.parse(data);
                    A = 1
                    if ($.lotto.data && $.lotto.status_code == 200) {
                        console.log(`【转盘抽奖】：奖励 ${$.lotto.data.award}金币\n`);
                        $.message += `【转盘抽奖】：奖励 ${$.lotto.data.award}金币\n`;
                    }
                    if ($.lotto.status_code == 10020) {
                        console.log(`【转盘抽奖】：${$.lotto.message}\n`);
                        $.message += `【转盘抽奖】：${$.lotto.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//碎片兑换
function chip(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {

            let url = {
                url: `http://dkd-api.dysdk.com/lotto/convert?${duokandianbodyVal}`,
                headers: duokandianspdhheaderVal,
                body: `{"id":4}`,

            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 碎片兑换🚩: ${data}`);
                    $.chip = JSON.parse(data);
                    A = 1
                    if ($.chip.data && $.chip.status_code == 200) {
                        console.log(`【碎片兑换】：奖励 ${$.chip.data.award}金币\n`);
                        $.message += `【碎片兑换】：奖励 ${$.chip.data.award}金币\n`;
                    }
                    if ($.chip.status_code == 10020) {
                        console.log(`【碎片兑换】：${$.chip.message}\n`);
                        $.message += `【碎片兑换】：${$.chip.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//广告视频
function advideo(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/task/get_ad_award`,
                headers: duokandianheaderVal,
                body: `adType=2&${duokandianbodyVal}&type=2&overLimit`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 广告视频🚩: ${data}`);
                    $.advideo = JSON.parse(data);
                    if ($.advideo.data && $.advideo.status_code == 200) {
                        console.log(`【广告视频】：奖励 ${$.advideo.data.award}金币\n`);
                        $.message += `【广告视频】：奖励 ${$.advideo.data.award}金币\n`;
                    }
                    if ($.advideo.status_code == 10020) {
                        console.log(`【广告视频】：${$.advideo.message}\n`);
                        $.message += `【广告视频】：${$.advideo.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//时段刷新
function extratime(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/video/extra_time`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 时段刷新🚩: ${data}`);
                    $.extratime = JSON.parse(data);
                    if ($.extratime.status_code == 200 && $.extratime.data.status == 1) {
                        console.log(`【时段刷新】：刷新成功\n`);
                        $.message += `【时段刷新】：刷新成功\n`;
                    }
                    if ($.extratime.status_code == 10020) {
                        console.log(`【时段刷新】：${$.extratime.message}\n`);
                        $.message += `【时段刷新】：${$.extratime.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//时段奖励
function timeaward(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/video/extra_get`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 时段奖励🚩: ${data}`);
                    $.timeaward = JSON.parse(data);
                    if ($.timeaward.data && $.timeaward.status_code == 200 && !$.timeaward.data.status) {
                        console.log(`【时段奖励】：奖励 ${$.timeaward.data.award}金币\n`);
                        $.message += `【时段奖励】：奖励 ${$.timeaward.data.award}金币\n`;
                    }
                    if ($.timeaward.status_code == 10020) {
                        console.log(`【时段奖励】：${$.timeaward.message}\n`);
                        $.message += `【时段奖励】：${$.timeaward.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//时段翻倍
function timeawardsss(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/video/extra_again`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 时段翻倍🚩: ${data}`);
                    $.timeawardsss = JSON.parse(data);
                    if ($.timeawardsss.data && $.timeawardsss.status_code == 200 && !$.timeaward.data.status) {
                        console.log(`【时段翻倍】：奖励 ${$.timeawardsss.data.award}金币\n`);
                        $.message += `【时段翻倍】：奖励 ${$.timeawardsss.data.award}金币\n`;
                    }
                    if ($.timeawardsss.status_code == 10020 && !$.timeaward.data.status) {
                        console.log(`【时段翻倍】：${$.timeawardsss.message}\n`);
                        $.message += `【时段翻倍】：${$.timeawardsss.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//宝箱刷新
function extrabox(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/red/box_init`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 时段刷新🚩: ${data}`);
                    $.extrabox = JSON.parse(data);
                    if ($.extrabox.status_code == 200) {
                        console.log(`【宝箱刷新】：刷新成功,剩余${$.extrabox.data.diff}秒\n`);
                        $.message += `【宝箱刷新】：刷新成功,剩余${$.extrabox.data.diff}秒\n`;
                    }
                    if ($.extrabox.status_code == 10020) {
                        console.log(`【宝箱刷新】：${$.extrabox.message}\n`);
                        $.message += `【宝箱刷新】：${$.extrabox.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}




//宝箱奖励
function boxaward(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/red/box_award`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 宝箱奖励🚩: ${data}`);
                    $.boxaward = JSON.parse(data);
                    if ($.boxaward.data && $.boxaward.status_code == 200) {
                        console.log(`【宝箱奖励】：奖励 ${$.boxaward.data.award}金币\n`);
                        $.message += `【宝箱奖励】：奖励 ${$.boxaward.data.award}金币\n`;
                    }
                    if ($.boxaward.status_code == 10020) {
                        console.log(`【宝箱奖励】：${$.boxaward.message}\n`);
                        $.message += `【宝箱奖励】：${$.boxaward.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//宝箱翻倍
function boxbox(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/red/box_extra`,
                headers: duokandianheaderVal,
                body: duokandianbodyVal,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 宝箱翻倍🚩: ${data}`);
                    $.boxbox = JSON.parse(data);
                    if ($.boxbox.data && $.boxbox.status_code == 200) {
                        console.log(`【宝箱翻倍】：奖励 ${$.boxbox.data.award}金币\n`);
                        $.message += `【宝箱翻倍】：奖励 ${$.boxbox.data.award}金币\n`;
                    }
                    if ($.boxbox.status_code == 10020) {
                        console.log(`【宝箱翻倍】：${$.boxbox.message}\n`);
                        $.message += `【宝箱翻倍】：${$.boxbox.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//日常任务1
function rw1(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/task/get_award_pro`,
                headers: duokandianheaderVal,
                body: `step=1&${duokandianbodyVal}`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 日常任务1🚩: ${data}`);
                    $.rw1 = JSON.parse(data);
                    if ($.rw1.data && $.rw1.status_code == 200) {
                        console.log(`【日常任务1】：领取 ${$.rw1.data.award}金币\n`);
                        $.message += `【日常任务1】：领取 ${$.rw1.data.award}金币\n`;
                    }
                    if ($.rw1.status_code == 10020) {
                        console.log(`【日常任务1】：${$.rw1.message}\n`);
                        $.message += `【日常任务1】：${$.rw1.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//日常任务2
function rw2(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/task/get_award_pro`,
                headers: duokandianheaderVal,
                body: `step=2&${duokandianbodyVal}`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 日常任务2🚩: ${data}`);
                    $.rw2 = JSON.parse(data);
                    if ($.rw2.data && $.rw2.status_code == 200) {
                        console.log(`【日常任务2】：领取 ${$.rw2.data.award}金币\n`);
                        $.message += `【日常任务2】：领取 ${$.rw2.data.award}金币\n`;
                    }
                    if ($.rw2.status_code == 10020) {
                        console.log(`【日常任务2】：${$.rw2.message}\n`);
                        $.message += `【日常任务2】：${$.rw2.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//刷视频
function video(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            var inss = 0;
            var ins = 0;
            ADD = 0;
            ABB = 0;
            for (let i = 0; i < videoBODY.length; i++) {
                setTimeout(() => {
                    let url = {
                        url: `http://dkd-api.dysdk.com/android_video/getaward`,
                        headers: duokandianheaderVal,
                        body: `${videoBODY[i]}`,
                    }
                    $.post(url, async (err, resp, data) => {
                        try {
                            if (logs) $.log(`${O}, 刷视频🚩: ${data}`);
                            $.video = JSON.parse(data);
                            if ($.video.data && $.video.status_code == 200) {
                                console.log(`【刷视频】：开始领取第${i+1}次视频奖励,获得${$.video.data.award}金币,等待30秒继续\n`);
                                inss += $.video.data.award;
                                ins += 1;
                            }
                            if ($.video.status_code == 10020) {
                                console.log(`【刷视频】：开始领取第${i+1}次视频奖励,${$.video.message},等待30秒继续\n`);
                            }
                            await videoyz()
                            if ($.videoyz.data.status == 3) {
                                await awardpost()
                            }
                        } catch (e) {
                            $.logErr(e, resp);
                        } finally {
                            resolve()
                        }
                    })
                }, i * 30000);
            }
            setTimeout(() => {
                if ($.video && $.video.status_code) {
                    console.log(`【刷视频】：共领取${ins}次视频奖励,共${inss}金币\n`);
                    $.message += `【刷视频】：共领取${ins}次视频奖励,共${inss}金币\n`
                }
                if ($.awardpost && $.awardpost.status_code) {
                    console.log(`【红包奖励】：共领取${ABB}次红包奖励,共${ADD}金币\n`);
                    $.message += `【红包奖励】：共领取${ABB}次红包奖励,共${ADD}金币\n`
                }
                if ($.videoyz && $.videoyz.data.status == 4) {
                    console.log(`【红包奖励】：已完成\n`);
                    $.message += `【红包奖励】：已完成\n`
                }
            }, videoBODY.length * 30000 - 29000)
        }, timeout)
    })
}
//验证视频
function videoyz(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/video/red_countdown`,
                headers: duokandianheaderVal,
                body: `step=2&${duokandianbodyVal}`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 验证视频🚩: ${data}`);
                    $.videoyz = JSON.parse(data);
                    if ($.videoyz.data && $.videoyz.status_code == 200 && $.videoyz.data.status == 2) {
                        console.log(`【验证视频】：剩余 ${$.videoyz.data.red_time}圈\n`);
                    }
                    if ($.videoyz.data && $.videoyz.status_code == 200 && $.videoyz.data.status == 3) {
                        console.log(`【验证视频】：验证通过\n`);
                    }
                    if ($.videoyz.status_code == 10020) {
                        console.log(`【验证视频】：${$.videoyz.message}\n`);
                        $.message += `【验证视频】：${$.videoyz.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//红包奖励
function awardpost(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/video/red_getaward`,
                headers: duokandianheaderVal,
                body: `${duokandianbodyVal}`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 红包奖励🚩: ${data}`);
                    $.awardpost = JSON.parse(data);
                    if ($.awardpost.data && $.awardpost.status_code == 200) {
                        console.log(`【红包奖励】：开始领取第${ABB+1}次奖励，获得 ${$.awardpost.data.award}金币\n`);
                        ADD += $.awardpost.data.award;
                        ABB += 1;
                    }
                    if ($.awardpost.status_code == 10020) {
                        console.log(`【红包奖励】：${$.awardpost.message}\n`);
                        $.message += `【红包奖励】：${$.awardpost.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//提现
function tx(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/money/withdraw_do?${duokandianbodyVal}`,
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "zh-cn",
                    "Connection": "close",
                    "Content-Length": "68",
                    "Content-Type": "application/json;charset=utf-8",
                    "Host": "dkd-api.dysdk.com",
                    "Origin": "http://dkd-api.dysdk.com",
                    "Referer": "http://dkd-api.dysdk.com/index.html",
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                },
                body: `{"money":${CASH},"type":2,"withdraw_card":null,"program":8,"is_special":2}`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 提现🚩: ${data}`);
                    $.tx = JSON.parse(data);
                    if ($.tx.status_code == 200) {
                        console.log(`【提现】：成功提现 ${CASH}元\n`);
                        $.message += `【提现】：成功提现 ${CASH}元\n`;
                    }
                    if ($.tx.status_code == 10020) {
                        console.log(`【提现】：${$.tx.message}\n`);
                        $.message += `【提现】：${$.tx.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//提现查询
function txcx(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://dkd-api.dysdk.com/money/withdraw_index?${duokandianbodyVal}`,
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "zh-cn",
                    "Connection": "close",
                    "Content-Length": "68",
                    "Content-Type": "application/json;charset=utf-8",
                    "Host": "dkd-api.dysdk.com",
                    "Origin": "http://dkd-api.dysdk.com",
                    "Referer": "http://dkd-api.dysdk.com/index.html",
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                },
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 提现查询🚩: ${data}`);
                    $.txcx = JSON.parse(data);
                    if ($.txcx.data && $.txcx.status_code == 200) {

                        txtxid = $.txcx.data.with_list.find(item => item.money === 3);


                        txtx = txtxid.msg3.substr(txtxid.msg3.indexOf('已签到') + 3, 3).split('天')[0];
                        console.log(`【提现查询】：已连续签到${txtx}天\n`);
                        $.message += `【提现查询】：已连续签到${txtx}天\n`;
                    }
                    if ($.txcx.status_code == 10020) {
                        console.log(`【提现查询】：${$.txcx.message}\n`);
                        $.message += `【提现查询】：${$.txcx.message}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
// prettier-ignore
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log(``, `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, ``).trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ``;
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, ``) : e
                } catch (t) {
                    e = ``
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + ``).substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr((`` + e[s]).length)));
            return t
        }
        msg(e = t, s = ``, i = ``, r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = [``, "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log(``, `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
