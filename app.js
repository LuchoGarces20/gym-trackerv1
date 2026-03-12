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
        perfil: "👤 Perfil:", gym: "📍 Gimnasio:", registrar: "Log Set", guardar: "Guardar Entrenamiento",
        cal_tit: "📅 Mi Calendario", rec_tit: "🏆 Mejores Récords", todos: "💪 Todos los grupos",
        dat_tit: "💾 Datos", exp: "Exportar CSV", imp_btn: "Importar CSV", del_btn: "Borrar Datos del Perfil",
        ph_peso: "Peso (kg)", ph_reps: "Repeticiones", msg_sin_cal: "No hay registros hoy.",
        msg_sin_rec: "Sin récords aún.", msg_ultimo: "Última vez:", msg_sin_ultimo: "Sin registros previos.",
        txt_serie: "Serie", txt_record: "Récord", txt_faltan: "¡Faltan datos!",
        grafico_tit: "📈 Progreso", grafico_label: "Peso Máximo (kg)",
        g_peito: "Pecho", g_costas: "Espalda", g_biceps: "Bíceps", g_triceps: "Tríceps", g_ombro: "Hombros", g_perna_front: "Pierna (Front)", g_perna_post: "Pierna (Post)",
        e_supino_reto: "Press plano", e_supino_inc: "Press inclinado", e_flys: "Aperturas",
        e_puxada: "Jalón al pecho", e_remada_sentada: "Remo sentado", e_remada_pe: "Remo al mentón",
        e_curl_normal: "Curl bíceps", e_curl_martelo: "Martillo", e_skullcrusher: "Rompecráneos", e_polia: "Polea tríceps",
        e_elev_lateral: "Lateral", e_elev_frontal: "Frontal", e_elev_posterior: "Pájaros", e_press_militar: "Militar",
        e_agachamento_smith: "Sentadilla Smith", e_extensora: "Extensora", e_sumo: "Sumo", e_abdutora: "Abdutora",
        e_stiff: "Stiff", e_flexora: "Flexora", e_panturrilha: "Pantorrilla", e_leg_press: "Leg Press"
    },
    pt: {
        perfil: "👤 Perfil:", gym: "📍 Academia:", registrar: "Treino", guardar: "Salvar Treino",
        cal_tit: "📅 Meu Calendário", rec_tit: "🏆 Recordes", todos: "💪 Todos os grupos",
        dat_tit: "💾 Dados", exp: "Exportar CSV", imp_btn: "Importar CSV", del_btn: "Apagar Dados",
        ph_peso: "Peso (kg)", ph_reps: "Repetições", msg_sin_cal: "Sem treinos hoje.",
        msg_sin_rec: "Sem recordes.", msg_ultimo: "Última vez:", msg_sin_ultimo: "Sem registros anteriores.",
        txt_serie: "Série", txt_record: "Recorde", txt_faltan: "Preencha tudo!",
        grafico_tit: "📈 Análise", grafico_label: "Peso Máximo (kg)",
        g_peito: "Peito", g_costas: "Costas", g_biceps: "Bíceps", g_triceps: "Tríceps", g_ombro: "Ombros", g_perna_front: "Perna Front", g_perna_post: "Perna Post",
        e_supino_reto: "Supino reto", e_supino_inc: "Supino inc", e_flys: "Crucifixo",
        e_puxada: "Puxada", e_remada_sentada: "Remada sentada", e_remada_pe: "Remada em pé",
        e_curl_normal: "Rosca direta", e_curl_martelo: "Rosca martelo", e_skullcrusher: "Tríceps testa", e_polia: "Polia",
        e_elev_lateral: "Lateral", e_elev_frontal: "Frontal", e_elev_posterior: "Posterior", e_press_militar: "Desenvolvimento",
        e_agachamento_smith: "Agachamento Smith", e_extensora: "Extensora", e_sumo: "Sumô", e_abdutora: "Abdutora",
        e_stiff: "Stiff", e_flexora: "Flexora", e_panturrilha: "Panturrilha", e_leg_press: "Leg press"
    },
    en: {
        perfil: "👤 Profile:", gym: "📍 Gym:", registrar: "Log Set", guardar: "Save Set",
        cal_tit: "📅 Calendar", rec_tit: "🏆 Personal Bests", todos: "💪 All groups",
        dat_tit: "💾 Data Management", exp: "Export CSV", imp_btn: "Import CSV", del_btn: "Delete All Data",
        ph_peso: "Weight (kg)", ph_reps: "Reps", msg_sin_cal: "No logs today.",
        msg_sin_rec: "No records yet.", msg_ultimo: "Last time:", msg_sin_ultimo: "No previous logs.",
        txt_serie: "Set", txt_record: "Record", txt_faltan: "Fill all fields!",
        grafico_tit: "📈 Analytics", grafico_label: "Max Weight (kg)",
        g_peito: "Chest", g_costas: "Back", g_biceps: "Biceps", g_triceps: "Triceps", g_ombro: "Shoulders", g_perna_front: "Quads", g_perna_post: "Hamstrings",
        e_supino_reto: "Flat Bench", e_supino_inc: "Incline Bench", e_flys: "Chest Flys",
        e_puxada: "Lat Pulldown", e_remada_sentada: "Seated Row", e_remada_pe: "Upright Row",
        e_curl_normal: "Bicep Curl", e_curl_martelo: "Hammer Curl", e_skullcrusher: "Skullcrusher", e_polia: "Triceps Pushdown",
        e_elev_lateral: "Lateral Raise", e_elev_frontal: "Front Raise", e_elev_posterior: "Rear Delt", e_press_militar: "Shoulder Press",
        e_agachamento_smith: "Smith Squat", e_extensora: "Leg Extension", e_sumo: "Sumo Squat", e_abdutora: "Hip Abductor",
        e_stiff: "RDL Stiff", e_flexora: "Leg Curl", e_panturrilha: "Calf Raise", e_leg_press: "Leg Press"
    }
};

