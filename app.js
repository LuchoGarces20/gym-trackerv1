let historialEntrenamientos = [];
let graficoInstancia = null;

const estructuraEjercicios = {
    g_peito: ['e_supino_reto', 'e_supino_inc', 'e_flys'],
    g_costas: ['e_puxada', 'e_remada_sentada', 'e_remada_pe'],
    g_biceps: ['e_curl_normal', 'e_curl_martelo'],
    g_triceps: ['e_skullcrusher', 'e_polia'],
    g_ombro: ['e_elev_lateral', 'e_elev_frontal', 'e_elev_posterior', 'e_press_militar'],
    g_perna_front: ['e_agachamento_smith', 'e_extensora', 'e_sumo', 'e_abdutora'],
    g_perna_post: ['e_stiff', 'e_flexora', 'e_panturrilha', 'e_leg_press']
};

const diccionarioIdiomas = {
    es: {
        registrar: "Registrar Serie", guardar: "Guardar", cal_tit: "Calendario", rec_tit: "Récords Personales",
        todos: "Todos", exp: "Exportar CSV", imp_btn: "Importar CSV", del_btn: "Borrar Perfil", btn_datos: "⚙️ Gestión de Datos",
        ph_peso: "kg", ph_reps: "reps", ph_nota: "Comentarios (opcional)", msg_sin_cal: "Sin registros.", msg_ultimo: "Anterior:",
        grafico_tit: "Progreso", grafico_label: "Peso (kg)",
        g_peito: "Pecho", g_costas: "Espalda", g_biceps: "Bíceps", g_triceps: "Tríceps", g_ombro: "Hombros", g_perna_front: "Pierna (Front)", g_perna_post: "Pierna (Post)", g_custom: "Personalizados",
        e_supino_reto: "Press Plano", e_supino_inc: "Press Inclinado", e_flys: "Aperturas", e_puxada: "Jalón al Pecho", e_remada_sentada: "Remo Sentado", e_remada_pe: "Remo en Pie", e_curl_normal: "Curl Bíceps", e_curl_martelo: "Curl Martillo", e_skullcrusher: "Tríceps Testa", e_polia: "Polea Tríceps", e_elev_lateral: "Elev. Lateral", e_elev_frontal: "Elev. Frontal", e_elev_posterior: "Elev. Posterior", e_press_militar: "Press Militar", e_agachamento_smith: "Sentadilla Smith", e_extensora: "Extensora", e_sumo: "Sumo", e_abdutora: "Aductora", e_stiff: "Stiff (RDL)", e_flexora: "Flexora", e_panturrilha: "Pantorrilla", e_leg_press: "Leg Press"
    },
    pt: {
        registrar: "Treinar", guardar: "Salvar", cal_tit: "Calendário", rec_tit: "Recordes",
        todos: "Todos", exp: "Exportar CSV", imp_btn: "Importar CSV", del_btn: "Apagar Perfil", btn_datos: "⚙️ Gestão de Dados",
        ph_peso: "kg", ph_reps: "reps", ph_nota: "Comentários (opcional)", msg_sin_cal: "Sem treinos.", msg_ultimo: "Anterior:",
        grafico_tit: "Análise", grafico_label: "Peso (kg)",
        g_peito: "Peito", g_costas: "Costas", g_biceps: "Bíceps", g_triceps: "Tríceps", g_ombro: "Ombros", g_perna_front: "Perna Front", g_perna_post: "Perna Post", g_custom: "Personalizados",
        e_supino_reto: "Supino Reto", e_supino_inc: "Supino Incl.", e_flys: "Crucifixo", e_puxada: "Puxada", e_remada_sentada: "Remada Sentada", e_remada_pe: "Remada em Pé", e_curl_normal: "Rosca Direta", e_curl_martelo: "Rosca Martelo", e_skullcrusher: "Tríceps Testa", e_polia: "Polia", e_elev_lateral: "Lateral", e_elev_frontal: "Frontal", e_elev_posterior: "Posterior", e_press_militar: "Desenvolvimento", e_agachamento_smith: "Agachamento Smith", e_extensora: "Extensora", e_sumo: "Sumô", e_abdutora: "Abdutora", e_stiff: "Stiff", e_flexora: "Flexora", e_panturrilha: "Panturrilha", e_leg_press: "Leg Press"
    },
    en: {
        registrar: "Log Set", guardar: "Save", cal_tit: "Calendar", rec_tit: "Records",
        todos: "All", exp: "Export CSV", imp_btn: "Import CSV", del_btn: "Delete Profile", btn_datos: "⚙️ Data Management",
        ph_peso: "kg", ph_reps: "reps", ph_nota: "Notes (optional)", msg_sin_cal: "No logs.", msg_ultimo: "Last:",
        grafico_tit: "Progress", grafico_label: "Weight (kg)",
        g_peito: "Chest", g_costas: "Back", g_biceps: "Biceps", g_triceps: "Triceps", g_ombro: "Shoulders", g_perna_front: "Quads", g_perna_post: "Hamstrings", g_custom: "Custom",
        e_supino_reto: "Flat Bench", e_supino_inc: "Incline Bench", e_flys: "Flys", e_puxada: "Lat Pulldown", e_remada_sentada: "Seated Row", e_remada_pe: "Upright Row", e_curl_normal: "Bicep Curl", e_curl_martelo: "Hammer Curl", e_skullcrusher: "Skullcrusher", e_polia: "Pushdown", e_elev_lateral: "Lateral Raise", e_elev_frontal: "Front Raise", e_elev_posterior: "Rear Delt", e_press_militar: "Shoulder Press", e_agachamento_smith: "Smith Squat", e_extensora: "Extension", e_sumo: "Sumo", e_abdutora: "Abductor", e_stiff: "Stiff RDL", e_flexora: "Leg Curl", e_panturrilha: "Calf Raise", e_leg_press: "Leg Press"
    }
};

