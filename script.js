const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) {
    tg.ready();
}

const rules = {
    riset: {
        title: "PETUNJUK RISET",
        body: "Anda bisa menanyakan tren pasar menggunakan kata tanya seperti 'apa', 'bagaimana', atau 'apa saja'.\n\nContoh:\n- 'Apa trend foto bulan agustus di amerika?'\n- 'Bagaimana tren aset visual untuk tema ramah lingkungan saat ini?'\n- 'Apa saja konsep foto yang sedang laku di Adobe Stock?'"
    },
    gambar: {
        title: "PETUNJUK GAMBAR",
        body: "WAJIB menyertakan frasa 'buat foto' atau 'buatkan' di awal pesan.\n\nContoh:\n- 'buat foto kucing lucu gaya 3d clay'\n- 'buat foto pemandangan alam estetik watercolor'\n- 'buatkan foto jamtangan'\n\nEstimasi waktu proses: 1.20 detik sampai 1.50 detik."
    }
};

function showModal(type) {
    document.getElementById('modalTitle').innerText = rules[type].title;
    document.getElementById('modalBody').innerText = rules[type].body;
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() { 
    document.getElementById('myModal').style.display = 'none'; 
}

function kirimKeN8N() {
    const userInput = document.getElementById('userInput');
    const teks = userInput ? userInput.value : '';

    if (!teks) {
        alert("Input kosong, silakan isi dulu!");
        return;
    }

    const mode = teks.toLowerCase().includes('buat') ? 'generate' : 'riset';

    const btn = document.querySelector('.submit-btn');
    btn.innerText = "Mengirim...";
    btn.disabled = true;

    fetch('https://carin-voiceless-cully.ngrok-free.dev/webhook/trigger-miniapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesan: teks, mode: mode })
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(() => {
        alert('Terkirim!');
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.close();
        }
    })
    .catch(error => {
        console.error('Error detail:', error);
        alert('Gagal: ' + error.message);
        btn.innerText = "Kirim";
        btn.disabled = false;
    });
}