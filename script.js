let i = 0;

function getById(id) {
   return document.getElementById(id);
}

function start() {
   let start = document.getElementById("start-card");
   start.classList.add("animation");
   setTimeout(() => {start.style.display = "none"},1500)
}

function render() {
   let main_card = getById("main-card");
   main_card.innerHTML = "";
   renderQuestion();
}

function renderCard(template){
   let element = getById("main-card");
   element.innerHTML += template
}

function renderQuestion() {
  renderCard(cardHeaderTemplate());
  renderCard(cardBodyTemplate());
  renderCard(cardFooterTemplate());
  
}

function nextQuestion(){
   i++;
   if(i < questions.length){
      render()
   } else{
      alert("FINITO")
   }
}

function cardHeaderTemplate(){
   return`<div class="card-header">
   <h2 class="blue-txt">Quizmaster</h2>
   <h4 id="question">
      ${questions[i]['question']}
   </h4>
 </div>`
}

function cardBodyTemplate(){
   return` <div class="card-body">
      ${answer1Template()}${answer2Template()}${answer3Template()}${answer4Template()}
      </div>`
}

function answer1Template(){
   return `<div class="card">
   <div class="card-body" id="answer-1">
   <span class="letter-box">A</span>
      <span>${questions[i]['answer_1']}</span>
      </div>
 </div>`
}

function answer2Template(){
   return `<div class="card">
      <div class="card-body" id="answer-2">
      <span class="letter-box">B</span>
      <span>${questions[i]['answer_2']}</span>
      </div>
 </div>`
}

function answer3Template(){
   return `<div class="card">
      <div class="card-body" id="answer-3">
      <span class="letter-box">C</span>
      <span>${questions[i]['answer_3']}</span>
      </div>
 </div>`
}

function answer4Template(){
   return `<div class="card">
      <div class="card-body" id="answer-4">
      <span class="letter-box">D</span>
      <span>${questions[i]['answer_4']}</span>
      </div>
      </div>`
}

function cardFooterTemplate(){
   return`<div class="card-footer">
   <div class="questions-number">
     <span id="question-number">Frage ${i + 1}</span>
     <span>von ${questions.length}</span>
   </div>
   <button type="button" class="btn btn-primary btn-lg" onclick="nextQuestion()">Next</button>
 </div>`
}