<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
$host = "localhost";
$user = "root";
$pass = "";
$db = "doctor_app";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    $sql = "SELECT schedules.*, doctors.name as doctor_name 
            FROM schedules 
            JOIN doctors ON schedules.doctor_id = doctors.id
            ORDER BY schedules.id DESC"; // status filtresini kaldırdık
    $result = $conn->query($sql);
    $schedules = [];
    while ($row = $result->fetch_assoc()) {
        $schedules[] = $row;
    }
    echo json_encode($schedules);
}


if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data["action"]) && $data["action"] === "delete") {
        $id = $data["id"];
        $sql = "DELETE FROM schedules WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
    } else {
        $doctor_id = $data["doctor_id"];
        $date = $data["date"];
        $start_time = $data["start_time"];
        $end_time = $data["end_time"];

        $sql = "INSERT INTO schedules (doctor_id, date, start_time, end_time) 
                VALUES ('$doctor_id', '$date', '$start_time', '$end_time')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
    }
}

$conn->close();
?>
