<?php
header('Content-Type: application/json');

// Test 1: Check if mail() function exists
if (!function_exists('mail')) {
    echo json_encode(['error' => 'mail() function not available']);
    exit;
}

// Test 2: Try to send a simple test email
$to = 'info@milestonebd.com';
$subject = 'Email Test from Server';
$message = 'This is a test email to check if email is working.';
$headers = 'From: noreply@milestonebd.com' . "\r\n";

$result = mail($to, $subject, $message, $headers);

if ($result) {
    echo json_encode([
        'success' => true,
        'message' => 'Test email sent successfully',
        'note' => 'Check your email inbox and spam folder'
    ]);
} else {
    echo json_encode([
        'error' => 'Failed to send test email',
        'suggestion' => 'Check MX records and email routing in cPanel'
    ]);
}
?> 