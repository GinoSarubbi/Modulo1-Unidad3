class Tarea {
  constructor(id, titulo, completada = false) {
    this.id = id;
    this.titulo = titulo;
    this.completada = completada;
  }

  toggleEstado() {
    this.completada = !this.completada;
  }
}

class GestorTareas {
  constructor() {
    this.tareas = [];
  }

  agregarTarea(titulo) {
    const id = this.tareas.length + 1;
    const nuevaTarea = new Tarea(id, titulo);

    this.tareas.push(nuevaTarea);
  }

  listarTareas() {
    this.tareas.forEach((tarea) => {
      console.log(`${tarea.id} Tarea: ${tarea.titulo} - Hecho: ${tarea.completada}`);
    });
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find((tarea) => tarea.titulo === titulo);
  }

  listarCompletadas() {
    return this.tareas.filter((tarea) => tarea.completada);
  }
}

/*
*
voy a creaer una clase usuarios con una funcionalidad de listar Usuarios para que al menos tenga alguna funcion
y se pueda listar pos consola el resultado
*
*/

class Usuario {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }
}

class GestorUsuarios {
  constructor() {
    this.usuarios = [];
  }

  listarUsuarios() {
    this.usuarios.forEach((usuario) => {
      console.log(`${usuario.id} Usuario: ${usuario.nombre}`);
    });
  }
}

function cargarTareas() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = true;

      if (ok) {
        resolve([
          new Tarea(1, "Comprar leche", true),
          new Tarea(2, "Lavar el coche"),
          new Tarea(3, "Estudiar JavaScript", true),
        ]);
      } else {
        reject("Error al cargar las tareas");
      }
    }, 2000);
  });
}

function cargarUsuarios() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = true;

      if (ok) {
        resolve([
          new Usuario(1, "gsarubbi"),
          new Usuario(2, "floricienta"),
          new Usuario(3, "dymont"),
        ]);
      } else {
        reject("Error al cargar los usuarios");
      }
    }, 2000);
  });
}

async function iniciarApp() {
  try {
    const gestor = new GestorTareas();
    const gestorUsuarios = new GestorUsuarios();

    const [tareas, usuarios] = await Promise.all([
      cargarTareas(),
      cargarUsuarios()
    ]);

    gestor.tareas = tareas;
    gestorUsuarios.usuarios = usuarios;

    console.log("------------------------Todo cargado correctamente------------------------");

    console.log("------------------------Tareas cargadas correctamente:------------------------");
    gestor.listarTareas();

    console.log("------------------------Usuarios cargados correctamente:------------------------");
    gestorUsuarios.listarUsuarios();

    console.log("------------------------Agregando Tarea------------------------");
    gestor.agregarTarea("Hacer ejercicio");

    console.log("------------------------Lista actualizada:------------------------");
    gestor.listarTareas();

    console.log("------------------------Tareas completadas:------------------------");
    const tareasCompletadas = gestor.listarCompletadas();

    tareasCompletadas.forEach((tarea) => {
      console.log(`${tarea.id} - Tarea: ${tarea.titulo} - Hecho: ${tarea.completada}`);
    });

    console.log("------------------------Mostrar títulos de las tareas:------------------------");

    const titulos = gestor.tareas.map((tarea) => `Título: ${tarea.titulo}`);

    console.log(titulos.join("\n"));

    console.log("------------------------buscando tarea------------------------")
    const tareaEncontrada = gestor.buscarPorTitulo("Estudiar JavaScript");
    console.log(tareaEncontrada);

  } catch (error) {
    console.error(error);
  }
}

iniciarApp();