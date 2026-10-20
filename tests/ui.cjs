const {chromium}=require('playwright');
const {spawn}=require('child_process');const assert=require('assert');
(async()=>{
 const server=spawn(require('path').resolve('dist/EleccionesMunicipales.exe'),['--smoke-test'],{env:{...process.env,ASPNETCORE_ENVIRONMENT:'Production'},stdio:['ignore','pipe','pipe']});
 require('fs').mkdirSync('ui-checks',{recursive:true});
 let browser;try{
  for(let i=0;i<50;i++){try{if((await fetch('http://127.0.0.1:5180')).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}
  browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage({viewport:{width:1400,height:900}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5180');await page.waitForTimeout(1200);
  await page.screenshot({path:'ui-checks/election-personal.png',fullPage:true});
  async function profile(name){await page.locator('.profile-switcher').evaluate(e=>e.open=true);await page.getByRole('navigation').getByRole('button',{name,exact:true}).click()}
  await profile('Votante');assert(await page.getByRole('button',{name:'Comenzar a votar',exact:true}).isDisabled());
  await profile('Personal electoral');
  async function search(dni){await page.getByLabel('Documento',{exact:true}).fill(dni);await page.getByRole('button',{name:'Buscar en padrón'}).click()}
  await search('30222333');await page.getByText('Voto ya registrado.',{exact:false}).waitFor();assert(await page.getByRole('button',{name:'Habilitar sesión privada',exact:true}).isDisabled());
  await search('30333444');await page.getByText('Corresponde a mesa 18.',{exact:false}).waitFor();assert(await page.getByRole('button',{name:'Habilitar sesión privada',exact:true}).isDisabled());
  await search('30111222');await page.getByLabel('Verifiqué que la identidad').waitFor();assert(await page.getByRole('button',{name:'Habilitar sesión privada',exact:true}).isDisabled());
  await page.getByLabel('Verifiqué que la identidad').check();
  await page.getByLabel('Documento',{exact:true}).fill('30444555');await page.waitForTimeout(200);assert(await page.getByRole('button',{name:'Habilitar sesión privada',exact:true}).isDisabled());
  await search('30111222');await page.getByLabel('Verifiqué que la identidad').check();await page.getByRole('button',{name:'Habilitar sesión privada',exact:true}).click();await page.getByRole('heading',{name:'Votar para intendente',exact:true}).waitFor();
  assert(!(await page.locator('body').innerText()).includes('30111222'));await page.screenshot({path:'ui-checks/election-start.png',fullPage:true});
  await page.getByRole('button',{name:'Comenzar a votar',exact:true}).click();assert(await page.getByRole('button',{name:'Revisar selección',exact:true}).isDisabled());await page.getByRole('radio').nth(1).click();await page.screenshot({path:'ui-checks/election-selection.png',fullPage:true});
  await page.getByRole('button',{name:'Revisar selección',exact:true}).click();await page.getByRole('heading',{name:'Revisá tu selección',exact:true}).waitFor();await page.screenshot({path:'ui-checks/election-review.png',fullPage:true});
  await page.getByRole('button',{name:'Cambiar selección',exact:true}).click();await page.getByRole('radio').nth(2).click();await page.getByRole('button',{name:'Revisar selección',exact:true}).click();
  await page.getByText('Opciones para la demostración',{exact:true}).click();await page.getByLabel('Simular respuesta incierta').check();await page.getByRole('button',{name:'Emitir voto',exact:true}).click();await page.getByRole('heading',{name:'Estamos verificando tu voto',exact:true}).waitFor();
  await page.getByRole('button',{name:'Consultar estado',exact:true}).click();await page.getByRole('heading',{name:'Tu voto fue registrado',exact:true}).waitFor();assert(!(await page.locator('body').innerText()).includes('Voto en blanco'));await page.getByRole('button',{name:'Finalizar y salir',exact:true}).click();await page.getByRole('button',{name:'Verificar próximo votante',exact:true}).click();await search('30111222');await page.getByText('Voto ya registrado.',{exact:false}).waitFor();assert(await page.getByRole('button',{name:'Habilitar sesión privada',exact:true}).isDisabled());
  await page.getByRole('button',{name:'Registrar incidencia',exact:true}).click();await page.getByLabel('Tipo',{exact:true}).selectOption('Falla de terminal');await page.getByLabel('Terminal',{exact:true}).fill('T04');await page.getByLabel('Descripción',{exact:true}).fill('Prueba de interfaz');await page.getByRole('button',{name:'Guardar incidencia',exact:true}).click();await page.getByText('INC-001 · T04',{exact:true}).waitFor();
  await profile('Candidatos');await page.screenshot({path:'ui-checks/election-candidates.png',fullPage:true});await page.getByRole('button',{name:'Registrar observación',exact:true}).click();await page.getByLabel('Categoría',{exact:true}).selectOption('Accesibilidad');await page.getByLabel('Descripción',{exact:true}).fill('Revisar acceso');await page.getByRole('button',{name:'Guardar observación',exact:true}).click();await page.getByText('OBS 001',{exact:true}).waitFor();
  await profile('Tribunal');await page.screenshot({path:'ui-checks/election-tribunal.png',fullPage:true});await page.getByRole('button',{name:'Revisar acta',exact:true}).click();await page.getByText('Opciones para la demostración',{exact:true}).click();await page.getByLabel('Simular diferencia en el acta').check();assert(await page.getByRole('button',{name:'Validar acta de mesa',exact:true}).isDisabled());await page.getByLabel('Simular diferencia en el acta').uncheck();await page.getByRole('button',{name:'Validar acta de mesa',exact:true}).click();await page.getByRole('button',{name:'Confirmar validación',exact:true}).click();await page.getByRole('button',{name:'Acta validada',exact:true}).waitFor();
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'ui-checks/election-mobile.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);console.log('OK: gate por DNI, identidad obligatoria, invalidación al cambiar DNI, selección, corrección, respuesta incierta, emisión única, privacidad, incidencias, observaciones, bloqueo acta y diseño móvil.');
 }finally{await browser?.close();server.kill()}
})().catch(e=>{console.error(e);process.exit(1)});
