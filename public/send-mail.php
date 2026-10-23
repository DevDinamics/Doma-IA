<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Leer payload JSON
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!$data) {
    // Si viene por form-data convencional
    $data = $_POST;
}

$nombre   = trim($data['nombre'] ?? '');
$email    = trim($data['email'] ?? '');
$empresa  = trim($data['empresa'] ?? '');
$puesto   = trim($data['puesto'] ?? '');
$tamano   = trim($data['tamano'] ?? '');

// Validación de campos requeridos
if (empty($nombre) || empty($email) || empty($empresa) || empty($puesto) || empty($tamano)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

// Validación estricta de correo personal / gratuito
$blockedDomains = [
    'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.es', 'hotmail.com',
    'outlook.com', 'live.com', 'icloud.com', 'proton.me', 'protonmail.com',
    'aol.com', 'zoho.com', 'mail.com'
];

$emailParts = explode('@', $email);
if (count($emailParts) !== 2 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor introduce un correo electrónico válido.']);
    exit;
}

$domain = strtolower($emailParts[1]);
if (in_array($domain, $blockedDomains)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Por favor utiliza una cuenta de correo corporativo institucional.']);
    exit;
}

// correo de destino ////

$to = 'diego.delgado@qualtop.com'; 
$subject = "Nueva Solicitud de Demo: {$empresa} - {$nombre}";

$htmlBody = '
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Nueva Solicitud de Demo DOMA</title>
</head>
<body style="margin: 0; padding: 30px 10px; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #12111c; border-radius: 24px; border: 1px solid rgba(255,255,255,0.12); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
    <!-- Header con resplandor púrpura -->
    <tr>
      <td style="padding: 40px 36px 20px 36px; background: linear-gradient(135deg, rgba(161,0,255,0.2) 0%, rgba(67,124,235,0.1) 100%); text-align: left;">
        <span style="display: inline-block; padding: 6px 14px; background: linear-gradient(90deg, #8a00ff, #437ceb); border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #ffffff;">NUEVO PROSPECTO</span>
        <h1 style="margin: 16px 0 6px 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Solicitud de Demo Recibida</h1>
        <p style="margin: 0; font-size: 14px; color: #a0a0ba;">Un prospecto calificado completó el formulario web de DOMA.</p>
      </td>
    </tr>

    <!-- Datos del Prospecto -->
    <tr>
      <td style="padding: 28px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #82829e; text-transform: uppercase; letter-spacing: 1px;">Nombre Completo</td>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 15px; color: #ffffff; font-weight: 600; text-align: right;">' . htmlspecialchars($nombre) . '</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #82829e; text-transform: uppercase; letter-spacing: 1px;">Email Corporativo</td>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 15px; text-align: right;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #437ceb; text-decoration: none; font-weight: 600;">' . htmlspecialchars($email) . '</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #82829e; text-transform: uppercase; letter-spacing: 1px;">Empresa</td>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 15px; color: #ffffff; font-weight: 600; text-align: right;">' . htmlspecialchars($empresa) . '</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #82829e; text-transform: uppercase; letter-spacing: 1px;">Puesto / Rol</td>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 15px; color: #ffffff; font-weight: 600; text-align: right;">' . htmlspecialchars($puesto) . '</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #82829e; text-transform: uppercase; letter-spacing: 1px;">Tamaño de Empresa</td>
            <td style="padding: 10px 0; font-size: 15px; color: #a100ff; font-weight: 700; text-align: right;">' . htmlspecialchars($tamano) . ' empleados</td>
          </tr>
        </table>

        <!-- Botón de Acción Directo -->
        <div style="margin-top: 32px; text-align: center;">
          <a href="mailto:' . htmlspecialchars($email) . '?subject=Re:%20Demo%20DOMA%20-%20' . urlencode($empresa) . '" style="display: inline-block; padding: 14px 28px; background: linear-gradient(90deg, #a100ff, #437ceb); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 999px; box-shadow: 0 4px 18px rgba(161,0,255,0.4);">
            Responder Directamente al Prospecto
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer del Correo -->
    <tr>
      <td style="padding: 20px 36px 30px 36px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #58586f;">
        DOMA — Digital Sales Executive para el mundo físico.<br>
        Enviado automáticamente desde el sitio oficial.
      </td>
    </tr>
  </table>
</body>
</html>
';

// Cabeceras MIME para HTML
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: DOMA Leads <notificaciones@doma.ai>\r\n";
$headers .= "Reply-To: {$nombre} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($to, $subject, $htmlBody, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Solicitud enviada con éxito.']);
} else {
    // Si la función mail() local no tiene SMTP configurado en el servidor dev, devolvemos error manejable
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'No se pudo enviar el correo en este momento.']);
}