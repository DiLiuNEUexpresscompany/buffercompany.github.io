$(document).ready(function () {
    /*!获取当前省市信息*/
    var geolocation = new BMap.Geolocation();
    var gc = new BMap.Geocoder();
    var pageBtnList = $('.location-address .pagination');
    var pageNum = 0;
    window.address = {};
    address.currentprovince = '北京市';
    address.currentcity = '北京市';
    address.selectedprovince = '北京市';
    address.selectedcity = '北京市'

    /*! #select1--change事件 */
    $('#select1').change(function(){
        console.log('address.selectedprovince:' + address.selectedprovince);
        // 获取各省市json数据
        $.getJSON('/shops/json/oppoShops1.json', function (data) {
            console.log(data);
            var cities = $.grep(data,function(n,i){
                return n.province == address.selectedprovince;
            });
            var html0 = '';
            var html = '';
            var cityLength = cities[0].city.length;
            for(var i = 0; i < cityLength; i++){
                html0 = i == 0 ? '<option selected="selected">' + cities[0].city[i] + '</option>' : '<option>' + cities[0].city[i] + '</option>';
                html += html0;
            };
            $('#select2').html(html);
            console.dir(cities);
            console.dir('city:' + cities[0].city + 'province:' + cities[0].province);
            console.log('cityLength:' + cityLength);
            console.log('html:' + html);
        });

        address.selectedprovince = $(this).val();
        address.selectedcity = $('#select2').val();

        changeSearchWord(address.selectedcity);
        if(address.selectedprovince == '请选择'){
            initMap();
        } else{
            loadMap(address.selectedprovince);
        };

        // 更新分页数
        var jsonData, cityName;
        var data = $.getJSON('/shops/json/oppoShopsDetails.json', function (data) {
            //jsonData = $.grep(data, function(a){
            //    cityName = address.selectedcity == '请选择' ? address.currentcity : address.selectedcity;
            //    return a.cityName == cityName;
            //});
            //pageNum = jsonData[0].shops.length;
        });
        window.data = data;
        console.log('#select1-change-data:' + data.responseJSON);
        jsonData = $.grep(data.responseJSON, function(a){
            cityName = address.selectedcity == '请选择' ? address.currentcity : address.selectedcity;
            return a.cityName == cityName;
        });
        jsonData = jsonData[0];
        console.log('#select1-change-jsonData:' + jsonData);debugger
        pageNum = jsonData.shops.length;
        pageNum = pageNum % 15 == 0 ? parseInt(pageNum / 15) : parseInt(pageNum / 15) + 1;// 通过shops数量判断page数量
        changePageBtnNum(pageBtnList, pageNum);debugger
        loadShopList(1, jsonData[0]);
    });

    /*! #select2--change事件 */
    $('#select2').change(function(){
        address.selectedcity = $(this).val();
        changeSearchWord(address.selectedcity);
        loadMap($(this).val());
        $('.location-address .pagination li:first-child').trigger('click');
    });
    /*!定位*/
    geolocation.getCurrentPosition(function (r) {
        //定位结果对象会传递给r变量
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // 通过Geolocation类的getStatus()可以判断是否成功定位。
            var pt = r.point;
            gc.getLocation(pt, function (rs) {
                var addComp = rs.addressComponents;
                address.currentprovince = addComp.province;
                address.currentcity = addComp.city;
                $('#select1').val(address.currentprovince);//切换为当前省
                $('#select1').trigger('change');
                if(address.currentcity == '请选择'){
                    initMap();
                } else{
                    loadMap(address.currentcity);//显示当前城市地图
                };
                console.log('province:' + address.currentprovince + 'city:' + address.currentcity);
            });
        } else {
            //关于状态码
            // BMAP_STATUS_SUCCESS 检索成功。对应数值“0”。
            // BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
            // BMAP_STATUS_UNKNOWN_LOCATION 位置结果未知。对应数值“2”。
            // BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
            // BMAP_STATUS_INVALID_KEY 非法密钥。对应数值“4”。
            // BMAP_STATUS_INVALID_REQUEST 非法请求。对应数值“5”。
            // BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
            // BMAP_STATUS_SERVICE_UNAVAILABLE 服务不可用。对应数值“7”。(自 1.1 新增)
            // BMAP_STATUS_TIMEOUT 超时。对应数值“8”。(自 1.1 新增)
            switch (this.getStatus()) {
                case 2:
                    alert('位置结果未知 获取位置失败.');
                    break;
                case 3:
                    alert('导航结果未知 获取位置失败..');
                    break;
                case 4:
                    alert('非法密钥 获取位置失败.');
                    break;
                case 5:
                    alert('对不起,非法请求位置 获取位置失败.');
                    break;
                case 6:
                    alert('对不起,当前 没有权限 获取位置失败.');
                    break;
                case 7:
                    alert('对不起,服务不可用 获取位置失败.');
                    break;
                case 8:
                    alert('对不起,请求超时 获取位置失败.');
                    break;
            }
        }
    }, {enableHighAccuracy: true});

    /*!城市查询*/
    $.getJSON('/shops/json/oppoShops1.json', function (data) {
        //console.log(data);
        var cities = $.grep(data,function(n,i){
            return n.province == address.currentprovince;
        });
        //console.dir(cities);
    });
    //console.dir('address:' + address);

    // 给pagination绑定click事件
    $('.location-address .pagination li').each(function (index, element) {
        $(element).click(function () {
            var page = index;
            var jsonData = {};
            // 加载json数据
            $.getJSON('/shops/json/oppoShopsDetails.json', function (data) {
                jsonData = $.grep(data, function(n, i){
                    return n.cityName == address.selectedcity;
                });
                jsonData = jsonData[0];
                loadShopList(page, jsonData);
                //changeActivePageBtn();
                changeTitle(jsonData.cityName, jsonData.shops.length);
            });
        });
    });

    /*!页面载入时进入第一页*/
    $('.location-address .pagination li').eq(1).trigger('click');

    /*!定义加载体验店json数据函数*/
    function loadShopList(page, jsonData) {
        var html = "";
        var startNum = 15 * (page - 1);
        var listLength = 15;
        var markerIndex = 1;
        var html0 = "";
        // 读取json数据
        for (var i = startNum, endNum = startNum + listLength; i < endNum; i++) {
            var shopName = jsonData.shops[i] ? jsonData.shops[i].shopName : null;
            var shopType = jsonData.shops[i] ? jsonData.shops[i].shopType : null;
            var shopAddress = jsonData.shops[i] ? jsonData.shops[i].shopAddress : null;
            var shopTel = jsonData.shops[i] ? jsonData.shops[i].shopTel : null;
            // console.log(i);
            // 进行json数据是否加载完的判断
            if (shopName && shopType && shopAddress && shopTel) {
                html0 = '<li class="store-location">'
                    + '<span class="marker">'
                    + markerIndex
                    + '</span>'
                    + '<div class="store-location-info">'
                    + '<div class="store-location-info-name">'
                    + '<p><strong>' + shopName + '</strong></p>'
                    + '<p><a class="view-details" href="javascript:;">查看详情</a></p></div>'
                    + '<div class="store-location-info-type"><p>' + shopType + '</p></div>'
                    + '<div class="store-location-info-address"><p>' + shopAddress + '</p></div>'
                    + '<div class="store-location-info-tel"><p>' + shopTel + '</p></div></div></li>';
                html += html0;
            }
            ;
            markerIndex++;
        }
        ;
        // console.log(html);
        // 判断是否已经加载到列表最后一页(数据是否加载完)
        if (html != "") {
            // 更新列表内容
            $('.location-address .store-list')[0].innerHTML = html;
            $('.location-address .pagination li').eq(page).addClass('active').siblings().removeClass('active');
        } else {
            alert('已到最后一页！');
        }
    }
    /*!定义改变体验店名称函数*/
    function changeTitle(cityName, length) {
        var html = cityName
            + ' · 体验店 '
            + '('
            + length
            + ')';
        // ' 武汉市 · 体验店（36）'
        $('.location-address .title')[0].innerHTML = html;
    }
    /*!定义加载百度地图函数*/
    function loadMap(newcity){
        var map = new BMap.Map('baiduMap');
        map.centerAndZoom(newcity, 11);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.ScaleControl());   //添加地图类型控件
        map.addControl(new BMap.NavigationControl());   //添加地图类型控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
//        map.setCurrentCity('武汉');          // 设置地图显示的城市 此项是必须设置的
//        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
//        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
//        map.addControl(top_left_control);
//        map.addControl(top_left_navigation);
        var local = new BMap.LocalSearch(map, {
            renderOptions:{map: map}
        });
        local.search("OPPO体验店");
        console.log('百度地图显示城市：' + newcity);
    }
    /*!定义默认显示地图函数*/
    function initMap(){
        var map = new BMap.Map('baiduMap');
        map.centerAndZoom('北京市', 11);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.ScaleControl());   //添加地图类型控件
        map.addControl(new BMap.NavigationControl());   //添加地图类型控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
    /*!定义改变搜索关键字函数*/
    function changeSearchWord(word){
        word = word == '请选择' ? '' : word;
        $('.hero .input-item input').attr('value',word);
    }
    /*!定义改变分页按钮数量函数*/
    function changePageBtnNum(obj, num){
        var pageListHtml = '', pageHtml = '';
        for(var i = 1, t = num + 1; i < t; i++){
            pageListHtml += '<li><a href="javascript:;">' + i + '</a></li>';
        };
        pageHtml = '<li><a class="disabled prev" href="javascript:;">«</a></li>' + pageListHtml + '<li><a class="disabled next" href="javascript:;">»</a></li>';
        $(obj).html(pageHtml);
        console.log('pageHtml:' + pageHtml);
    }
    /*!定义改变分页按钮active样式函数*/
    function changeActivePageBtn (obj, pageNum){
        $(obj).find('li').eq(pageNum + 1).addClass('active').siblings().removeClass('active');
    }
});
