(function($) {
    var obj = {
        init: function() {
            this.bindEvent();
            this.selfAll = this;
            this.dataArr = [];
        },
        bindEvent: function() {
            var self = this;

            $('.student.student-list').on('click', function() {
                self.ajax('api/student/findAll?appkey=dongmeiqi_1547441744650', '', self.renderTableList);
            });
            $('#submit-add').on('click', function() {
                var form = $('#student-form').serializeArray();
                var formArr = {};
                form.forEach(function(ele, index) {
                    formArr[ele.name] = ele.value;
                });
                var key = self.check(formArr);
                if (key) {
                    self.ajax('api/student/addStudent?appkey=dongmeiqi_1547441744650', formArr, function() {
                        $('.student.student-list').trigger('click');
                    });
                }

            });
            $('.search-btn').on('click', function() {
                var val = $('.search-wrap .inp').val();
                var sex = parseInt($('.search-wrap .sex:checked').val());

                var data = {};
                data.search = val;
                data.sex = sex;
                data.page = 1;
                data.size = 5;
                console.log(data);
                self.ajax('api/student/searchStudent?appkey=dongmeiqi_1547441744650', data, function(res) {
                    self.renderTableList(res, true);
                });
            })

        },
        ajax: function(url, data, callback) {
            var self = this;
            // console.log(self)
            $.ajax({
                type: 'get',
                url: 'http://api.duyiedu.com/' + url,
                data: data,
                success: function(res) {
                    callback.call(obj, res);
                },
                error: function() {
                    console.log('error');
                }

            })
        },
        renderTableList: function(res, isSearch) {
            var self = this;
            if (isSearch) {
                var data = JSON.parse(res).data.searchList;
            } else {
                var data = JSON.parse(res).data
            }

            if (self.dataArr.indexOf(data) == -1) {
                self.dataArr = [];
                self.dataArr.push(data);
            } else {
                return false;
            }
            console.log(res);
            var str = '';
            var len = data.length ? data.length : 0;

            if (len > 0) {
                data.forEach(function(ele, i) {
                    str += '<tr><td>' + ele.sNo + '</td>\
                    <td>' + ele.name + '</td>\
                    <td>' + (ele.sex ? '女' : '男') + '</td>\
                    <td>' + ele.email + '</td>\
                    <td>' + (new Date().getFullYear() - ele.birth) + '</td>\
                    <td>' + ele.phone + '</td>\
                    <td>' + ele.address + '</td>\
                    <td><button class="success edit" data-index="' + i + '">编辑</button>\
                    <button class="del" data-index="' + i + '">删除</button></td></tr>';
                });
            };
            // $('#students-table tbody').html(str);
            var tbody = $('#student-list').find('tbody');
            tbody.html(str);

            this.pop();

        },
        pop: function() {
            var self = this;
            $('.edit').on('click', function() {
                $('#modal').show();
                var num = parseInt($(this).attr('data-index'));
                var data = self.dataArr[0][num];
                var form = $('#modal-form')[0];
                for (var prop in data) {
                    form[prop] ? form[prop].value = data[prop] : '';
                }

                console.log(data);
                $('#modal-form .submit').on('click', function(e) {
                    e.preventDefault();
                    var form = $('#modal-form').serializeArray();
                    var formArr = {};
                    form.forEach(function(ele, index) {
                        formArr[ele.name] = ele.value;
                    });

                    self.ajax('api/student/updateStudent?appkey=dongmeiqi_1547441744650', formArr, function(e) {
                        $('.student.student-list').trigger('click');
                        $('#modal').hide();
                    });
                })
            });
            $('.del').on('click', function() {
                var del = this;
                $('.del-modal').show();
                $('.sure-btn').on('click', function() {
                    var num = parseInt($(del).attr('data-index'));
                    var sNo = self.dataArr[0][num].sNo;

                    self.ajax('api/student/delBySno?appkey=dongmeiqi_1547441744650', { sNo: sNo }, function() {
                        $('.student.student-list').trigger('click');
                        $('.del-modal').hide();
                        self.dataArr[0].splice(num);
                        // console.log(self.dataArr)
                    });
                })
            });

        },
        check: function(data) { //数据校验函数
            var regname = /^[\u4E00-\u9FA5]{2,4}$/g;
            var regsNo = /\D+/g;
            var regEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/g;
            var regphone = /^[1][3,4,5,7,8][0-9]{9}$/g;
            var regadress = /[\u4E00-\u9FA50-9]+/g;
            if (!regname.test(data.name)) {
                alert('请输入正确的名字字符');
                return false;
            } else if (regsNo.test(data.sNo)) {
                alert("请输入正确的学号");
                return false;
            } else if (!regEmail.test(data.email)) {
                alert("请输入正确的邮箱");
                return false;
            } else if (data.birth > new Date().getFullYear() || data.birth < 1900) {
                alert("请输入正确的生日日期");
                return false;

            } else if (!regphone.test(data.phone)) {
                alert("请输入正确的电话号码格式");
                return false;
            } else if (!regadress.test(data.address)) {
                alert("请输入正确的地址");
                return false;
            } else {
                return true;
            }

        }
    }
    obj.init();
})(window.jQuery)