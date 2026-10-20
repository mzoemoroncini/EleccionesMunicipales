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
- La aplicación abre en Personal electoral, en Verificar votante, siguiendo la pantalla del Word.
- Buscar 30111222 o 30444555 (habilitados), confirmar la identidad con la casilla y pulsar Habilitar sesión privada.
- La pantalla del votante se abre automáticamente sin mostrar el DNI. Elegir, revisar, cambiar selección y emitir.
- Sin habilitación no se permite comenzar, revisar ni emitir. Cambiar de perfil queda bloqueado durante la sesión privada.
- Finalizar y seleccionar Verificar próximo votante. Buscar el mismo DNI: queda como ya votó, sin nueva habilitación.
- 30222333 ya votó; 30333444 pertenece a otra mesa; un documento desconocido no figura en el padrón.
- Cambiar el DNI después de buscar invalida la verificación y exige una nueva búsqueda.
- En la revisión, desplegar Opciones para la demostración y simular respuesta incierta. Consultar el mismo intento antes de continuar.
- Desde Personal electoral, Registrar incidencia abre una pantalla separada para registrar y seguir estados.
- En el pie se puede cambiar a Candidatos o Tribunal cuando no hay sesión privada activa. Las opciones de simulación están plegadas.
- Candidatos: registrar una observación y consultar su detalle. Tribunal: revisar acta, simular diferencia o incidencia pendiente, comprobar bloqueo y validar al resolver las simulaciones.
- Recorrer con Tab, usar Enter, ampliar texto y probar una ventana angosta.

## Alcance real
Es una demostración de interfaces, sin autenticación ni base de datos. El padrón, la confirmación manual de identidad y la habilitación son ficticios. El estado de participación se mantiene en el servidor en la memoria del componente durante esta sesión de demostración; se reinicia al recargar o abrir otra sesión del navegador. No garantiza unicidad entre terminales ni continuidad tras un reinicio. Las candidaturas no se guardan asociadas a documentos. No se registra un voto electoral real.

Las cifras de Tribunal son ejemplos independientes de las emisiones simuladas. La auditoría descargable es un CSV estático y el pedido de ayuda solo muestra un aviso. La respuesta incierta confirma siempre el mismo intento ficticio. Los perfiles del pie son controles para exponer, no permisos de seguridad. La lectura asistida requiere una voz local en español instalada y no reemplaza TalkBack, NVDA ni Narrador.

## Lectura en voz alta con auriculares
1. Conectar auriculares y comprobar la salida de audio del sistema antes de seleccionar una candidatura.
2. Marcar la confirmación y pulsar Activar lectura en voz alta.
3. Se leen las instrucciones de cada pantalla y la selección actual. Tab permite enfocar y escuchar controles.
4. Usar Repetir pantalla o Detener lectura cuando sea necesario.
5. Antes de desconectar los auriculares, detener la lectura. El navegador no puede garantizar que no se reproduzca por altavoces si cambia la salida.
6. Al finalizar la sesión o cambiar de perfil, el audio se desactiva y la confirmación se borra. Al ocultar la pestaña se cancela la locución en curso.

Solo se eligen voces locales en español para evitar usar voces remotas con la selección. Si no hay una disponible, se muestra un mensaje; instalar una voz en español en el equipo y volver a abrir el navegador. El idioma y la pronunciación dependen de las voces del sistema. No se guarda la preferencia ni se generan archivos de audio.

Verificación manual pendiente en el equipo de exposición: escuchar instrucciones y selección; repetir; detener; desmarcar auriculares durante lectura; finalizar; cambiar de perfil; probar con teclado y con un lector de pantalla externo desactivando la lectura propia para evitar dos voces.
