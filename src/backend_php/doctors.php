<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "doctor_app");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

// Ekleme ve Silme işlemleri (POST)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    // Silme işlemi
    if (isset($data["action"]) && $data["action"] === "delete" && isset($data["id"])) {
        $id = intval($data["id"]);
        $stmt = $conn->prepare("DELETE FROM doctors WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Delete failed"]);
        }
        exit;
    }

    // Ekleme işlemi
    if (isset($data["name"], $data["email"], $data["specialties"])) {
        $name = $data["name"];
        $email = $data["email"];
        $specialties = $data["specialties"];

        $stmt = $conn->prepare("INSERT INTO doctors (name, email, specialties) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $specialties);

        if ($stmt->execute()) {
            // En son eklenen doktoru geri gönder (React’te doğrudan ekleyebilmen için)
            $doctorId = $stmt->insert_id;
            $result = $conn->query("SELECT * FROM doctors WHERE id = $doctorId");
            $doctor = $result->fetch_assoc();
            echo json_encode(["message" => "Doctor added successfully", "doctor" => $doctor]);
        } else {
            echo json_encode(["error" => "Insert failed"]);
        }
        exit;
    }

    echo json_encode(["error" => "Invalid POST data"]);
    exit;
}

// Listeleme işlemi (GET)
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $result = $conn->query("SELECT * FROM doctors ORDER BY id DESC");
    $doctors = [];

    while ($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }

    echo json_encode($doctors);
}
?>