function t(c) { 
    if (c.startsWith('c_')) {
        const custom = JSON.parse(localStorage.getItem('gym_custom_ex') || '[]');
        const f = custom.find(x => x.id === c);
        return f ? f.nombre : c;
    }
    const l = document.getElementById('selectorIdioma').value;
    return (diccionarioIdiomas[l] && diccionarioIdiomas[l][c]) ? diccionarioIdiomas[l][c] : c.replace('e_','').replace('g_','').toUpperCase();
}

function obtenerClave() { return 'gym_v4_' + document.getElementById('perfilUsuario').value; }

function toggleDatos() {
    const p = document.getElementById('panelDatos');
    p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

function agregarEjercicioCustom() {
    const lang = document.getElementById('selectorIdioma').value;
    const msg = lang === 'en' ? 'New exercise name:' : (lang === 'pt' ? 'Nome do novo exercício:' : 'Nombre del nuevo ejercicio:');
    let nombre = prompt(msg);
    if (!nombre || nombre.trim() === '') return;
    nombre = nombre.trim(); // Sanitizando a entrada
    
    const customId = 'c_' + Date.now();
    let customArr = JSON.parse(localStorage.getItem('gym_custom_ex') || '[]');
    customArr.push({ id: customId, nombre: nombre });
    localStorage.setItem('gym_custom_ex', JSON.stringify(customArr));
    
    construirListas();
    document.getElementById('ejercicioSelect').value = customId;
    mostrarUltimoEntreno();
}

function construirListas() {
    const sels = [document.getElementById('ejercicioSelect'), document.getElementById('ejercicioGrafico')];
    const fil = document.getElementById('filtroGrupo');
    sels.forEach(s => s.innerHTML = '');
    fil.innerHTML = `<option value="Todos">${t('todos')}</option>`;
    
    // Ejercicios Base
    for (const g in estructuraEjercicios) {
        fil.innerHTML += `<option value="${g}">${t(g)}</option>`;
        sels.forEach(s => {
            let grp = document.createElement('optgroup'); grp.label = t(g);
            estructuraEjercicios[g].forEach(ej => {
                let o = document.createElement('option'); o.value = ej; o.textContent = t(ej); o.setAttribute('data-grupo', g); grp.appendChild(o);
            });
            s.appendChild(grp);
        });
    }

    // Ejercicios Custom
    const customArr = JSON.parse(localStorage.getItem('gym_custom_ex') || '[]');
    if (customArr.length > 0) {
        fil.innerHTML += `<option value="g_custom">${t('g_custom')}</option>`;
        sels.forEach(s => {
            let grp = document.createElement('optgroup'); grp.label = t('g_custom');
            customArr.forEach(ej => {
                let o = document.createElement('option'); o.value = ej.id; o.textContent = ej.nombre; o.setAttribute('data-grupo', 'g_custom'); grp.appendChild(o);
            });
            s.appendChild(grp);
        });
    }
}

function cambiarIdioma() {
    localStorage.setItem('idiomaApp', document.getElementById('selectorIdioma').value);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (el.tagName === 'INPUT') el.placeholder = t(k);
        else if (el.tagName === 'BUTTON') el.innerHTML = t(k);
        else el.textContent = t(k);
    });
    construirListas(); actualizarPantallas();
}