function getLang() { return document.getElementById('selectorIdioma').value; }
function t(clave) { return diccionarioIdiomas[getLang()][clave] || clave; }

function construirListas() {
    const lang = getLang();
    const sels = [document.getElementById('ejercicioSelect'), document.getElementById('ejercicioGrafico')];
    const selectFiltro = document.getElementById('filtroGrupo');
    
    sels.forEach(s => s.innerHTML = '');
    selectFiltro.innerHTML = `<option value="Todos">${t('todos')}</option>`;

    for (const grupoId in estructuraEjercicios) {
        selectFiltro.innerHTML += `<option value="${grupoId}">${t(grupoId)}</option>`;
        sels.forEach(s => {
            let group = document.createElement('optgroup');
            group.label = t(grupoId);
            estructuraEjercicios[grupoId].forEach(ej => {
                let opt = document.createElement('option');
                opt.value = ej;
                opt.textContent = t(ej);
                opt.setAttribute('data-grupo', grupoId);
                group.appendChild(opt);
            });
            s.appendChild(group);
        });
    }
}

function cambiarIdioma() {
    localStorage.setItem('idiomaApp', getLang());
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.tagName === 'INPUT') el.placeholder = t(key);
        else el.textContent = t(key);
    });
    construirListas();
    actualizarPantallas();
}

function obtenerClave() { return 'gym_v2_' + document.getElementById('perfilUsuario').value; }

function actualizarPantallas() {
    const datos = localStorage.getItem(obtenerClave());
    historialEntrenamientos = datos ? JSON.parse(datos) : [];
    mostrarUltimoEntreno();
    mostrarHistorialPorFecha();
    mostrarMejoresEsfuerzos();
    renderizarGrafico();
}

function guardarEntrenamiento() {
    const ej = document.getElementById('ejercicioSelect');
    const peso = document.getElementById('peso').value;
    const reps = document.getElementById('repeticiones').value;
    if (!peso || !reps) return alert(t('txt_faltan'));

    const entreno = {
        id: Date.now(),
        fechaISO: new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0],
        gimnasio: document.getElementById('gimnasioActual').value,
        grupo: ej.options[ej.selectedIndex].getAttribute('data-grupo'),
        ejercicio: ej.value,
        peso: parseFloat(peso),
        repeticiones: parseInt(reps)
    };

    historialEntrenamientos.push(entreno);
    localStorage.setItem(obtenerClave(), JSON.stringify(historialEntrenamientos));
    document.getElementById('peso').value = '';
    document.getElementById('repeticiones').value = '';
    actualizarPantallas();
}

