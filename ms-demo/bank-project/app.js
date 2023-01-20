//npx lite-server to active server to run single-app

let account = null;

//navigate path
function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}

function updateElement(id, textOrNode) {
  const element = document.getElementById(id);
  element.textContent = "";
  element.append(textOrNode);
}

function createTransationRow(transaction) {
  const template = document.getElementById("transaction");
  const transactionRow = template.content.cloneNode(true);
  const tr = transactionRow.querySelector("tr");
  tr.children[0].textContent = transaction.date;
  tr.children[1].textContent = transaction.object;
  tr.children[2].textContent = transaction.amount.toFixed(2);
  return transactionRow;
}

function updateDashboard() {
  if (!account) {
    return navigate("/login");
  }

  updateElement("description", account.description);
  updateElement("balance", account.balance.toFixed(2));
  updateElement("currency", account.currency);

  const transactionsRows = document.createDocumentFragment();
  for (const transaction of account.transactions) {
    const transactionRow = createTransationRow(transaction);
    transactionsRows.appendChild(transactionRow);
  }
  updateElement("transactions", transactionsRows);
}
//routes
const routes = {
  "/login": { templateId: "login" },
  "/dashboard": { templateId: "dashboard", init: updateDashboard },
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

  if (typeof route.init === "function") {
    route.init();
  }
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
  account = result;
  navigate("/dashboard");
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
    return { error: error.message || "Unknown error" };
  }
}

//login
async function login() {
  const loginForm = document.getElementById("loginForm");
  const user = loginForm.user.value;
  const data = await getAccount(user);

  if (data.error) {
    return updateElement("loginError", data.error);
  }

  account = data;
  navigate("/dashboard");
}

async function getAccount(user) {
  try {
    const response = await fetch(
      "//localhost:5000/api/accounts/" + encodeURIComponent(user)
    );
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

window.onpopstate = () => updateRoute();
updateRoute();
//updateRoute("login");
