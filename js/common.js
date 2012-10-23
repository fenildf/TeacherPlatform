$(function() {
    $("input.input_text_ui").focus(function() {
        if ($(this).val() == this.defaultValue) {
            $(this).val("");
        }
    }).blur(function() {
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    });
});
/* 模拟下拉列表 */
$(document).ready(function(e) {
	function select1(){
		$(".xlcd").hide();
		$("#kecheng").click(function(){
			$(".xlcd").toggle();	
		});
		$(".xlcd li,document").click(function(){
			$(".xlcd").toggle();
			$("#kecheng").val($(this).text());
			//window.location.href=$(this).attr("url");
		});
		
		return false;
	}
	select1();

	function select2(){
		$(".xlcd2").hide();
		$("#nianji").click(function(){
			$(".xlcd2").toggle();
		});
		$(".xlcd2 li").click(function(){
			$(".xlcd2").toggle();
			$("#nianji").val($(this).text());
			//window.location.href=$(this).attr("url");
		});
		
		return false;
	}
	select2();
	function select3(){
		$(".xlcd3").hide();
		$("#zhuangtai").click(function(){
			$(".xlcd3").toggle();
		});
		$(".xlcd3 li").click(function(){
			$(".xlcd3").toggle();
			$("#zhuangtai").val($(this).text());
			//window.location.href=$(this).attr("url");
		});
		
		return false;
	}
	select3();
	function select4(){
		$(".xlcd4").hide();
		$("#page_count").click(function(){
			$(".xlcd4").toggle();	
		});
		$(".xlcd4 li").click(function(){
			$(".xlcd4").toggle();
			$("#page_count").val($(this).text());
			//window.location.href=$(this).attr("url");
		});
		return false;
	}
	select4();
});