function actualizarPantallas() {
    historialEntrenamientos = JSON.parse(localStorage.getItem(obtenerClave()) || '[]');
    mostrarUltimoEntreno(); mostrarHistorialPorFecha(); mostrarMejoresEsfuerzos(); renderizarGrafico();
}

function guardarEntrenamiento() {
    const ej = document.getElementById('ejercicioSelect');
    const p = document.getElementById('peso').value;
    const r = document.getElementById('repeticiones').value;
    const nota = document.getElementById('comentario').value;
    
    if (!p || !r || p <= 0 || r <= 0) return; // Adicionado bloqueio para números inválidos
    
    historialEntrenamientos.push({
        id: Date.now(),
        fechaISO: document.getElementById('fechaCalendario').value,
        gimnasio: document.getElementById('gimnasioActual').value,
        grupo: ej.options[ej.selectedIndex].getAttribute('data-grupo'),
        ejercicio: ej.value,
        peso: parseFloat(p),
        repeticiones: parseInt(r),
        notas: nota
    });
    
    localStorage.setItem(obtenerClave(), JSON.stringify(historialEntrenamientos));
    document.getElementById('peso').value = ''; 
    document.getElementById('repeticiones').value = '';
    document.getElementById('comentario').value = '';
    actualizarPantallas();
}

function renderizarGrafico() {
    const ejGrafico = document.getElementById('ejercicioGrafico');
    if (!ejGrafico || !ejGrafico.value) return; // Guard clause para prevenir falha no boot
    
    const ej = ejGrafico.value;
    const gym = document.getElementById('gimnasioActual').value;
    const ctx = document.getElementById('graficoProgreso').getContext('2d');
    
    if (graficoInstancia) graficoInstancia.destroy();
    
    const f = historialEntrenamientos.filter(e => e.ejercicio === ej && e.gimnasio === gym);
    const m = {}; f.forEach(e => { if (!m[e.fechaISO] || e.peso > m[e.fechaISO]) m[e.fechaISO] = e.peso; });
    const keys = Object.keys(m).sort();
    
    graficoInstancia = new Chart(ctx, {
        type: 'line',
        data: {
            labels: keys.map(k => k.split('-').reverse().slice(0,2).join('/')),
            datasets: [{ label: t('grafico_label'), data: keys.map(k => m[k]), borderColor: '#007AFF', tension: 0.4, fill: true, backgroundColor: 'rgba(0,122,255,0.15)' }]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false } } } }
    });
}

function mostrarUltimoEntreno() {
    const ejSelect = document.getElementById('ejercicioSelect');
    if (!ejSelect || !ejSelect.value) return;
    
    const ej = ejSelect.value;
    const gym = document.getElementById('gimnasioActual').value;
    const f = historialEntrenamientos.filter(e => e.ejercicio === ej && e.gimnasio === gym).sort((a,b) => b.id - a.id);
    document.getElementById('ultimoEntrenoInfo').textContent = f.length ? `${t('msg_ultimo')} ${f[0].peso}kg x ${f[0].repeticiones} ${f[0].notas ? '📝' : ''}` : "";
}

