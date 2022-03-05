let i = 0;
let username;
let right_answer = 0;
let CORRECT_SOUND = new Audio("sound/correct.mp3");
let WRONG_SOUND = new Audio("sound/wrong.mp3");
let FINAL_SOUND = new Audio("sound/final.mp3");
let progress = 0;

load();

function reload(){
   window.location.reload()
}

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
      username = username.replace(/[^a-zA-Z0-9 ]/g, '');
   }
}

function render() {
   renderQuestion();
}

function renderCard(id,template){
   let element = getById(id);
   element.innerHTML = template
}

function renderQuestion() {
  renderCard("card-header",cardHeaderTemplate());
  renderCard("card-body",cardBodyTemplate());
  renderCard("card-footer",cardFooterTemplate());
}

function progressBarTemplate(){
   return ` <div class="progress">
   <div id="progress-bar" class="progress-bar" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${progress}%</div>
 </div>`
}

function nextQuestion(){
   i++;
   if(i < questions.length){
      render()
   } else{
      addResult();
      save();
      renderEnd();
   }
   moveProgressBar();
}

function moveProgressBar(){
   
   progress = Math.round(i / questions.length * 100);
   
   let progress_bar = getById("progress-bar");
   progress_bar.innerHTML = `${progress}%`;
   progress_bar.style.width = `${progress}%`
}

function renderEnd(){
   let thanks = getById("thanks");
   let end = getById("end-card");
   end.classList.add("appear");
   FINAL_SOUND.play();
   startConfetti();
   addUsername(thanks);
   addRanking();
}

function save(){
   let results_text = JSON.stringify(results);
   localStorage.setItem("results",results_text)
}

function load(){
   if(localStorage.getItem("results")){
      let results_text = localStorage.getItem("results");
      results = JSON.parse(results_text);
   }
}

function addResult(){
   results.unshift({"name":`${username}`,"result":`${right_answer}`})
}

function addUsername(thanks){
   thanks.innerHTML += `Danke <span class="username"><b>${username}</b>,</span> dass du <span class="blue-txt">Quizmaster</span> benutzt hast!`
}

function addRanking(){
   let table = getById("table-body");
   if(results.length > 3){
      for(let i = 0; i < 3; i++){
         table.innerHTML += rankingTemplate(i);
      }
   } else{
      for(let i = 0; i < results.length; i++){
         table.innerHTML += rankingTemplate(i);
      }
   }
   addAllRanking();
}

function addAllRanking(){
   let table = getById("all-ranking");
   for(let i = 0; i < results.length; i++){
      table.innerHTML += rankingTemplate(i);
   }  
}

function showAllResults(){
   let result_card = getById("result-card");
   result_card.classList.add("appear");
}

function rankingTemplate(i){
   return `<tr>
   <td>${results[i]['name']}</td>
   <td>${results[i]['result']} von ${questions.length}</td>
 </tr>`
}

function cardHeaderTemplate(){
   return`
   <h2 class="blue-txt">Quizmaster</h2>
   <h4 id="question">
      ${questions[i]['question']}
   </h4>`
}

function cardBodyTemplate(){
   return`
      ${answer1Template()}${answer2Template()}${answer3Template()}${answer4Template()}`
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
   return`
   <div class="questions-number">
     <span id="question-number">Frage ${i + 1}</span>
     <span>von ${questions.length}</span>
   </div>
   <button type="button" class="btn btn-primary btn-lg" disabled id="next(${i})">Next</button>`
}


function checkAnswer(number){
   let answer = getById(`answer-${number}`)
   if(number == questions[i]['correct']){
      answer.style.backgroundColor = "green";
      right_answer++
      CORRECT_SOUND.play();
      
   } else{
      answer.style.backgroundColor = "red";
      WRONG_SOUND.play();
   }
   addNextOnClick();
   showRightAnswer();
   deleteOnClick();
}

function addNextOnClick(){
   let next = getById(`next(${i})`);
   next.setAttribute("onclick","nextQuestion()");
   next.removeAttribute("disabled");
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

function goBack(){
   let result_card = getById("result-card");
   result_card.classList.remove("appear");
   result_card.classList.add("disappear");
}