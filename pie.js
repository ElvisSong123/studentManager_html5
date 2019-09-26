(function() {

    var obj = {
        init: function() {
            this.getData();
            this.option = {
                title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['', '', '', '', '']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: '', name: '' },
                        { value: '', name: '' },
                        { value: '', name: '' },
                        { value: '', name: '' },
                        { value: '', name: '' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };

        },
        getData: function() {
            var self = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=dongmeiqi_1547441744650',
                success: function(res) {
                    var data = JSON.parse(res);
                    console.log(data);
                    self.renderBySex(data);
                    self.renderByArea(data);
                }



            })
        },
        renderByArea: function(data) {
            var myChart = echarts.init(document.getElementById('area'));
            var arraddress = [];
            var objaddress = {};
            var finalarr = [];
            data.data.forEach(function(ele, index) {
                // console.log(ele.address);
                var address = ele.address;
                if (arraddress.indexOf(address) == -1) {
                    arraddress.push(address);
                    objaddress[address] = 1;
                } else {
                    objaddress[address]++;
                }

            });
            // console.log(objaddress);
            for (var prop in objaddress) {
                var obj = {};
                obj.value = objaddress[prop];
                obj.name = prop;
                finalarr.push(obj);

            }
            console.log(finalarr);
            this.option.title.text = "渡一学生地区分布";
            this.option.legend.data = arraddress;
            this.option.series[0].data = finalarr;
            var option = this.option;
            myChart.setOption(option);





        },
        renderBySex: function(data) {
            var myChart = echarts.init(document.getElementById('sex'));
            var arrsex = [];
            var objsex = {};
            var finalarr = [];
            data.data.forEach(function(ele, index) {
                console.log(ele.sex);
                var sex = ele.sex == 0 ? '男' : '女';
                if (arrsex.indexOf(sex) == -1) {
                    arrsex.push(sex);
                    objsex[sex] = 1;
                } else {
                    objsex[sex]++;
                }

            });
            // console.log(objsex);
            for (var prop in objsex) {
                var obj = {};
                obj.value = objsex[prop];
                obj.name = prop;
                finalarr.push(obj);

            }
            console.log(finalarr);
            this.option.title.text = "渡一学生性别分布";
            this.option.legend.data = arrsex;
            this.option.series[0].data = finalarr;
            var option = this.option;
            myChart.setOption(option);
        }
    }
    obj.init();
    $('.student-precent').on('click', function() {
        obj.init();
    })
})();