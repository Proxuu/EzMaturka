let isRequestInProgress = false;
let currentLineIndex = 0;
let currentId = 1;
let clearResultOnRequest = true;

function sendQuery(queryParam, lineIndex = 0) {
    if (!queryParam || isRequestInProgress) return;

    isRequestInProgress = true;
    disableButtons(true);
    if (clearResultOnRequest) $('#result').html('');

    $.ajax({
        url: 'execute_query.php',
        type: 'POST',
        data: { queryParam, lineIndex, id: currentId },
        success: function(response) {
            displayResult(response, queryParam);
        },
        error: function() {
            $('#result').html('An error occurred while processing results.');
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
                resultDiv.html(' Odblokuj pełną wersję, aby uzyskać dostęp do wszystkich zadań.');
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
            resultDiv.html('Odblokuj pełną wersję, aby uzyskać dostęp do wszystkich zadań.');
            $('#answer, #step-by-step, #solution').hide();
        }
    } catch {
        resultDiv.html('An error occurred while processing results.');
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
    $('#result').html('<div id="sub-box"><b>Odblokuj pełną wersję, aby uzyskać dostęp do wszystkich zadań oraz pełnej funkcjonalności.</b><p><a style="text-decoration: none; color: white;" href="full-version.html"><div id="subscription-button" class="button">Odblokuj pełną wersję<div></p></a></div>');
}

$(document).ready(function() {
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
        if (currentId > 1) {
            currentId--;
            updateContent();
        }
    });

    $('#next').on('click', function() {
        if (currentId < 3) {
            currentId++;
            updateContent();
        } else {
            displayLockedMessage();
        }
    });
});
