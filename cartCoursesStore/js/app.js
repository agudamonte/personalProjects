const courseList = document.querySelector("#lista-cursos");
const cartContainer = document.querySelector("#carrito tbody");
let selectedCourses = [];
const cart = document.querySelector("#carrito");

courseList.addEventListener("click", addToCart);
cart.addEventListener("click", removeFromCart);

function addToCart(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const courseSelected = e.target.parentElement.parentElement;
    getCourseDetails(courseSelected);
  }
}

function removeFromCart(e) {
  const courseID = e.target.getAttribute("data-id");
  if (e.target.classList.contains("borrar-curso")) {
    const courses = selectedCourses.filter((course) => course.id !== courseID);
    selectedCourses = [...courses];
    cartHTML(selectedCourses);
  }
}

function getCourseDetails(course) {
  let courseDetails = {
    img: course.querySelector("img").src,
    name: course.querySelector("h4").textContent,
    price: course.querySelector(".precio span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
    quantity: 1,
  };

  // antes de agregarlo al array de objetos, verificar si ya existe.
  const validate = selectedCourses.some(
    (course) => course.id === courseDetails.id
  );

  // si esta, solo hay quye actualizar la cantidad, no volver a agregarlo.
  if (validate) {
    const courses = selectedCourses.map((course) => {
      // creo un  nuevo arreglo con los datos de los cursos updated
      if (course.id === courseDetails.id) {
        course.quantity++;
        return course;
      } else {
        return course;
      }
    });
    selectedCourses = [...courses];
  } else {
    selectedCourses = [...selectedCourses, courseDetails];
  }

  cartHTML(selectedCourses);
}

function cartHTML(courses) {
  cleanHTML(selectedCourses);

  courses.forEach((course) => {
    const { img, name, price, quantity, id } = course;
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
    <td> 
      <img src="${img}" style="width:100px;">
    </td>
    <td>
    ${name}
    </td>
    <td>
    ${price}
    </td>
    <td>
    ${quantity}
    </td>
    <td>
      <a href="#" class="borrar-curso" data-id="${id}"> X </a>
    </td>

    `;
    cartContainer.appendChild(tableRow);
  });
}

function cleanHTML() {
  // cartContainer.innerHTML = "";
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}

// Agregar el selector de carrito #carrito  y utilizar delegation para que se ejecute solo cuando apretamos la cruz
// elimina cursos de carrito -> con un add event Listener (click, deleteCourse)

// function deleteCourse() {

// }
