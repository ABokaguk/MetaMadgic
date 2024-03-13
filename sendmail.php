<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';



$Email = 'jinny46@naver.com'; // 신청받을 메일주소

$name = isset($_POST['name1']) ? $_POST['name1'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$message = isset($_POST['message']) ? $_POST['message'] : '';

$mail = new PHPMailer(true);
try {
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host = 'smtp.zoho.com';                       // Set the SMTP server to send through
    $mail->SMTPAuth = true;                                   // Enable SMTP authentication
    $mail->Username   = 'jejecomms@zohomail.com';         // SMTP username
    $mail->Password   = '@jeje5575@';   
    // SMTP password
    $mail->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port = 587;

    $mail->setLanguage('ko', './PHPMailer/language/');
    $mail->CharSet = 'UTF-8';
    // 보내는 메일

    $mail->setFrom('jejecomms@zohomail.com');
    $mail->addAddress('jinny46@naver.com');

    $mail->IsHTML(true); 

    $body = '<h1>MetaMagic</h1>';
    $body .= "<p>NAME : $name</p>";
    $body .= "<p>MAIL : $email</p>";
    $body .= "<p>MASSAGE : $message</p>";


    

    $mail->Subject = 'Here is the subject';
    $mail->Body = $body;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();

    $message = 'ok';
} catch (Exception $e) {
    $message = 'Mailer Error: ' . $mail->ErrorInfo;
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
?>