function renderizarGrafico() {
    const ej = document.getElementById('ejercicioGrafico').value;
    const gym = document.getElementById('gimnasioActual').value;
    const ctx = document.getElementById('graficoProgreso').getContext('2d');

    if (graficoInstancia) graficoInstancia.destroy();

    const filtrados = historialEntrenamientos.filter(e => e.ejercicio === ej && e.gimnasio === gym);
    const maximos = {};
    filtrados.forEach(e => {
        if (!maximos[e.fechaISO] || e.peso > maximos[e.fechaISO]) maximos[e.fechaISO] = e.peso;
    });

    const fechas = Object.keys(maximos).sort();
    graficoInstancia = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas.map(f => f.split('-').reverse().slice(0,2).join('/')),
            datasets: [{
                label: t('grafico_label'),
                data: fechas.map(f => maximos[f]),
                borderColor: '#007AFF',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

function mostrarUltimoEntreno() {
    const ej = document.getElementById('ejercicioSelect').value;
    const gym = document.getElementById('gimnasioActual').value;
    const filtrados = historialEntrenamientos.filter(e => e.ejercicio === ej && e.gimnasio === gym).sort((a,b) => b.id - a.id);
    const div = document.getElementById('ultimoEntrenoInfo');
    if (filtrados.length) div.textContent = `${t('msg_ultimo')} ${filtrados[0].peso}kg x ${filtrados[0].repeticiones}`;
    else div.textContent = t('msg_sin_ultimo');
}

function mostrarHistorialPorFecha() {
    const fecha = document.getElementById('fechaCalendario').value;
    const gym = document.getElementById('gimnasioActual').value;
    const div = document.getElementById('calendario-container');
    div.innerHTML = '';
    const hoy = historialEntrenamientos.filter(e => e.fechaISO === fecha && e.gimnasio === gym);
    if (!hoy.length) return div.innerHTML = `<p style="color:#8E8E93">${t('msg_sin_cal')}</p>`;
    hoy.forEach(e => {
        div.innerHTML += `<div class="registro"><span class="etiqueta-grupo">${t(e.grupo)}</span><br><strong>${t(e.ejercicio)}</strong>: ${e.peso}kg x ${e.repeticiones}</div>`;
    });
}

function mostrarMejoresEsfuerzos() {
    const gym = document.getElementById('gimnasioActual').value;
    const filtro = document.getElementById('filtroGrupo').value;
    const div = document.getElementById('historial-container');
    div.innerHTML = '';
    const records = {};
    historialEntrenamientos.filter(e => e.gimnasio === gym && (filtro === 'Todos' || e.grupo === filtro)).forEach(e => {
        if (!records[e.ejercicio] || e.peso > records[e.ejercicio].peso) records[e.ejercicio] = e;
    });
    Object.values(records).forEach(e => {
        div.innerHTML += `<div class="registro"><strong>${t(e.ejercicio)}</strong><br>🏆 ${e.peso}kg x ${e.repeticiones}</div>`;
    });
}

function cambiarPerfil() { actualizarPantallas(); }
function renombrarPerfil() {
    const id = document.getElementById('perfilUsuario').value;
    const nuevo = prompt(t('perfil'), document.getElementById('nombre_' + id).textContent);
    if (nuevo) {
        localStorage.setItem('display_' + id, nuevo);
        document.getElementById('nombre_' + id).textContent = nuevo;
    }
}

function exportarCSV() {
    let csv = "Fecha,Gimnasio,Grupo,Ejercicio,Peso,Repeticiones\n";
    historialEntrenamientos.forEach(e => csv += `${e.fechaISO},${e.gimnasio},${e.grupo},${e.ejercicio},${e.peso},${e.repeticiones}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'gym_data.csv'; a.click();
}

function importarCSV() {
    const file = document.getElementById('archivoCSV').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const lineas = e.target.result.split('\n').slice(1);
        lineas.forEach(l => {
            const c = l.split(',');
            if (c.length > 4) historialEntrenamientos.push({ id: Date.now()+Math.random(), fechaISO: c[0], gimnasio: c[1], grupo: c[2], ejercicio: c[3], peso: parseFloat(c[4]), repeticiones: parseInt(c[5]) });
        });
        localStorage.setItem(obtenerClave(), JSON.stringify(historialEntrenamientos));
        actualizarPantallas();
    };
    reader.readAsText(file);
}

function borrarTodo() { if (confirm("¿Seguro?")) { localStorage.removeItem(obtenerClave()); actualizarPantallas(); } }

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('nombre_usuario1').textContent = localStorage.getItem('display_usuario1') || 'Perfil 1';
    document.getElementById('nombre_usuario2').textContent = localStorage.getItem('display_usuario2') || 'Perfil 2';
    document.getElementById('selectorIdioma').value = localStorage.getItem('idiomaApp') || 'es';
    const hoy = new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    document.getElementById('fechaCalendario').value = hoy;
    cambiarIdioma();
});