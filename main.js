const boxes = document.querySelectorAll(".box");
const buttons = document.querySelectorAll("button");
const colorPickers = document.querySelectorAll(".color-picker");
const defaultColors = [
  "#000000",
  "#27ff00",
  "#e9ff00",
  "#0024ff",
  "#ff0000",
  "#ffffff",
];
// Hex color generator function (our main function)
function hexGenerator() {
  const hexArray = "1234567890ABCDEF".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const rndHex = Math.floor(Math.random() * hexArray.length);
    color = color + hexArray[rndHex];
  }
  return color;
}
// make a loop to discover in boxes
boxes.forEach((n, index) => {
  const text = n.querySelector("p"); // get the copyable text box
  const colorPicker = n.querySelector(".color-picker"); //get the input color box
  const defaultColor = defaultColors[index]; //set colors into default by array
  n.style.backgroundColor = defaultColor; //change bg color to default when reload
  text.textContent = defaultColor; //change text
  colorPicker.value = defaultColor; //change color of input
  //make a function for generating new colors
  function bgStyle() {
    const newColor = hexGenerator();
    n.style.backgroundColor = newColor;
    text.textContent = newColor;
    colorPicker.value = newColor; //Update the color picker into generated color
  }
  //make an event on boxes by clicking on it
  n.addEventListener("click", bgStyle);
  text.addEventListener("click", (event) => {
    event.stopPropagation(); //prevent from click to change color
    navigator.clipboard
      .writeText(text.textContent)
      .then(() => {
        //show copied notification
        const copyTextBox = document.querySelector(".copy");
        copyTextBox.classList.remove("show");
        copyTextBox.classList.add("show");
        setTimeout(() => {
          copyTextBox.classList.remove("show");
        }, 2000);
      })
      .catch((err) => {
        alert("Failed to copy: " + err);
      });
  });
});
// make a loop to discover in buttons
buttons.forEach((n) => {
  n.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentBox = n.parentNode; //get the parent of that btn
    const text = parentBox.querySelector("p");
    const buttonColor = n.dataset.color; //reach color from dataset
    const colorPicker = parentBox.querySelector(".color-picker");
    parentBox.style.backgroundColor = buttonColor; //change color to color of dataset
    text.textContent = buttonColor;
    colorPicker.value = buttonColor;
  });
});

// Color picker events and functions
colorPickers.forEach((picker) => {
  picker.addEventListener("click", (event) => {
    event.stopPropagation(); //Prevents box click event when click color picker
  });
  //color picker event and get value
  picker.addEventListener("input", (event) => {
    const parentBox = picker.parentNode;
    const text = parentBox.querySelector("p");
    const chosenColor = event.target.value;
    parentBox.style.backgroundColor = chosenColor;
    text.textContent = chosenColor;
  });
});

// const boxes = document.querySelectorAll(".box");
// const buttons = document.querySelectorAll("button");
// const colorPickers = document.querySelectorAll(".color-picker");
// const defaultColors = ["#000000", "#27ff00", "#e9ff00", "#0024ff", "#ff0000", "#ffffff"];

// function hexGenerator() {
//     const hexArray = "1234567890ABCDEF".split("");
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       const rndHex = Math.floor(Math.random() * hexArray.length);
//       color = color + hexArray[rndHex];
//     }
//     return color;
//   }
// // تابع عمومی برای تغییر رنگ
// const setColor = (element, color) => {
//   const text = element.querySelector("p");
//   const colorPicker = element.querySelector(".color-picker");
//   element.style.backgroundColor = color;
//   text.textContent = color;
//   colorPicker.value = color;
// };

// // مقداردهی اولیه برای جعبه‌ها
// boxes.forEach((box, index) => {
//   const defaultColor = defaultColors[index];
//   setColor(box, defaultColor);

//   box.addEventListener("click", () => setColor(box, hexGenerator()));

//   box.querySelector("p").addEventListener("click", (event) => {
//     event.stopPropagation();
//     navigator.clipboard.writeText(box.querySelector("p").textContent)
//       .then(() => {
//         const copyTextBox = document.querySelector(".copy");
//         copyTextBox.classList.add("show");
//         setTimeout(() => copyTextBox.classList.remove("show"), 2000);
//       })
//       .catch(err => alert("Failed to copy: " + err));
//   });
// });

// // رویداد کلیک روی دکمه‌ها
// buttons.forEach(button => {
//   button.addEventListener("click", (event) => {
//     event.stopPropagation();
//     setColor(button.parentNode, button.dataset.color);
//   });
// });

// // رویداد انتخاب رنگ
// colorPickers.forEach(picker => {
//   picker.addEventListener("click", (event) => event.stopPropagation());

//   picker.addEventListener("input", (event) => {
//     setColor(picker.parentNode, event.target.value);
//   });
// });
