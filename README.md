# Elecciones municipales
Prototipo académico del TP de Interfaz de Usuario de Micaela Zoe Moroncini.

## Ejecutar en Windows sin Visual Studio
1. Entrar en Releases del repositorio y descargar `EleccionesMunicipales-Windows-x64.zip` desde Assets.
2. Extraer TODO el ZIP en una carpeta; conservar wwwroot junto al ejecutable.
3. Abrir `EleccionesMunicipales.exe`. Se abrirá el navegador en http://127.0.0.1:5180.
4. Mantener abierta la ventana de consola. Cerrarla para apagar la aplicación.

Incluye .NET y no necesita instalarlo. Requiere Windows x64. Si el navegador no se abre solo, abrir manualmente la dirección indicada. El servidor escucha solamente en esta computadora. Si la ventana se cierra, ejecutar el EXE desde una terminal para ver el mensaje de error. No ejecutar dos copias al mismo tiempo.

GitHub Actions compila y prueba el arranque del ejecutable y la disponibilidad de sus recursos antes de publicar la descarga. Las interacciones completas y el sonido deben comprobarse en el equipo de uso.

## Abrir en Visual Studio
1. Extraer el ZIP completo.
2. Abrir `EleccionesMunicipales.sln` en Visual Studio compatible con .NET 10 y la carga de trabajo Desarrollo de ASP.NET y web.
3. Presionar Ctrl+F5. Se abre http://localhost:5180.

Alternativa con SDK .NET 10: `dotnet run --project EleccionesMunicipales.csproj`.

## Recorrido para la exposición
- Votante: comenzar, seleccionar, revisar, cambiar opción, emitir y finalizar.
- En revisión, activar la simulación de respuesta incierta. Emitir y consultar el mismo intento.
- Probar voto en blanco y el botón de revisión deshabilitado sin selección.
- Personal: buscar 30111222, 30222333 y 30333444. Habilitar, registrar incidencia y avanzar sus estados.
- Candidatos: completar y registrar una observación.
- Tribunal: revisar acta, simular diferencia o incidencia pendiente; comprobar el bloqueo. Desactivar simulaciones, revisar y confirmar la validación.
- Recorrer con Tab, usar Enter y ampliar texto. Probar una ventana angosta.

## Alcance real
Es una demostración de interfaces: no es un sistema electoral operativo. No incluye autenticación, padrón real, base de datos, registro real de votos ni controles de concurrencia. Los perfiles son pestañas de demostración y no permisos de seguridad. Los datos se conservan solamente en la memoria del componente y se pierden al recargar. La sesión privada y la habilitación del personal son simuladas, sin vincular identidad y preferencia. La descarga de auditoría es un CSV estático de ejemplo. La ayuda muestra un aviso, sin avisar a otra persona. La lectura asistida está implementada en el recorrido del votante mediante síntesis de voz del navegador; requiere una voz local en español instalada. No reemplaza un lector de pantalla como TalkBack, NVDA o Narrador.

Las cifras del tribunal son una maqueta independiente de los votos simulados. En el escenario incierto, la consulta confirma siempre el mismo intento ficticio; no se consulta ningún servidor electoral. La prevención de duplicaciones es solo de interfaz y debe implementarse también en un backend si el proyecto evoluciona.

## Lectura en voz alta con auriculares
1. Conectar auriculares y comprobar la salida de audio del sistema antes de seleccionar una candidatura.
2. Marcar la confirmación y pulsar Activar lectura en voz alta.
3. Se leen las instrucciones de cada pantalla y la selección actual. Tab permite enfocar y escuchar controles.
4. Usar Repetir pantalla o Detener lectura cuando sea necesario.
5. Antes de desconectar los auriculares, detener la lectura. El navegador no puede garantizar que no se reproduzca por altavoces si cambia la salida.
6. Al finalizar la sesión o cambiar de perfil, el audio se desactiva y la confirmación se borra. Al ocultar la pestaña se cancela la locución en curso.

Solo se eligen voces locales en español para evitar usar voces remotas con la selección. Si no hay una disponible, se muestra un mensaje; instalar una voz en español en el equipo y volver a abrir el navegador. El idioma y la pronunciación dependen de las voces del sistema. No se guarda la preferencia ni se generan archivos de audio.

Verificación manual pendiente en el equipo de exposición: escuchar instrucciones y selección; repetir; detener; desmarcar auriculares durante lectura; finalizar; cambiar de perfil; probar con teclado y con un lector de pantalla externo desactivando la lectura propia para evitar dos voces.