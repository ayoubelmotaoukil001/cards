// elements
const startBtn = document.querySelector("button");
const main = document.querySelector("main");

let questions = [];
let index = 0;
let score = 0;

// load questions from external JSON
fetch("quiz.json")
  .then(response => response.json())
  .then(data => {
    questions = data;

    // enable start after questions loaded
    startBtn.addEventListener("click", () => {
      if (questions.length === 0) {
        alert("Please wait, questions are still loading...");
        return;
      }
      // reset state in case of replay without reload
      index = 0;
      score = 0;
      showQuestion();
    });
  })
  .catch(err => {
    console.error("Error loading JSON:", err);
    alert("Failed to load questions.");
  });

function showQuestion() {
  if (index >= questions.length) {
    showResult();
    return;
  }

  const q = questions[index];

  main.innerHTML = `
    <section class="flex justify-center mt-[4rem]">
      <div class="bg-black text-white rounded-[1.7rem] p-[3rem] w-[26rem]">
        <h2 class="text-[2rem] font-bold mb-[1rem]">${q.question}</h2>
        <div class="flex flex-col gap-[1rem]">
          ${q.options
            .map(
              (opt) =>
                `<button class="bg-white text-black p-[0.7rem] rounded-[1rem] font-bold option">${opt}</button>`
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  document.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => checkAnswer(btn.innerText.trim()));
  });
}

// check answer and go next
function checkAnswer(selected) {
  if (selected === questions[index].answer) {
    score++;
  }

  index++;
  showQuestion();
}

// final result
function showResult() {
  main.innerHTML = `
    <section class="flex justify-center mt-[4rem]">
      <div class="bg-black text-white rounded-[2rem] p-[2rem] w-[26rem] text-center">
        <h2 class="text-[3rem] font-bold">Your Score</h2>
        <p class="text-[2rem] mt-[1rem]">${score} / ${questions.length}</p>
        <button id="play-again" class="mt-[2rem] bg-white text-black p-[0.7rem] rounded-[2rem] text-[1.2rem] font-bold">
          Play Again
        </button>
      </div>
    </section>
  `;

  // allow replay without full page reload
  document.getElementById("play-again").addEventListener("click", () => {
    index = 0;
    score = 0;
    showQuestion();
  });
}
