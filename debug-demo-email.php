<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start logging
$logFile = 'email_debug.log';
$logMessage = date('Y-m-d H:i:s') . " - Script started\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Log request method
$logMessage = date('Y-m-d H:i:s') . " - Request method: " . $_SERVER['REQUEST_METHOD'] . "\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $logMessage = date('Y-m-d H:i:s') . " - Method not allowed\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Log input data
$logMessage = date('Y-m-d H:i:s') . " - Input data: " . json_encode($input) . "\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);

// Validate required fields
if (!isset($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $logMessage = date('Y-m-d H:i:s') . " - Invalid email: " . (isset($input['email']) ? $input['email'] : 'not set') . "\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    
    http_response_code(400);
    echo json_encode(['error' => 'Valid email is required']);
    exit;
}

$userEmail = $input['email'];
$userName = isset($input['name']) ? $input['name'] : 'Demo User';

// Log email details
$logMessage = date('Y-m-d H:i:s') . " - Sending to: $userEmail, Name: $userName\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);

// Email content
$subject = "Your Excel Project Monitor Demo - Download Link";
$demoLink = "https://milestonebd.com/demo/PMC_Tools_Demo.zip";

$message = "
Hello {$userName}!

Thank you for requesting our Excel Project Monitor demo!

You can download the demo file from this link:
{$demoLink}

This demo includes:
• Sample project tracking templates
• Dashboard examples
• User guide and instructions

If you have any questions or need help setting up the demo, feel free to reply to this email.

Best regards,
Milestone BD Team
";

// Email headers for better delivery
$headers = array(
    'From: Milestone BD <noreply@milestonebd.com>',
    'Reply-To: info@milestonebd.com',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0'
);

$headersString = implode("\r\n", $headers);

// Log email details
$logMessage = date('Y-m-d H:i:s') . " - Subject: $subject\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);
$logMessage = date('Y-m-d H:i:s') . " - Headers: $headersString\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);

// Send email to user
$userEmailSent = mail($userEmail, $subject, $message, $headersString);

// Log result
$logMessage = date('Y-m-d H:i:s') . " - User email sent: " . ($userEmailSent ? 'SUCCESS' : 'FAILED') . "\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);

// Send notification to you
$notificationSubject = "New Demo Download Request";
$notificationMessage = "
New demo download request received:

User Email: {$userEmail}
User Name: {$userName}
Time: " . date('Y-m-d H:i:s') . "

Demo file link: {$demoLink}
";

$notificationHeaders = array(
    'From: Milestone BD <noreply@milestonebd.com>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0'
);

$notificationHeadersString = implode("\r\n", $notificationHeaders);

$notificationSent = mail('info@milestonebd.com', $notificationSubject, $notificationMessage, $notificationHeadersString);

// Log notification result
$logMessage = date('Y-m-d H:i:s') . " - Notification sent: " . ($notificationSent ? 'SUCCESS' : 'FAILED') . "\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);

// Return response
if ($userEmailSent && $notificationSent) {
    $logMessage = date('Y-m-d H:i:s') . " - Both emails sent successfully\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    
    echo json_encode([
        'success' => true,
        'message' => 'Demo link sent successfully!'
    ]);
} else {
    $logMessage = date('Y-m-d H:i:s') . " - Email sending failed. User: " . ($userEmailSent ? 'yes' : 'no') . ", Notification: " . ($notificationSent ? 'yes' : 'no') . "\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send email. Please try again.',
        'debug' => [
            'user_email_sent' => $userEmailSent,
            'notification_sent' => $notificationSent
        ]
    ]);
}

$logMessage = date('Y-m-d H:i:s') . " - Script finished\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);
?> 