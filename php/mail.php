<?php
$method = $_SERVER['REQUEST_METHOD'];


$project_name = trim("MyCis");
$admin_email  = trim("mail@mail.com");
$form_subject = trim("Заявка");
$from_mail = trim("mail@mycis.ru"); #check comm

//Script Foreach
$c = true;
if ( $method === 'POST' ) {
	foreach ( $_POST as $key => $value ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
				<td style='padding: 10px; width: auto;'><b>$key:</b></td>
				<td style='padding: 10px;width: 100%;'>$value</td>
			</tr>
			";	
	}
} else if ( $method === 'GET' ) {
	foreach ( $_GET as $key => $value ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
				<td style='padding: 10px; width: auto;'><b>$key:</b></td>
				<td style='padding: 10px;width: 100%;'>$value</td>
			</tr>
			";
	}
}

$message = "<table style='width: 50%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$from_mail.'>' . PHP_EOL .
'Reply-To: '.$from_mail.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );
?>