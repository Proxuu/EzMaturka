let isRequestInProgress = false;
let currentLineIndex = 0;
let currentId = 1;
let currentDzial = ''; 
let clearResultOnRequest = true;
let historyStack = [];
let currentIndexInHistory = -1;

function sendQuery(queryParam, lineIndex = 0) {
    if (!queryParam || isRequestInProgress) return;

    isRequestInProgress = true;
    disableButtons(true);
    if (clearResultOnRequest) $('#result').html('');

    $.ajax({
        url: 'execute_query_main.php',
        type: 'POST',
        data: { queryParam, lineIndex, id: currentId, dzial: currentDzial },
        success: function(response) {
            displayResult(response, queryParam);
        },
        error: function() {
            $('#result').html('Wystąpił błąd podczas przetwarzania wyników.');
        },
        complete: function() {
            isRequestInProgress = false;
            disableButtons(false);
        }
    });
}

function formatResult(item, queryParam) {
    let displayText = '';
    if (queryParam === 'answer') {
        displayText = `<b>Odpowiedź: ${item.answer}</b>`;
    } else if (queryParam === 'step-by-step') {
        displayText = (currentLineIndex === 0 ? 'Podpowiedź:<br>' : '') + `${item.answer}`;
    } else if (queryParam === 'solution') {
        displayText = `${item.answer}`;
    }
    return displayText;
}

function displayResult(data, queryParam) {
    const resultDiv = $('#result');

    try {
        const results = JSON.parse(data);

        if (queryParam === 'exercise_data') {
            if (Array.isArray(results) && results.length > 0) {
                updateMainContent(results);
            } else {
                resultDiv.html('Brak danych do wyświetlenia.');
                $('#answer, #step-by-step, #solution').hide();
            }
            return;
        }

        if (Array.isArray(results) && results.length > 0) {
            const formattedResult = formatResult(results[0], queryParam).trim();

            if (formattedResult.length > 0) {
                $('#nextLine').remove();

                if (queryParam === 'step-by-step') {
                    if (currentLineIndex === 0) resultDiv.html('');
                    resultDiv.append('<div id="line' + currentLineIndex + '">' + formattedResult + '</div>');
                    resultDiv.append('<br><button id="nextLine" class="button" onclick="handleNextLineClick()">Dalej</button>');
                    typeWriter($('#line' + currentLineIndex), formattedResult, 0, 10);
                } else {
                    resultDiv.html('<div id="line' + currentLineIndex + '">' + formattedResult + '</div>');
                    typeWriter($('#line' + currentLineIndex), formattedResult, 0, 10);
                    $('#nextLine').remove();
                }
            }
        } else {
            resultDiv.html('Brak danych do wyświetlenia.');
            $('#answer, #step-by-step, #solution').hide();
        }
    } catch {
        resultDiv.html('Wystąpił błąd podczas przetwarzania wyników.');
    }
}

function updateMainContent(data) {
    if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        if (item.arkusz) {
            $('#arkusz-heading').text(item.arkusz);
            $('#arkusz-link').attr('href', item.link).text('Wyświetl cały arkusz');
            $('.dzial').text('Dział: ' + item.dzial);
            $('#selected-dzial').text('Dział: ' + item.dzial);
            $('#zadanie-img').attr('src', 'zadania maturalne/' + item.arkusz + '/' + item.png).show();
        }
        $('#answer, #step-by-step, #solution').show();
    } else {
        $('#arkusz-heading, #arkusz-link').text('');
        $('.dzial').text('Dział: Brak danych');
        $('#zadanie-img').attr('src', '').hide();
        $('#answer, #step-by-step, #solution').show();
    }
}


function typeWriter(element, text, i = 0, renderInterval = 10) {
    if (i < text.length) {
        element.html(text.substring(0, i + 1));
        if (window.MathJax) MathJax.typesetPromise([element[0]]);
        setTimeout(() => typeWriter(element, text, i + 1, renderInterval), renderInterval);
    }
}

function disableButtons(disable) {
    $('.button').toggleClass('disabled', disable);
    $('.button').css('pointer-events', disable ? 'none' : 'auto');
}

