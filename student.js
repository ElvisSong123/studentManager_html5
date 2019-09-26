(function($) {
    var obj1 = {
        init: function() {
            this.bindEvent()
        },
        bindEvent: function() {
            $('.header .btn').on('click', function() {
                $('.header .drop-list').slideToggle();

            });
            $('.left-side .list .student').on('click', function(e) {
                // console.log(this);
                $('.left-side .active').removeClass('active');
                $(e.target).addClass('active')

            });
            $('.header .drop-list').on('mouseleave', function() {
                $('.header .drop-list').slideUp();
            });
            $('.list li').on('click', function(e) {
                $('.tab-content-item').hide();
                var dataid = $(e.target).attr('data-id');
                console.log(dataid);
                $('#' + dataid).show();
            });
            $('#modal').on('click', function() {
                $(this).hide();
            });
            $('#modal-content').on('click', function(e) {

                e.stopPropagation();
            });
            $('.del-modal').add('.reset-btn').on('click', function() {
                $('.del-modal').hide();
            });
            $('.con').on('click', function(e) {
                e.stopPropagation();
            })

        }
    }
    obj1.init();
})(window.jQuery)