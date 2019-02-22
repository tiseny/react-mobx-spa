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

    //创建地图
    var map = new AMap.Map('container', {
      zoom: 4
    });

    function initPage(DistrictCluster, $) {

      var distCluster = new DistrictCluster({
        map: map, //所属的地图实例
        zIndex: 11,
        getPosition: function (item) {

          if (!item) {
            return null;
          }

          var parts = item.split(',');

          //返回经纬度
          return [parseFloat(parts[0]), parseFloat(parts[1])];
        },
        renderOptions: {
          //基础样式
          featureStyle: {
            fillStyle: 'rgba(102,170,0,0.5)', //填充色
            lineWidth: 2, //描边线宽
            strokeStyle: 'rgb(31, 119, 180)', //描边色
            //鼠标Hover后的样式
            hoverOptions: {
              fillStyle: 'rgba(255,255,255,0.2)'
            }
          },
          //特定区划级别的默认样式
          featureStyleByLevel: {
            //全国
            country: {
              fillStyle: 'rgba(49, 163, 84, 0.8)'
            },
            //省
            province: {
              fillStyle: 'rgba(116, 196, 118, 0.7)'
            },
            //市
            city: {
              fillStyle: 'rgba(161, 217, 155, 0.6)'
            },
            //区县
            district: {
              fillStyle: 'rgba(199, 233, 192, 0.5)'
            }
          },
          //直接定义某写区划面的样式
          getFeatureStyle: function (feature, dataItems) {

            if (dataItems.length > 3000) {

              return {
                fillStyle: 'red'
              };

            } else if (dataItems.length > 1000) {
              return {
                fillStyle: 'orange'
              };
            }

            return {};
          }
        }
      });

      window.distCluster = distCluster;

      $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
      $.get('https://a.amap.com/amap-ui/static/data/10w.txt', function (csv) {

        $('#loadingTip').remove();

        var data = csv.split('\n');

        distCluster.setData(data);
      });
    }

    //加载相关组件
    AMapUI.load(['ui/geo/DistrictCluster', 'lib/$'], function (DistrictCluster, $) {

      //启动页面
      initPage(DistrictCluster, $);
    });
  }

}


export default Amap;

