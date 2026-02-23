# QuizGameApp

QuizGameApp es una aplicación web que permite realizar quizzes personalizados a partir de archivos JSON o PDF. Puedes subir tus propias preguntas en formato JSON o un archivo PDF del cual se generarán preguntas automáticamente.

## ¿Cómo funciona el sistema?

1. **Subida de archivo:**
	 - Puedes subir un archivo `.json` o `.pdf` usando el formulario principal.
	 - Si subes un **JSON**, el sistema lo lee directamente y utiliza las preguntas para el quiz.
	 - Si subes un **PDF**, el sistema enviará el archivo a un backend (requiere estar corriendo en `localhost:8000`) que extrae el contenido y genera preguntas automáticamente según el tema especificado.

2. **Formato del archivo JSON**

El archivo JSON debe tener el siguiente formato:

```
[
	{
		"question": "¿Cuál es la capital de Francia?",
		"answers": [
			{ "text": "Londres", "correct": false },
			{ "text": "Berlín", "correct": false },
			{ "text": "París", "correct": true },
			{ "text": "Madrid", "correct": false }
		]
	},
	...
]
```
- Cada objeto representa una pregunta.
- El campo `question` es el texto de la pregunta.
- El campo `answers` es un array de opciones, cada una con `text` (texto de la respuesta) y `correct` (true si es la respuesta correcta, false si no).

3. **Subida de PDF**
	 - Al subir un PDF, debes especificar el tema del quiz para obtener mejores resultados.
	 - El backend procesará el PDF y devolverá un JSON con preguntas generadas automáticamente.
	 - El quiz se genera en base a ese contenido.

4. **Flujo general del sistema**
	 - El usuario sube un archivo y comienza el quiz.
	 - Se muestran las preguntas una a una, con opciones de respuesta.
	 - Al finalizar, se muestra el puntaje y un mensaje según el desempeño.
	 - Puedes reiniciar el quiz o cargar uno nuevo.

## Requisitos
- Navegador web moderno.
- Para usar PDFs, necesitas tener un backend corriendo en `localhost:8000` que procese el PDF y genere preguntas.

## Notas adicionales
- Si el archivo JSON no tiene el formato correcto, el sistema mostrará un error.
- El campo de tema solo es obligatorio al subir PDF.
- El sistema es completamente frontend salvo el procesamiento de PDF, que requiere backend.

---

¡Disfruta creando y resolviendo quizzes personalizados!
