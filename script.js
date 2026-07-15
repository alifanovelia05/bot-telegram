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

    document.getElementById('cardContainer').innerHTML = "<div style='text-align:center; padding:15px; background:#fff; border-radius:12px; border:1px solid #ccc;'>Sedang menganalisis...</div>";

    fetch('https://ngrok-free.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesan: teks, mode: mode, chat_id: chat_id })
    })
    .then(response => {
        if (!response.ok) throw new Error('Jaringan bermasalah');
        return response.json();
    }) 
    .then(data => {
        const container = document.getElementById('cardContainer');
        container.innerHTML = "";

        const teksLengkap = data.hasil;
        const barisPertama = teksLengkap.split('\n')[0] || "Hasil Riset Baru";
        const judulRingkas = barisPertama.replace(/Tema\/Trend:|Title:/gi, '').trim();

        const card = document.createElement('div');
        card.className = "rule-btn";
        card.style.display = "flex";
        card.style.justifyContent = "space-between";
        card.style.alignItems = "center";
        
        card.innerHTML = `
            <div style="flex-grow: 1; padding-right: 10px;">
                <div style="font-size: 11px; color: #888; font-weight: bold; margin-bottom: 4px;">📊 HASIL RISET</div>
                <div style="font-size: 15px; font-weight: 600; color: #333;">${judulRingkas}</div>
            </div>
            <div style="color: #333; font-weight: bold;">➔</div>
        `;

        card.onclick = function() {
            openDetailModal(judulRingkas, teksLengkap);
        };

        container.appendChild(card);
    })
    .catch(error => {
        document.getElementById('cardContainer').innerHTML = "<div style='text-align:center; padding:15px; color:red;'>Error: " + error.message + "</div>";
    });
}

function openDetailModal(title, content) {
    document.getElementById('detailTitle').innerText = title;
    document.getElementById('detailContent').innerText = content;
    document.getElementById('detailModal').style.display = 'block';
}

function closeDetailModal() {
    document.getElementById('detailModal').style.display = 'none';
}
