// 建立物件
var xhr = new XMLHttpRequest();
// 用物件打開網址
xhr.open('GET', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97');
// 載入之後執行函式
xhr.onload = function(){
    if (xhr.status === 200){
        // 用xhr.responseText來接，外面再包JSON.parse包起來，
        let ListInfo = JSON.parse(xhr.responseText);
        let len = ListInfo.result.records.length;
        // 下拉
        let districtID = document.getElementById("district");
        // 下面的資訊
        let Lists = document.getElementsByClassName('list')[0];
        // 熱門行政區
        let hot = document.getElementsByClassName('hot')[0];

        // 監聽
        districtID.addEventListener("change", ValueDistrict, false);
        hot.addEventListener("click", hotDistrict, false);
        
        // 抓資料
        function needinfomation(){
            // 為了抓出所有區的陣列來去重，所以建立新的陣列
            let arrayZone = new Array();

            for(let i=0; i<len; i++){
                //先抓全區資料
                arrayZone[i] = ListInfo.result.records[i].Zone;
                //把資料放入變數
                district += arrayZone[i]+ ",";
            }
            uniqDistrict();
        };

        // 把全部的區抓出來後，放入options
        function uniqDistrict(){
            // 抓字數
            let str = district.length-1;
            //扣掉最後一個字元
            district = district.slice(0,str);
            
            // 抓html裡面的文字並轉陣列 存入變數裡
            let inputdistrict = district.split(',');

            //開始跑去重函式
            function uniqqueArray(arr){
                // 存放結果
                let res = [];
                //跑回圈
                for(var i in arr){ // 遍历数组元素
                    if(res.indexOf(arr[i]) == -1){  //如果结果数组不存在该元素则保存
                        res.push(arr[i]);
                    }
                }
                // 返回去重后的数组
                return res;
            };
            //陣列的而且沒有重複
            let uniq = uniqqueArray(inputdistrict);
            //開始塞到html裡面
            uniqtotall = uniq.length;
            for(let i=1; i<uniqtotall; i++){
                districtID.innerHTML += "<option value="+uniq[i]+">"+uniq[i]+"</option>";
            }
        };

        needinfomation();

        //偵測選取的下拉值 並塞入下面的畫面
        function ValueDistrict(e){
            // 得知現在選到的區
            let selectDistric = e.target.value;
            // 選到的區的文字塞入h2裡面
            document.getElementsByTagName("h2")[0].innerHTML = selectDistric;

            // 先設字串
            let str = '';
            // 跑回圈
            for(let i=0; i<len; i++){
                // 區
                let Zone = ListInfo.result.records[i].Zone;
                // 景點名字
                let Name = ListInfo.result.records[i].Name;
                // 開放時間
                let Opentime = ListInfo.result.records[i].Opentime;
                // 地址
                let Add = ListInfo.result.records[i].Add;
                //電話
                let Tel = ListInfo.result.records[i].Tel;
                // 免費參觀
                let Ticketinfo = ListInfo.result.records[i].Ticketinfo;
                // 圖片連結
                let Picture1 = ListInfo.result.records[i].Picture1;
                
                if( selectDistric == Zone){
                    str += '<div class="box"><div class="cover"><img src="'+Picture1+'" alt=""></div><div class="name"><h3>'+Name+'</h3><span>'+Zone+'</span></div><div class="info"><p class="date">'+Opentime+'</p><p class="address">'+Add+'</p><p class="phone">'+Tel+'<span class="free">'+Ticketinfo+'</span></p></div></div>';
                }
            }
            //把html塞入list裡面
            Lists.innerHTML = str;
        };

        //偵測點選的下拉值 並塞入下面的畫面
        function hotDistrict(e){
            // 得知現在選到的區
            let hotDistric = e.target.innerHTML;
            // 選到的區的文字塞入h2裡面
            document.getElementsByTagName("h2")[0].innerHTML = hotDistric;

            // 先設字串
            let str = '';
            // 跑回圈
            for(let i=0; i<len; i++){
                // 區
                let Zone = ListInfo.result.records[i].Zone;
                // 景點名字
                let Name = ListInfo.result.records[i].Name;
                // 開放時間
                let Opentime = ListInfo.result.records[i].Opentime;
                // 地址
                let Add = ListInfo.result.records[i].Add;
                //電話
                let Tel = ListInfo.result.records[i].Tel;
                // 免費參觀
                let Ticketinfo = ListInfo.result.records[i].Ticketinfo;
                // 圖片連結
                let Picture1 = ListInfo.result.records[i].Picture1;
                
                if( hotDistric == Zone){
                    str += '<div class="box"><div class="cover"><img src="'+Picture1+'" alt=""></div><div class="name"><h3>'+Name+'</h3><span>'+Zone+'</span></div><div class="info"><p class="date">'+Opentime+'</p><p class="address">'+Add+'</p><p class="phone">'+Tel+'<span class="free">'+Ticketinfo+'</span></p></div></div>';
                }
            }
            //把html塞入list裡面
            Lists.innerHTML = str;
        };
    } else {
        console.log("發生錯誤");
    }
}
//程式請求
xhr.send();