function mostrarHistorialPorFecha() {
    const fe = document.getElementById('fechaCalendario').value;
    const gy = document.getElementById('gimnasioActual').value;
    const div = document.getElementById('calendario-container');
    div.innerHTML = '';
    const hoy = historialEntrenamientos.filter(e => e.fechaISO === fe && e.gimnasio === gy);
    if (!hoy.length) return div.innerHTML = `<p style="color:#666; font-size:14px; text-align:center;">${t('msg_sin_cal')}</p>`;
    hoy.forEach(e => {
        const notaHTML = e.notas ? `<span class="nota-text">"${e.notas}"</span>` : '';
        div.innerHTML += `<div class="log-item"><span class="badge">${t(e.grupo)}</span><br><strong>${t(e.ejercicio)}</strong>: ${e.peso}kg x ${e.repeticiones} ${notaHTML}</div>`;
    });
}

function mostrarMejoresEsfuerzos() {
    const gy = document.getElementById('gimnasioActual').value;
    const fil = document.getElementById('filtroGrupo').value;
    const div = document.getElementById('historial-container');
    div.innerHTML = '';
    const recs = {};
    historialEntrenamientos.filter(e => e.gimnasio === gy && (fil === 'Todos' || e.grupo === fil)).forEach(e => {
        if (!recs[e.ejercicio] || e.peso > recs[e.ejercicio].peso) recs[e.ejercicio] = e;
    });
    Object.values(recs).forEach(e => div.innerHTML += `<div class="log-item"><strong>${t(e.ejercicio)}</strong><br>🏆 ${e.peso}kg x ${e.repeticiones}</div>`);
}

function renombrarPerfil() {
    const id = document.getElementById('perfilUsuario').value;
    const n = prompt("Nombre:", document.getElementById('nombre_' + id).textContent);
    if (n) { localStorage.setItem('display_' + id, n); document.getElementById('nombre_' + id).textContent = n; }
}

function exportarCSV() {
    let csv = "Fecha,Gimnasio,Grupo,Ejercicio,Peso,Repeticiones,Notas\n";
    // CORRIGIDO: Exportando o ID original de e.ejercicio em vez da string traduzida t(e.ejercicio)
    historialEntrenamientos.forEach(e => csv += `${e.fechaISO},${e.gimnasio},${e.grupo},${e.ejercicio},${e.peso},${e.repeticiones},${e.notas || ''}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `gym_${document.getElementById('perfilUsuario').value}.csv`; a.click();
}

function importarCSV() {
    const f = document.getElementById('archivoCSV').files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = function(e) {
        e.target.result.split('\n').slice(1).forEach(l => {
            const c = l.split(',');
            if (c.length > 4) historialEntrenamientos.push({ id: Date.now()+Math.random(), fechaISO: c[0], gimnasio: c[1], grupo: c[2], ejercicio: c[3], peso: parseFloat(c[4]), repeticiones: parseInt(c[5]), notas: c[6] || '' });
        });
        localStorage.setItem(obtenerClave(), JSON.stringify(historialEntrenamientos)); actualizarPantallas();
    };
    r.readAsText(f);
}

function borrarTodo() { if (confirm("¿Borrar todo el historial de este perfil?")) { localStorage.removeItem(obtenerClave()); actualizarPantallas(); } }

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('nombre_usuario1').textContent = localStorage.getItem('display_usuario1') || 'Perfil 1';
    document.getElementById('nombre_usuario2').textContent = localStorage.getItem('display_usuario2') || 'Perfil 2';
    document.getElementById('selectorIdioma').value = localStorage.getItem('idiomaApp') || 'es';
    const d = new Date(); document.getElementById('fechaCalendario').value = d.toISOString().split('T')[0];
    cambiarIdioma();
});