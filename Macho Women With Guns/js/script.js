// levels 0-4 are skills, levels 8-20 are attributes
// there are no levels 6 or 7
const STAT_LEVEL_TO_COSTS = [
  { level: 0, cost: 3, stat: "skill" },
  { level: 1, cost: 5, stat: "skill" },
  { level: 2, cost: 10, stat: "skill" },
  { level: 3, cost: 15, stat: "skill" },
  { level: 4, cost: 20, stat: "skill" },
  { level: 5, cost: 30, stat: "skill" },
  { level: 8, cost: -5, stat: "attribute" },
  { level: 9, cost: -2, stat: "attribute" },
  { level: 10, cost: 0, stat: "attribute" },
  { level: 11, cost: 2, stat: "attribute" },
  { level: 12, cost: 5, stat: "attribute" },
  { level: 13, cost: 10, stat: "attribute" },
  { level: 14, cost: 15, stat: "attribute" },
  { level: 15, cost: 20, stat: "attribute" },
  { level: 16, cost: 30, stat: "attribute" },
  { level: 17, cost: 40, stat: "attribute" },
  { level: 18, cost: 50, stat: "attribute" },
  { level: 19, cost: 60, stat: "attribute" },
  { level: 20, cost: 70, stat: "attribute" },
];

let points = 75;

const plusButtons = document.querySelectorAll("button.plus");
const minusButtons = document.querySelectorAll("button.minus");
const classDropdown = document.getElementById("class");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

// todo add function for updating total from checkboxes
classDropdown.addEventListener("change", (e) => disableNonClass());

plusButtons.forEach((button) =>
  button.addEventListener("click", (e) => increment(e))
);

minusButtons.forEach((button) =>
  button.addEventListener("click", (e) => decrement(e))
);

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", (e) => totalCalculator(e))
)

function increment(e) {
  let buttonClicked = e.target;

  let input = buttonClicked.parentElement.children.namedItem("level");

  let inputVal = input.value;

  let containerName = buttonClicked.parentElement.parentElement.parentElement.className;
  if ((containerName == "attributes") && (inputVal < 19)) {
    let newVal = parseInt(inputVal) + 1;
    input.value = newVal;
  } else if ((containerName == "skills") && (inputVal < 5)) {
    let newVal = parseInt(inputVal) + 1;
    input.value = newVal;
  } else {
    console.log("no")
  }

  statLevelToCost(e);
  totalCalculator(e);
}

function decrement(e) {
  let buttonClicked = e.target;

  // this is brittle want to fix it latersssss
  let input = buttonClicked.parentElement.children.namedItem("level");

  let inputVal = input.value;

  let containerName = buttonClicked.parentElement.parentElement.parentElement.className;

  if ((containerName == "attributes") && (inputVal > 8)) {
    let newVal = parseInt(inputVal) - 1;
    input.value = newVal;
  } else if ((containerName == "skills") && (inputVal > 0)) {
    let newVal = parseInt(inputVal) - 1;
    input.value = newVal;
  } else {
    console.log("no")
  }

  statLevelToCost(e);
  totalCalculator(e);
}

function statLevelToCost(e) {
  let buttonClicked = e.target;

  let input = buttonClicked.parentElement.children.namedItem("level");

  let inputVal = input.value;

  let inputValInteger = parseInt(inputVal);

  let costInput = buttonClicked.parentElement.children.namedItem("cost");

  STAT_LEVEL_TO_COSTS.forEach(function (stat) {
    let cost;
    if (stat.level === inputValInteger) {
      costInput.value = stat.cost;
    }
  });
}

// disable skills, disadvantages, and advantages not associated if class not present
// input.class include nun
function disableNonClass() { }

// todo local total
function totalCalculator(e) {
  let buttonClicked = e.target;
  let points = document.getElementById("points");

  let container = buttonClicked.parentElement.parentElement.parentElement;

  let costAttInputs = Array.from(
    document.querySelectorAll("div.attributes input.cost")
  );

  let costCheckboxInputs = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked ~ input.cost")
  );

  console.log(costCheckboxInputs)

  let costInputs = costAttInputs.concat(costCheckboxInputs);

  let total = 0;
  costInputs.forEach((input) => (total += parseInt(input.value)));

  points.value = 75 - total;
}

// todo add name="cost" to advantages and disadvantagess
