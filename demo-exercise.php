<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
include("config.php");

$id = isset($_POST['id']) ? intval($_POST['id']) : 1;


$sql = "SELECT arkusz, link, dzial, png FROM exercise WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);


$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ezMaturka</title>
    <link rel="stylesheet" href="style/style.css" type="text/css">
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <script src="https://kit.fontawesome.com/0bb67eac8a.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="buttons_main.js" defer></script>
    <script src="canvas.js" defer></script>
    <script src="script.js" defer></script>
</head>
<body>
    <div id="background"></div>
    <header>
        <div id="banner">
            <div id="logo"><a href="index.php"><img src="img/logo.png" height="60px"></a></div>
            <div id="category-box">
                <table>
                    <tr id="cell-box">
                        <td class="cell" data-dzial="Liczby i zbiory" id="dzial-1">Liczby i zbiory</td>
                        <td class="cell" data-dzial="Funkcje" id="dzial-2">Funkcje</td>
                        <td class="cell" data-dzial="Trygonometria" id="dzial-3">Trygonometria</td>
                        <td class="cell" data-dzial="Ciągi" id="dzial-4">Ciągi</td>
                        <td class="cell" data-dzial="Geometria analityczna" id="dzial-5">Geometria analityczna</td>
                        <td class="cell" data-dzial="Planimetria" id="dzial-6">Planimetria</td>
                        <td class="cell" data-dzial="Stereometria" id="dzial-7">Stereometria</td>
                        <td class="cell" data-dzial="Rachunek prawdopodobieństwa" id="dzial-8">Rachunek prawdopodobieństwa</td>
                        <td class="cell" data-dzial="Statystyka" id="dzial-9">Statystyka</td>
                    </tr>
                </table>
            </div>
            <div id="user-box"></div>
            <nav>
                <div class="hamburger" onclick="toggleMenu()">
                    <svg class="ct-icon" width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" data-type="type-1">
                        <rect y="0.00" width="18" height="1.7" rx="1"></rect>
                        <rect y="6.15" width="18" height="1.7" rx="1"></rect>
                        <rect y="12.3" width="18" height="1.7" rx="1"></rect>
                    </svg>
                </div>
                <div id="nav-links" class="nav-links">
                    <table>
                        <tr>
                            <td class="ham-cell"><a class="link" href="index.php">Strona główna</a></td>
                        </tr>
                        
                    </table>
                    <table id="table">
                        <tr><td class="ham-cell" data-dzial="Liczby i zbiory">Liczby i zbiory</td></tr>
                        <tr><td class="ham-cell" data-dzial="Funkcje">Funkcje</td></tr>
                        <tr><td class="ham-cell" data-dzial="Trygonometria">Trygonometria</td></tr>
                        <tr><td class="ham-cell" data-dzial="Ciągi">Ciągi</td></tr>
                        <tr><td class="ham-cell" data-dzial="Geometria analityczna">Geometria analityczna</td></tr>
                        <tr><td class="ham-cell" data-dzial="Planimetria">Planimetria</td></tr>
                        <tr><td class="ham-cell" data-dzial="Stereometria">Stereometria</td></tr>
                        <tr><td class="ham-cell" data-dzial="Rachunek prawdopodobieństwa">Rachunek prawdopodobieństwa</td></tr>
                        <tr><td class="ham-cell" data-dzial="Statystyka">Statystyka</td></tr>
                    </table>
                    <table id="logout-table">

                                <tr>
                                    <td class="ham-cell"><a class="logout-link" href="logout.php">Wyloguj</a></td>
                                </tr>
                               
                            </table>
                </div>
            </nav>
        </div>
    </header>
    <main>
        <div id="main">
        <?php
            if ($row = $result->fetch_assoc()) {
                echo "<p id='arkusz-heading'>" . htmlspecialchars($row['arkusz']) . "</p>";
                echo "<div id='link-box'><a id='arkusz-link' target='_blank' href='" . htmlspecialchars($row['link']) . "'>Wyświetl cały arkusz</a></div>";
                echo "<div id='left'><table><tr><td class='dzial'>Dział: " . htmlspecialchars($row['dzial']) . "</td></tr></table>";
                echo "<img id='zadanie-img' src='zadania maturalne/" . htmlspecialchars($row['arkusz']) . "/" . htmlspecialchars($row['png']) . "' alt='Image' width='100%'>";
            } else {
                echo "Brak danych dla wybranego id.";
            }
        ?>
            <div id="content"></div>
            <div id="buttons">
                <div class="button" id="answer">Odpowiedź</div>
                <div class="button" id="step-by-step">Podpowiedź</div>
                <div class="button" id="solution">Rozwiązanie</div>
                <div id="prev-next-box">
                    <div class="button" id="prev">Poprzednie</div>
                    <div class="button" id="next">Następne</div>
                </div>
            </div>
            <div id="result"></div>
        </div>
        <div id="right">
            <div id="drawing-box">
                <div id="toolbar">
                    <i id="clear" class="fa-regular fa-trash-can"></i>
                    <i id="pen" class="fa-solid fa-pen"></i>
                    <div class="slider-container">
                        <input type="range" id="pen-width" class="slider" min="1" max="20" value="2">
                        <span id="pen-width-value">2</span>
                    </div>
                    <i id="gumka" class="fa-solid fa-eraser"></i>
                    <div class="slider-container">
                        <input type="range" id="eraser-width" class="slider" min="5" max="50" value="20">
                        <span id="eraser-width-value">20</span>
                    </div>
                    <i id="undo" class="fa-solid fa-rotate-left"></i>
                    <i id="redo" class="fa-solid fa-arrow-rotate-right"></i>
                    <div class="color-picker-container">
                        <input type="color" id="pen-color" class="color-picker" value="#000000">
                    </div>
                </div>
                <div class="canvas-container">
                    <canvas id="backgroundCanvas"></canvas>
                    <canvas id="drawingCanvas"></canvas>
                </div>
            </div>
        </div>
    </main>
    <footer>
        <div id="footer">

        <p id="footer-desc" >&copy; 2025 ezMaturka. Wszystkie prawa zastrzeżone.</p>
        </div>
    </footer>
    <?php
    $stmt->close();
    $conn->close();
    ?>
</body>
</html>
