var err_found = 0;

function validate() {
	fName = $('#fName').val();
	lName = $('#lName').val();
	email = $('#email').val();
	pass = $('#pass').val();
	rpass = $('#rpass').val();

	regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	regexUC = new RegExp('[A-Z]');
	regexLC = new RegExp('[a-z]');
	regexNum = new RegExp('[0-9]');

	$('.errMsg').removeClass('show');
	err_found = 0;

	if (!fName) {
		printErrors('.errMsg.errfName', 'First Name cannot be left blank.');
	}
	if (!lName) {
		printErrors('.errMsg.errlName', 'Last Name cannot be left blank.');
	}
	if (!email) {
		printErrors('.errMsg.erremail', 'EMail field cannot be left blank.');
	} else if(!regexEmail.test(email)){
		printErrors('.errMsg.erremail', 'Enter a valid email address.');
	}
	if(!pass){
		printErrors('.errMsg.errpass', 'Password field cannot be left blank.');
	} else{
		if(pass.length < 5){
			printErrors('.errMsg.errpass', 'Password must be atleast 5 characters long.');
		} else if(pass.match(regexUC) === null || pass.match(regexLC) === null || pass.match(regexNum) === null){
			printErrors('.errMsg.errpass', 'Password must contain alphanumeric with at least 1 uppercase and lowercase letter');
		}	
	}
	if(!rpass){
		printErrors('.errMsg.errrpass', 'Repeat Password field cannot be left blank.');
	} else if(pass != rpass){
		printErrors('.errMsg.errrpass', 'Password and Repeat Password field do not match.');
	}

	if (!err_found) {
		return 1;	// Validation successful
	} else {
		return 0;	// Validation failed
	}
}

function printErrors(ele, msg) {
	$(ele).text(msg).addClass('show');
	err_found = 1;
}

function fetchRecords(){
	$.ajax({
		url: 'public/data.json',
		dataType: 'json',
		success: function(data){
			var str = '<span>User Entered following Details!</span>';
			str +=  '<table>'
				+	'	<tr>'
				+	'		<th>First Name</th>'
				+	'		<th>Last Name</th>'
				+	'		<th>Email</th>'
				+	'		<th>Password</th>'
				+	'	</tr>';
			$.each(data.data, function (i, v) {
				str	+=	'<tr>'
					+	'	<td>' + v.fName + '</td>'
					+	'	<td>' + v.lName + '</td>'
					+	'	<td>' + v.email + '</td>'
					+	'	<td>' + v.pass + '</td>'
					+	'</tr>';
			});
			str += '</table>';
			$('#response').html(str);
		}
	});
}

$(document).ready(function(){
	fetchRecords();
	$('#submitForm').submit(function(e){

		e.preventDefault();
		
		if(validate()){
			$.ajax({
				url: '/form',
				data: {
					fName: $('#fName').val(),
					lName: $('#lName').val(),
					email: $('#email').val(),
					pass: $('#pass').val(),
					rpass: $('#rpass').val()
				},
				dataType: 'json',
				method: 'POST',
				async: false,
				success: function(data){
					console.log(data);
					fetchRecords();
					//$('#submitForm input').val('');
				}
			});
		}
	});
});