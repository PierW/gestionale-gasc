const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const productName = document.getElementById('product-name').value;
  const productQuantity = document.getElementById('product-quantity').value;


  // Validate input
  if (productName === '' || productQuantity === '') {
    alert('Per piacere compila tutti i campi!');
  } else {
    showSpinner();
    hideForm();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(productName);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (productName) => {
  const qrcode = new QRCode('qrcode', {
    text: productName,
    width: 300,
    height: 300,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// Hide Form
const hideForm = () => {
  const form = document.getElementById('form-section');
  form.style.display = 'none';
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');

  if(spinner) spinner.style.display = 'none';
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {

  const link = document.createElement('a');
  link.id = 'create-new-product';
  link.classList =
    'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded w-1/3 m-auto mt-5';
  link.href = '/';
  link.innerHTML = 'Crea nuovo prodotto';

  const link1 = document.createElement('a');
  link1.id = 'save-link';
  link1.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto mt-2';
  link1.href = saveUrl;
  link1.download = 'qrcode';
  link1.innerHTML = 'Salva QrCode';

  const link2 = document.createElement('a');
  link2.id = 'print-link';
  link2.classList =
    'bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded w-1/3 m-auto mt-2';
  link2.href = saveUrl;
  link2.onclick = () => { window.print() };
  link2.innerHTML = 'Stampa QrCode';

  document.getElementById('generated').append(link, link1, link2);
};

hideSpinner();

if (form) form.addEventListener('submit', onGenerateSubmit);
