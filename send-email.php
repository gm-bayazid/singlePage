<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

// Accept only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get user input
$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Valid email is required']);
    exit;
}

$userEmail = $input['email'];
$userName = isset($input['name']) ? htmlspecialchars($input['name']) : 'Demo User';
$demoLink = "https://milestonebd.com/demo/PMC_Tools_Demo.zip";

// SMTP settings
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'mail.milestonebd.com'; // or smtp.hostinger.com
    $mail->SMTPAuth = true;
    $mail->Username = 'info@milestonebd.com'; // Your domain email
    $mail->Password = 'Information247'; // Set this
    $mail->SMTPSecure = 'ssl'; // or 'ssl'
    $mail->Port = 465; // or 465 for ssl

    // Sender and receiver
    $mail->setFrom('info@milestonebd.com', 'milestoneBD Team');
    $mail->addAddress($userEmail, $userName);

    // Email content
    $mail->isHTML(false); // Plain text
    $mail->Subject = 'Your Excel Project Monitor Demo - Download Link';
    $mail->Body = "
Hello {$userName}!

Thank you for requesting our Excel Project Monitor demo!

You can download the demo file from this link:
{$demoLink}

Best regards,
milestoneBD Team
";

    $mail->send();
// === Send notification to admin ===
    $adminMail = new PHPMailer(true);
    $adminMail->isSMTP();
    $adminMail->Host = 'mail.milestonebd.com';
    $adminMail->SMTPAuth = true;
    $adminMail->Username = 'info@milestonebd.com';
    $adminMail->Password = 'Information247';
    $adminMail->SMTPSecure = 'ssl';
    $adminMail->Port = 465;

    $adminMail->setFrom('info@milestonebd.com', 'milestoneBD Notification');
    $adminMail->addAddress('gm_bayazid@hotmail.com', 'Admin');

    $adminMail->isHTML(false);
    $adminMail->Subject = 'New Demo Download Request Received';
    $adminMail->Body = "
New demo request received:

User Name: {$userName}
User Email: {$userEmail}
Time: " . date('Y-m-d H:i:s') . "

Demo Link: {$demoLink}
";

    $adminMail->send();  // Sends to admin

    // Success response to frontend
    echo json_encode(['success' => true, 'message' => 'Demo link sent successfully!']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send email',
        'details' => $mail->ErrorInfo
    ]);
}
