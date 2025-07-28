<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "doctor_app");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// ------------------- GET: Tüm bookings listesi -------------------
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "
        SELECT 
            b.id, 
            b.date, 
            b.status, 
            b.schedule_id,
            u.name AS patient_name,
            u.email AS patient_email,
            d.name AS doctor_name,
            s.start_time,
            s.end_time
        FROM bookings b
        JOIN users u ON b.patient_id = u.id
        JOIN doctors d ON b.doctor_id = d.id
        LEFT JOIN schedules s ON b.schedule_id = s.id
        ORDER BY b.id DESC
    ";

    $result = $conn->query($sql);
    $appointments = [];

    while ($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }

    echo json_encode($appointments);
    exit;
}


// ------------------- POST: Yeni booking ekle -------------------
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["patient_id"], $data["doctor_id"], $data["date"], $data["status"], $data["schedule_id"])) {
        echo json_encode(["success" => false, "error" => "Eksik parametreler"]);
        exit;
    }

    $patient_id = intval($data["patient_id"]);
    $doctor_id = intval($data["doctor_id"]);
    $date = $conn->real_escape_string($data["date"]);
    $status = $conn->real_escape_string($data["status"]);
    $schedule_id = intval($data["schedule_id"]);

    // Booking ekle
    $stmt = $conn->prepare("INSERT INTO bookings (patient_id, doctor_id, date, status, schedule_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("iissi", $patient_id, $doctor_id, $date, $status, $schedule_id);

    if ($stmt->execute()) {
        // Schedule durumunu güncelle (booked yap)
        $conn->query("UPDATE schedules SET status = 'booked' WHERE id = $schedule_id");

        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
    exit;
}

// ------------------- DELETE: Booking sil -------------------
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data["id"]);

    // Önce schedule_id'yi al
    $result = $conn->query("SELECT schedule_id FROM bookings WHERE id = $id");
    $schedule_id = null;
    if ($result && $row = $result->fetch_assoc()) {
        $schedule_id = intval($row["schedule_id"]);
    }

    // Booking sil
    $stmt = $conn->prepare("DELETE FROM bookings WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        // Schedule tekrar available yap
        if ($schedule_id) {
            $conn->query("UPDATE schedules SET status = 'available' WHERE id = $schedule_id");
        }

        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
    exit;
}
?>
