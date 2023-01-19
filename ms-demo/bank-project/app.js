//npx lite-server to active server to run single-app

//routes
const routes = {
  "/login": { templateId: "login" },
  "/dashboard": { templateId: "dashboard" },
};

//according to routes to update content
function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];
  if (!route) {
    return navigate("login");
  }

  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(view);
}

//navigate path
function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}

function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}

/* Retrieve the form data
 Convert and encode the form data to a suitable format
 Create the HTTP request and send it to the server */
//single page app principle let web page as a app
async function register() {
  const registerForm = document.getElementById("registerForm");
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);
  const jsonData = JSON.stringify(data);
  const result = await createAccount(jsonData);

  if (result.error) {
    registerForm.after(`<p>${result.error}</p>`);
    return console.log("An error occurred:", result.error);
  }

  console.log("Account created!", result);
}

async function createAccount(account) {
  try {
    const response = await fetch("//localhost:5000/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: account,
    });
    return await response.json();
  } catch (error) {
    return { erro: error.messaeg || "Unknown error" };
  }
}

window.onpopstate = () => updateRoute();
updateRoute();
//updateRoute("login");
