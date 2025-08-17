<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "doctor_app");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // JSON'dan veri al
    $data = json_decode(file_get_contents("php://input"), true);

    // Eğer JSON boşsa, $_POST'u kullan
    if (!$data) {
        $data = $_POST;
    }

    if (isset($data['name'], $data['email'], $data['number'], $data['address'], $data['date_of_birth'], $data['password'])) {

        $name = $data['name'];
        $email = $data['email'];
        $number = $data['number'];
        $address = $data['address'];
        $date_of_birth = $data['date_of_birth'];
        $password = $data['password'];
        $role = $data['role']; // Varsayılan

        $password = $password;

        $sql = "INSERT INTO users (name, email, number, address, date_of_birth, password, role) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssss", $name, $email, $number, $address, $date_of_birth, $password, $role);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Kayıt başarılı"]);
        } else {
            echo json_encode(["success" => false, "error" => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Eksik veri gönderildi"]);
    }
}

$conn->close();
?>
