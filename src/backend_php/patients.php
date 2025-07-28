<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "doctor_app");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

// Hasta ekleme ve silme
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    // Silme işlemi
    if (isset($data["action"]) && $data["action"] === "delete" && isset($data["id"])) {
        $id = intval($data["id"]);
        $stmt = $conn->prepare("DELETE FROM patients WHERE id = ?");
        $stmt->bind_param("i", $id);
        $success = $stmt->execute();
        echo json_encode(["success" => $success]);
        exit;
    }

    // Ekleme işlemi
    $name = $data["name"];
    $email = $data["email"];

    // users tablosuna ekle (role patient)
    $stmtUser = $conn->prepare("INSERT INTO users (name, email, role) VALUES (?, ?, 'patient')");
    $stmtUser->bind_param("ss", $name, $email);
    $stmtUser->execute();
    $user_id = $stmtUser->insert_id;

    // patients tablosuna user_id ekle
    $stmtPatient = $conn->prepare("INSERT INTO patients (user_id) VALUES (?)");
    $stmtPatient->bind_param("i", $user_id);
    $stmtPatient->execute();

    echo json_encode(["success" => true]);
    exit;
}

// Hasta listeleme
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT 
                patients.id AS patient_id, 
                users.id AS user_id, 
                users.name, 
                users.email
            FROM patients 
            JOIN users ON patients.user_id = users.id 
            ORDER BY patients.id DESC";

    $result = $conn->query($sql);
    $patients = [];

    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }

    echo json_encode($patients);
}
?>
