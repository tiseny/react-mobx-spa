import React from 'react'
import './index.less';

class Amap extends React.PureComponent {
	
	componentDidMount() {
		this.initMap()
	}
  
  render() {
    return (
     	<section className="map-wrap">
				<div className="amap-wrap">
					<div id="container"></div>
				</div>
     	</section>
    );
	}
	
	initMap() {
		
		AMap.plugin(['Map3D', 'AMap.DistrictSearch','AMap.ToolBar'], function(){//异步加载插件
			var map = new AMap.Map('container', {
					viewMode: '3D',
					pitch: 50,
					zoom: 11,
					center: [116.480766, 39.932931]
			});
			var toolbar = new AMap.ToolBar();
			map.addControl(toolbar);
				// 设置光照
			map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
			map.DirectionLight = new AMap.Lights.DirectionLight([0, 0, 1], [1, 1, 1], 1);

			var object3Dlayer = new AMap.Object3DLayer();
			map.add(object3Dlayer);

			new AMap.DistrictSearch({
					subdistrict: 0,   //返回下一级行政区
					extensions: 'all',  //返回行政区边界坐标组等具体信息
					level: 'city'  //查询行政级别为 市
			}).search('朝阳区', function (status, result) {
					var bounds = result.districtList[0].boundaries;
					var height = 5000;
					var color = '#0088ffcc'; // rgba
					var prism = new AMap.Object3D.Prism({
							path: bounds,
							height: height,
							color: color
					});

					prism.transparent = true;
					object3Dlayer.add(prism);

					var text = new AMap.Text({
							text: result.districtList[0].name + '</br>(' + result.districtList[0].adcode + ')',
							verticalAlign: 'bottom',
							position: [116.528261, 39.934313],
							height: 5000,
							style: {
									'background-color': 'transparent',
									'-webkit-text-stroke': 'red',
									'-webkit-text-stroke-width': '0.5px',
									'text-align': 'center',
									'border': 'none',
									'color': 'white',
									'font-size': '24px',
									'font-weight': 600
							}
					});

					text.setMap(map);
			});
		});

	}

}


export default Amap;

