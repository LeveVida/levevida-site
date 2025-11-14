<?php
/**
 * Sistema de Entrega Segura do E-book ROTA DAS MILHAS
 * 
 * Este script gera links únicos e temporários para download do e-book
 * Cada link é válido por 30 dias e permite até 3 downloads
 * 
 * @author Leve Vida
 * @version 1.0
 */

// Configurações
define('EBOOK_PATH', __DIR__ . '/files/ROTA-DAS-MILHAS.pdf');
define('DB_FILE', __DIR__ . '/data/downloads.json');
define('LINK_EXPIRATION_DAYS', 30);
define('MAX_DOWNLOADS', 3);

// Headers de segurança
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

/**
 * Gera um token único seguro
 */
function generateToken() {
    return bin2hex(random_bytes(32));
}

/**
 * Cria um novo link de download
 */
function createDownloadLink($email, $transaction_id) {
    $token = generateToken();
    $created_at = time();
    $expires_at = $created_at + (LINK_EXPIRATION_DAYS * 24 * 60 * 60);
    
    $download_data = [
        'token' => $token,
        'email' => $email,
        'transaction_id' => $transaction_id,
        'created_at' => $created_at,
        'expires_at' => $expires_at,
        'download_count' => 0,
        'max_downloads' => MAX_DOWNLOADS,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    
    // Salva no banco de dados
    saveDownloadData($token, $download_data);
    
    // Retorna a URL completa
    $base_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") 
                . "://" . $_SERVER['HTTP_HOST'];
    return $base_url . "/download.php?token=" . $token;
}

/**
 * Salva dados do download
 */
function saveDownloadData($token, $data) {
    $db = loadDatabase();
    $db[$token] = $data;
    file_put_contents(DB_FILE, json_encode($db, JSON_PRETTY_PRINT));
}

/**
 * Carrega banco de dados
 */
function loadDatabase() {
    if (!file_exists(DB_FILE)) {
        // Cria diretório se não existir
        $dir = dirname(DB_FILE);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        file_put_contents(DB_FILE, '{}');
        return [];
    }
    return json_decode(file_get_contents(DB_FILE), true) ?? [];
}

/**
 * Valida um token de download
 */
function validateToken($token) {
    $db = loadDatabase();
    
    if (!isset($db[$token])) {
        return ['valid' => false, 'error' => 'Link inválido'];
    }
    
    $data = $db[$token];
    
    // Verifica expiração
    if (time() > $data['expires_at']) {
        return ['valid' => false, 'error' => 'Link expirado'];
    }
    
    // Verifica limite de downloads
    if ($data['download_count'] >= $data['max_downloads']) {
        return ['valid' => false, 'error' => 'Limite de downloads atingido'];
    }
    
    return ['valid' => true, 'data' => $data];
}

/**
 * Processa download do e-book
 */
function processDownload($token) {
    $validation = validateToken($token);
    
    if (!$validation['valid']) {
        http_response_code(403);
        echo json_encode(['error' => $validation['error']]);
        exit;
    }
    
    $data = $validation['data'];
    
    // Verifica se arquivo existe
    if (!file_exists(EBOOK_PATH)) {
        http_response_code(500);
        echo json_encode(['error' => 'Arquivo não encontrado']);
        exit;
    }
    
    // Incrementa contador
    $db = loadDatabase();
    $db[$token]['download_count']++;
    $db[$token]['last_download'] = time();
    $db[$token]['last_ip'] = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    file_put_contents(DB_FILE, json_encode($db, JSON_PRETTY_PRINT));
    
    // Log do download
    logDownload($token, $data['email']);
    
    // Envia arquivo
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="ROTA-DAS-MILHAS-Leve-Vida.pdf"');
    header('Content-Length: ' . filesize(EBOOK_PATH));
    header('Cache-Control: private, max-age=0, must-revalidate');
    header('Pragma: public');
    
    readfile(EBOOK_PATH);
    exit;
}

/**
 * Registra log de download
 */
function logDownload($token, $email) {
    $log_file = __DIR__ . '/logs/downloads.log';
    $log_dir = dirname($log_file);
    
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    $log_entry = sprintf(
        "[%s] Download - Token: %s | Email: %s | IP: %s\n",
        date('Y-m-d H:i:s'),
        substr($token, 0, 10) . '...',
        $email,
        $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    );
    
    file_put_contents($log_file, $log_entry, FILE_APPEND);
}

/**
 * Limpa links expirados (executar via CRON)
 */
function cleanExpiredLinks() {
    $db = loadDatabase();
    $current_time = time();
    $cleaned = 0;
    
    foreach ($db as $token => $data) {
        if ($current_time > $data['expires_at']) {
            unset($db[$token]);
            $cleaned++;
        }
    }
    
    if ($cleaned > 0) {
        file_put_contents(DB_FILE, json_encode($db, JSON_PRETTY_PRINT));
    }
    
    return $cleaned;
}

// ============================================
// PROCESSAMENTO DE REQUISIÇÕES
// ============================================

$action = $_GET['action'] ?? 'download';

switch ($action) {
    case 'create':
        // Criar novo link (chamado via webhook)
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            exit;
        }
        
        $email = $_POST['email'] ?? '';
        $transaction_id = $_POST['transaction_id'] ?? '';
        
        if (empty($email) || empty($transaction_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Email e transaction_id são obrigatórios']);
            exit;
        }
        
        $download_link = createDownloadLink($email, $transaction_id);
        
        echo json_encode([
            'success' => true,
            'download_link' => $download_link,
            'expires_in_days' => LINK_EXPIRATION_DAYS
        ]);
        break;
    
    case 'download':
        // Processar download
        $token = $_GET['token'] ?? '';
        
        if (empty($token)) {
            http_response_code(400);
            echo json_encode(['error' => 'Token não fornecido']);
            exit;
        }
        
        processDownload($token);
        break;
    
    case 'cleanup':
        // Limpar links expirados (executar via CRON)
        $cleaned = cleanExpiredLinks();
        echo json_encode([
            'success' => true,
            'cleaned_links' => $cleaned
        ]);
        break;
    
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Ação inválida']);
}
?>
