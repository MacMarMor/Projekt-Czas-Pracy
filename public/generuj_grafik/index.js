alert("start");
console.log("start");
/*$(".button_sterowanie_aplikacji2").bind('ajax:success', function(result) {
    alert(result);
	console.log()(result);
});*/
$("#form_generuj").bind('ajax:success', function(result) {
    alert(result);
	console.log()(result);
}); 
$('#form_generuj').click(function() {
        $.ajax({
            type: 'POST',
            url: '/generate',
            contentType: "application/json; charset=utf-8",
            datatype: 'json',
            success: function(result) {
                console.log(result); // this is where I would consume/store the token
            },
            error: function(result) {
                console.log(result);
            }
        });   
    });