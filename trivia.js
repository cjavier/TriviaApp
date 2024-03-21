document.addEventListener('DOMContentLoaded', function() {
    const categories = [
        {"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}
];

    const categorySelect = document.getElementById('category');
    categories.forEach(function(category) {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
});

function iniciarTrivia() {
    var dificultad = $('#dificultad').val() || "";
    var tipo = $('#tipo').val() || ""; 
    var categoria = $('#categoria').val() || ""; 
    var url = `https://opentdb.com/api.php?amount=10&category=${categoria}&difficulty=${dificultad}&type=${tipo}`;
    console.log(url); 
    localStorage.setItem('triviaURL', url);
    window.location.href = 'trivia.html';
}
function reiniciarTrivia() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    var url = localStorage.getItem('triviaURL');
    let score = 0; 

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const triviaContainer = document.getElementById('trivia-container');
            data.results.forEach((question, index) => {
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                questionElement.innerHTML = `<h2>Pregunta ${index + 1}: ${question.question}</h2>`;

                const answers = [];
                question.incorrect_answers.forEach(answer => {
                    answers.push(`<button class="btn-answer">${answer}</button>`);
                });
                const correctPosition = Math.floor(Math.random() * (answers.length + 1));
                answers.splice(correctPosition, 0, `<button class="btn-answer correct">${question.correct_answer}</button>`);

                questionElement.innerHTML += answers.join('');
                triviaContainer.appendChild(questionElement);
            });

            document.querySelectorAll('.btn-answer').forEach(button => {
                button.addEventListener('click', function() {
                    if (this.classList.contains('correct')) {
                        alert('Respuesta Correcta!');
                        score += 100; 
                        document.getElementById('score').textContent = score; 
                    } else {
                        alert('Respuesta Incorrecta.');
                    }
                });
            });
        })
        .catch(error => console.error('Error al cargar la trivia:', error));
});
