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
    const teks = document.getElementById('userInput').value;
    const mode = teks.toLowerCase().includes('buat') ? 'generate' : 'riset';
    const chat_id = tg.initDataUnsafe?.user?.id;

    document.getElementById('hasilArea').innerText = "Sedang menganalisis, mohon tunggu...";

    fetch('https://carin-voiceless-cully.ngrok-free.dev/webhook-test/trigger-miniapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            pesan: teks, 
            mode: mode, 
            chat_id: chat_id 
        })
    })
    .then(response => response.json()) 
    .then(data => {
        
        document.getElementById('hasilArea').innerText = data.hasil; 
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('hasilArea').innerText = "Terjadi kesalahan, silakan coba lagi.";
    });
}