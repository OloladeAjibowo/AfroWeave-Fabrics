// AfroWeave Paystack Payment - Ololade
// Replace YOUR_PUBLIC_KEY with your real Paystack public key!

const PAYSTACK_PUBLIC_KEY = "pk_test_YOUR_KEY_HERE"; // <-- PASTE YOUR KEY HERE

function payWithPaystack(productName, amountNaira) {
  if (PAYSTACK_PUBLIC_KEY.includes("YOUR_KEY_HERE")) {
    alert("⚠️ Ololade, you need to add your Paystack Public Key in js/paystack.js line 4!\nGo to paystack.com → Settings → API Keys");
    return;
  }

  let email = prompt(`Pay for ${productName} - ₦${amountNaira.toLocaleString()}\nEnter your email for receipt:`);
  if (!email) return;

  let handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: amountNaira * 100, // Paystack uses kobo
    currency: "NGN",
    ref: 'AFRO-' + Math.floor((Math.random() * 1000000000) + 1),
    metadata: {
      custom_fields: [
        { display_name: "Product", variable_name: "product", value: productName },
        { display_name: "WhatsApp", variable_name: "whatsapp", value: "+2348185998597" }
      ]
    },
    callback: function(response){
      alert('Payment successful! Reference: ' + response.reference + '\nOlolade will WhatsApp you shortly! Screenshot this!');
      window.location.href = `https://wa.me/2348185998597?text=Hello%20Ololade!%20I%20just%20paid%20for%20${encodeURIComponent(productName)}%20-%20Ref:${response.reference}`;
    },
    onClose: function(){
      alert('Payment window closed. Chat Ololade on WhatsApp to order: +2348185998597');
    }
  });
  handler.openIframe();
}