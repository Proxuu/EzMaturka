

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "matura";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$queryParam = isset($_POST['queryParam']) ? $_POST['queryParam'] : '';
$lineIndex = isset($_POST['lineIndex']) ? intval($_POST['lineIndex']) : 0;
$id = isset($_POST['id']) ? intval($_POST['id']) : 1;

if (empty($queryParam)) {
    echo json_encode(array('error' => 'Brak parametru zapytania.'));
    exit;
}

$sql = "";
$params = [];
$types = '';

switch ($queryParam) {
    case 'answer':
        $sql = "SELECT answer FROM exercise WHERE id=?";
        $params = [$id];
        $types = 'i';
        break;
    case 'step-by-step':
        $sql = "SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(full_answer, '\n', ? + 1), '\n', -1) AS answer FROM exercise WHERE id=?";
        $params = [$lineIndex, $id];
        $types = 'ii';
        break;
    case 'solution':
        $sql = "SELECT full_answer AS answer FROM exercise WHERE id=?";
        $params = [$id];
        $types = 'i';
        break;
    case 'exercise_data':
        $sql = "SELECT arkusz, link, dzial, png FROM exercise WHERE id=?";
        $params = [$id];
        $types = 'i';
        break;
    default:
        echo json_encode(array('error' => 'Nieprawidłowy parametr zapytania.'));
        exit;
}


$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(array('error' => 'Błąd w zapytaniu SQL: ' . $conn->error));
    exit;
}


if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}


$stmt->execute();
$result = $stmt->get_result();

if ($result) {
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode(array('error' => 'Brak wyników.'));
    }
} else {
    echo json_encode(array('error' => 'Błąd w zapytaniu SQL: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>
