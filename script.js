let selectedMode = '';
let selectedShop = '';
let selectedProducts = [];

function nextStep(step){
  if(step === 6 && selectedMode==='self'){ renderCart(); }
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('step'+step).classList.add('active');
}
function prevStep(step){
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('step'+step).classList.add('active');
}

function selectMode(mode, element){
  selectedMode = mode;
  document.getElementById('continueStep3').disabled = false;
  document.getElementById('selfChoice').classList.remove('selected');
  document.getElementById('helperChoice').classList.remove('selected');
  element.classList.add('selected');

  if(mode === 'self'){
    document.getElementById('selfOptions').style.display = 'block';
    document.getElementById('helperOptions').style.display = 'none';
  } else {
    document.getElementById('selfOptions').style.display = 'none';
    document.getElementById('helperOptions').style.display = 'block';
  }
}

function toggleProduct(element, productName){
  if(selectedProducts.includes(productName)){
    selectedProducts = selectedProducts.filter(p => p !== productName);
    element.classList.remove('selected');
  } else {
    selectedProducts.push(productName);
    element.classList.add('selected');
  }
  document.getElementById('continueStep4').disabled = selectedProducts.length === 0;
}

function selectShop(element, shopName){
  selectedShop = shopName;
  document.getElementById('selectedShopName').innerText = shopName;
  document.querySelectorAll('.shop-item').forEach(item => item.classList.remove('selected'));
  element.classList.add('selected');
  if(document.getElementById('continueStep4')) document.getElementById('continueStep4').disabled = false;
  if(document.getElementById('continueStep5')) document.getElementById('continueStep5').disabled = false;
}

function filterProducts(){
  const search = document.getElementById('productSearch').value.toLowerCase();
  document.querySelectorAll('.product-item').forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(search) ? 'block' : 'none';
  });
}

function filterShops(){
  const search = document.getElementById('shopSearch').value.toLowerCase();
  document.querySelectorAll('#selfShopList .shop-item').forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(search) ? 'block' : 'none';
  });
}

function sendMessage(){
  const msg = document.getElementById('chatMessage').value;
  if(msg.trim() === '') return;
  const chatBox = document.getElementById('chatBox');
  const p = document.createElement('p');
  p.innerHTML = '<strong>You:</strong> ' + msg;
  chatBox.appendChild(p);
  document.getElementById('chatMessage').value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
  setTimeout(() => {
    const reply = document.createElement('p');
    reply.innerHTML = '<strong>' + selectedShop + ':</strong> Yes, the product is available!';
    chatBox.appendChild(reply);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}

function renderCart(){
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';
  selectedProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.textContent = product;
    cartList.appendChild(div);
  });
}
