
var map, geocoder, address;

//移除腾讯logo
function removeLogo() {
	var logo = $(".csssprite").closest("a").closest("div");
	logo.css("display", "none");
	logo.next("div").css("display", "none");

}

//初始化入口
function init() {
	var center = new qq.maps.LatLng(39.90, 116.40);
	map = new qq.maps.Map(document.getElementById('mapContainer'), {
		center: center,
		zoom: 12,
		mapTypeControl: false
	});

	// var controlStyle = "widht:52px;height:52px";
	// var centerControl = document.createElement("div");
	// centerControl.id = "iMarker"
	// centerControl.style.cssText = controlStyle;
	// centerControl.innerHTML = "<image src='POI.png' height='100%' width='100%' />";
	// centerControl.index = 1; //设置在当前布局中的顺序
	// map.controls[qq.maps.ControlPosition.CENTER].push(centerControl);

	//定义定位对象


	//自动补全地址
	
	//var aq = new qq.maps.place.Autocomplete(document.getElementById("address_type"));

	//searchService.setLocation(result.detail.name);


};

	geocoder = new qq.maps.Geocoder({
		complete: function(result) {
			    map.setCenter(result.detail.location);
			    document.getElementById("out_search").value = result.detail.location;
                var marker = new qq.maps.Marker({
                map:map,    
                position: result.detail.location
                });
		}
	});

	//地图层片加载完成事件
    function codeAddress() {
        var address = document.getElementById("address_type").value;
        //通过getLocation();方法获取位置信息值
        geocoder.getLocation(address);
    }


init();
codeAddress();







