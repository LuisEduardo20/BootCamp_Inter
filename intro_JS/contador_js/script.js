let valor = 0;

function adicionaContador() {
  valor += 1;
  document.getElementById('valor').innerHTML = valor;
}

function decrementaContador() {
  valor -= 1;
  document.getElementById('valor').innerHTML = valor;
}

document.getElementById('valor').innerHTML = valor;

document.getElementById('adicionar')
.addEventListener('click', e => {
  e.preventDefault();
  adicionaContador();
});

document.getElementById('decrementar')
.addEventListener('click', e => {
  e.preventDefault();
  decrementaContador();
});
