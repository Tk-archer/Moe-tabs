$(document).ready(function() {

	$('#up').mousedown(function(argument) {

		var reader = new FileReader();
		var file = document.getElementById('imgurl').files[0];
		var fileSize = file.size / 1024;

		if (check(file.type)) {
			reader.readAsDataURL(file);
			reader.onload = function() {
				sendmessage(["img", reader.result]);
			}

		}


	});


});

sendmessage = function(argument) {
	chrome.runtime.sendMessage(argument, function(re) {
		if (re == "1") {
			console.log('ok');
			document.getElementById('imgurl').value('');
		};
	})
}
$('#ran').mousedown(function() {

});
check = function(argument) {
	var type = ["jpg", "png", "jpeg", "gif"];
	for (var i = 0; i < type.length; i++) {
		if (argument.indexOf(type[i])) {
			return 1;
		}
	}
	return 0;
};