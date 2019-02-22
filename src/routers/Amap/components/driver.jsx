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
          <div id="panel"></div>
				</div>
     	</section>
    );
	}
	
	initMap() {

    AMap.plugin(['AMap.Driving','AMap.ToolBar'], function(){//异步加载插件
      console.log(12121)
      //基本地图加载
      var map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.397428, 39.90923],//地图中心点
          zoom: 13 //地图显示的缩放级别
      });
      //构造路线导航类
      var driving = new AMap.Driving({
          map: map,
          panel: "panel"
      }); 
      // 根据起终点名称规划驾车导航路线
      driving.search([
          {keyword: '北京市地震局(公交站)',city:'北京'},
          {keyword: '亦庄文化园(地铁站)',city:'北京'}
      ], function(status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === 'complete') {
            console.log('绘制驾车路线完成')
          } else {
            console.log('获取驾车数据失败：' + result)
          }
      });
    })
    
  }

}


export default Amap;

