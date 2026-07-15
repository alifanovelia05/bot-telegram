const tg = window.Telegram.WebApp;
tg.ready();

const rules = {
    riset: "Anda bisa menanyakan tren pasar menggunakan kata tanya seperti 'apa', 'bagaimana', atau 'apa saja'.\n\nContoh:\n- 'Apa trend foto bulan agustus di amerika?'\n- 'Bagaimana tren aset visual untuk tema ramah lingkungan saat ini?'\n- 'Apa saja konsep foto yang sedang laku di Adobe Stock?'",
    gambar: "WAJIB menyertakan frasa 'buat foto' atau 'buatkan' di awal pesan.\n\nContoh:\n- 'buat foto kucing lucu gaya 3d clay'\n- 'buat foto pemandangan alam estetik watercolor'\n- 'buatkan foto jamtangan'"
};

function showModal(type) {
    document.getElementById('modalTitle').innerText = type.toUpperCase() + " RULES";
    document.getElementById('modalBody').innerText = rules[type];
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() { document.getElementById('myModal').style.display = 'none'; }

function kirimKeN8N() {
    const teks = document.getElementById('userInput').value;
    const mode = teks.toLowerCase().includes('buat') ? 'generate' : 'riset';
    
    fetch('https://carin-voiceless-cully.ngrok-free.dev/webhook/trigger-miniapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesan: teks, mode: mode })
    }).then(() => {
        alert('Terkirim!');
        tg.close();
    });
}