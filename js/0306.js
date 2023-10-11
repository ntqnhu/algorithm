$(document).ready(function () {
    var topbarHeight= $('#top-bar').outerHeight(); //chieu cao cua top bar+margin
    $('#top-bar a').click(function (e) { 
        e.preventDefault();
        $('#top-bar a').removeClass('active');
        $(this).addClass('active');
       $('html,body').stop().animate({
           scrollTop: $(this.hash).offset().top-topbarHeight//this.hash=id cua no
       },1000,'easeOutBounce')
    });
   
});