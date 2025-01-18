
<?php session_start(); ?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ezMaturka</title>
    <link rel="stylesheet" href="style/style.css" type="text/css">
</head>
<body>
    <div id="root">
    <div id="background"></div>
    <header>
        <div id="banner">
            <div id="logo"><a href="index.php"><img src="img/logo.png" height="60px"></a></div>
            <div id="category-box">
                <table>
                    <tr id="cell-box">
                        <td class="cell"><a class="category-link" href="login.php">Liczby i zbiory</a></td>
                        <td class="cell"><a class="category-link" href="login.php">Funkcje</a></td>
                        <td class="cell"><a class="category-link" href="login.php">Trygonometria</a></td>
                        <td class="cell"><a class="category-link" href="login.php">Ciągi</a></td>
                        <td class="cell"><a class="category-link" href="login.php">Geometria analityczna</a></td>
                        <td class="cell"><a class="category-link" href="login.php">Planimetria</a></td>
                        <td class="cell"><a class="category-link" href="login.php">Stereometria</a></td>
                        <td class="cell"><a class="category-link" href="login.php">Rachunek prawdopodobieństwa</a></td>
                        <td class="cell"><a class="category-link" href="login.php">Statystyka</a></td>
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

                        
                        <tr>
                            <?php if (isset($_SESSION['user_id'])): ?>
                                
                                <td class="ham-cell" style="display: none;"><a class="link" href="user.php">Moje konto</a></td>
                            <?php else: ?>
                                
                                <td class="ham-cell"><a class="link" href="login.php">Zaloguj się</a></td>
                            <?php endif; ?>
                        </tr>

                    </table>

                            <table id="table">
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Liczby i zbiory</a></td>
                                </tr>
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Funkcje</a></td>
                                </tr>
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Trygonometria</a></td>
                                </tr>
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Ciągi</a></td>
                                </tr>
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Geometria analityczna</a></td>
                                </tr>
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Planimetria</a></td>
                                </tr>
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Stereometria</a></td>
                                </tr>
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Rachunek prawdopodobieństwa</a></td>
                                </tr>
                                <tr>
                                    <td class="ham-cell"><a class="category-link" href="login.php">Statystyka</a></td>
                                </tr>
                                </table>
                    
                    <?php if (isset($_SESSION['user_id'])): ?>
                    <table id="logout-table">
                        <tr>
                            <td class="ham-cell"><a class="logout-link" href="logout.php">Wyloguj</a></td>
                        </tr>
                    </table>
                    <?php endif; ?>

                        </div>
            </nav>
        </div>
    </header>
    <main>
        <div id="main">
            <h1 id="heading">ezMaturka – matma na luzie,<br>matura na plusie!</h1>
        
        <div id="buttons-box">
        
                                
                               
                            


                            <?php if (isset($_SESSION['user_id'])): ?>

                                <a class="link" href="main-exercise.php">
                                    <div id="signup-button"> Losuj zadanie</div>
                                </a>

                            <?php else: ?>

                                <a class="link" href="full-version.html"><div id="signup-button">
                                        Uzyskaj pełny dostęp
                                    </div>
                                </a>
                                    <a id="demo-link" class="link" href="demo-exercise.php">
                                    <div id="demo-button">
                                        Wersja próbna
                                    </div>
                                </a>                            
                            <?php endif; ?>


        </div>

        <article>
            <div id="article-container">
                
                <div class="article-box">
                    <h2 class="text-heading">Co nas wyróżnia?<p class="heading-desc">Nasza platforma wyróżnia się unikalnym podejściem do nauki – zamiast przekonywania się o teorii, oferujemy praktyczne rozwiązywanie rzeczywistych zadań maturalnych. Każde pytanie jest szczegółowo wyjaśnione krok po kroku, co ułatwia zrozumienie trudnych zagadnień. Dodatkowo, nasza interaktywna platforma pozwala na natychmiastowe sprawdzanie odpowiedzi, co zwiększa efektywność nauki i pozwala na szybkie korekty błędów. Dzięki temu uczysz się, robiąc rzeczy, które naprawdę pojawią się na egzaminie.</p></h2>
                    <div id="text-box1"></div>
                </div>

                <div class="article-box">
                    <div id="text-box2"></div>
                    <h2 class="text-heading2">Co zyskasz?<p class="heading-desc">Zyskasz nie tylko dostęp do najnowszych pytań maturalnych z prawdziwych arkuszy, ale także możliwość szczegółowego przyswojenia materiału dzięki odpowiedziom krok po kroku. Nasza platforma umożliwia interaktywne ćwiczenie i natychmiastowe sprawdzanie wyników, co znacząco przyspiesza proces nauki. Z nami zyskasz solidne przygotowanie do matury, zwiększysz swoje szanse na osiągnięcie wysokich wyników i zdobędziesz pewność siebie w rozwiązywaniu egzaminacyjnych zadań.</p></h2>
                    
                </div>

                <div class="article-box">
                    <h2 class="text-heading">Dlaczego warto?<p class="heading-desc">W przeciwieństwie do tradycyjnych kursów, u nas uczysz się przez praktykę – rozwiązując rzeczywiste zadania maturalne bez zbędnej teorii. Dzięki temu skupiasz się na tym, co naprawdę ważne, czyli na skutecznym przygotowaniu do egzaminu. Nasze szczegółowe rozwiązania prowadzą Cię przez każdy krok, pomagając opanować materiał i osiągnąć najlepsze wyniki na maturze.</p></h2>
                    <div id="text-box3"></div>
                </div>


           </div>
        </article>
    </div>
    </main>
    <footer>
        <div id="footer">
            <p id="footer-desc" >&copy; 2025 ezMaturka. Wszystkie prawa zastrzeżone.</p>
        </div>
    </footer>

    <script src="script.js"></script>
    </div>
</body>
</html>