function handleNextLineClick() {
    currentLineIndex++;
    clearResultOnRequest = false;
    sendQuery('step-by-step', currentLineIndex);
    clearResultOnRequest = true;
}

function updateContent() {
    sendQuery('exercise_data');
}

function displayLockedMessage() {
    $('#result').html('<div id="sub-box"><b>Odblokuj pełną wersję, aby uzyskać dostęp do wszystkich zadań oraz pełnej funkcjonalności.</b><p><div id="subscription-button" class="button">Odblokuj pełną wersję<div></p></div>');
}

function handleDzialClick(selectedDzial, element) {
    if (currentDzial === selectedDzial) {
        $(element).css({
            'color': '',
            'border-bottom': ''
        });
        currentDzial = ''; 
        historyStack = []; 
        currentIndexInHistory = -1; 
        currentId = 1; 

        
        $.ajax({
            url: 'execute_query_main.php',
            type: 'POST',
            data: { queryParam: 'random_id' },
            success: function(response) {
                const result = JSON.parse(response);
                if (result.length > 0 && result[0].id) {
                    currentId = result[0].id;
                    historyStack = [currentId];
                    currentIndexInHistory = 0;
                    updateContent();
                } else {
                    $('#result').html('Brak dostępnych zadań.');
                }
            },
            error: function() {
                $('#result').html('Wystąpił błąd podczas pobierania losowego zadania.');
            }
        });
    } else {
        
        $('.cell, .ham-cell').css({
            'color': '',
            'border-bottom': '',
            'background-color': ''
        });

        
        $(`.cell[data-dzial="${selectedDzial}"], .ham-cell[data-dzial="${selectedDzial}"]`).css({
            'color': 'red',
            'border-bottom': '5px solid red',
            'background-color': 'rgb(250, 250, 250)'
        });

        currentDzial = selectedDzial;
        historyStack = [];
        currentIndexInHistory = -1;
        currentId = 1;

        
        $.ajax({
            url: 'execute_query_main.php',
            type: 'POST',
            data: { queryParam: 'random_id', dzial: currentDzial },
            success: function(response) {
                const result = JSON.parse(response);
                if (result.length > 0 && result[0].id) {
                    currentId = result[0].id;
                    historyStack = [currentId];
                    currentIndexInHistory = 0;
                    updateContent();
                } else {
                    $('#result').html('Brak dostępnych zadań.');
                }
            },
            error: function() {
                $('#result').html('Wystąpił błąd podczas pobierania losowego zadania.');
            }
        });
    }
}

$(document).ready(function() {
    $('.cell, .ham-cell').on('click', function() {
        const selectedDzial = $(this).data('dzial');
        handleDzialClick(selectedDzial, this);
    });

    $('#answer').on('click', function() {
        sendQuery('answer');
    });

    $('#step-by-step').on('click', function() {
        currentLineIndex = 0;
        sendQuery('step-by-step', currentLineIndex);
    });

    $('#solution').on('click', function() {
        sendQuery('solution');
    });

    $('#prev').on('click', function() {
        if (currentIndexInHistory > 0) {
            currentIndexInHistory--;
            currentId = historyStack[currentIndexInHistory];
            updateContent();
        }
    });

    $('#next').on('click', function() {
        if (currentIndexInHistory < historyStack.length - 1) {
            currentIndexInHistory++;
            currentId = historyStack[currentIndexInHistory];
            updateContent();
        } else {
            $.ajax({
                url: 'execute_query_main.php',
                type: 'POST',
                data: { queryParam: 'random_id', dzial: currentDzial },
                success: function(response) {
                    const result = JSON.parse(response);
                    if (result.length > 0 && result[0].id) {
                        currentId = result[0].id;
                        historyStack.push(currentId);
                        currentIndexInHistory = historyStack.length - 1;
                        updateContent();
                    } else {
                        $('#result').html('Brak dostępnych zadań.');
                    }
                },
                error: function() {
                    $('#result').html('Wystąpił błąd podczas pobierania losowego zadania.');
                }
            });
        }
    });
});
