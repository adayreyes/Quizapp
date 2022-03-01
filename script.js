let i = 0;
let username;
function getById(id) {
   return document.getElementById(id);
}

function start() {
   let start = getById("start-card");
   let user = getById("user").value;
   start.classList.add("disappear");
   setTimeout(() => {start.style.display = "none"},1500)
   chackUserName(user);
}

function chackUserName(user){
   if(user === ""){
      username = "Frau/Herr ohne Namen" 
   } else{
      username = user
   }
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
      renderEnd();
   }
}

function renderEnd(){
   let end = getById("end-card");
   end.classList.add("appear");
   addUsername(end);
}

function addUsername(end){
   end.innerHTML += `<span>${username}</span>`
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
   return `<div class="card answer hover" id="answer-1"  onclick="checkAnswer(1)">
   <div class="card-body" >
   <span class="letter-box">A</span>
      <span>${questions[i]['answer_1']}</span>
      </div>
 </div>`
}

function answer2Template(){
   return `<div class="card answer hover" id="answer-2"  onclick="checkAnswer(2)">
      <div class="card-body" >
      <span class="letter-box">B</span>
      <span>${questions[i]['answer_2']}</span>
      </div>
 </div>`
}

function answer3Template(){
   return `<div class="card answer hover" id="answer-3" onclick="checkAnswer(3)">
      <div class="card-body"  >
      <span class="letter-box">C</span>
      <span>${questions[i]['answer_3']}</span>
      </div>
 </div>`
}

function answer4Template(){
   return `<div class="card answer hover" id="answer-4" onclick="checkAnswer(4)">
      <div class="card-body" >
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


function checkAnswer(number){
   let answer = getById(`answer-${number}`)
   if(number == questions[i]['correct']){
      answer.style.backgroundColor = "green";
      
   } else{
      answer.style.backgroundColor = "red";
   }
   showRightAnswer();
   deleteOnClick();
}

function deleteOnClick(){
   let answers = document.getElementsByClassName("answer");
   for(let i = 0; i < answers.length; i++){
      answers[i].removeAttribute("onclick");
      answers[i].classList.remove("hover");
      
   }
}

function showRightAnswer(){
   let rightAnswer = getById(`answer-${questions[i]['correct']}`);
   rightAnswer.style.backgroundColor = "green";
}