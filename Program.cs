using System.Diagnostics;
using EleccionesMunicipales.Components;

var desktop = OperatingSystem.IsWindows() &&
    !string.Equals(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"), "Development", StringComparison.OrdinalIgnoreCase);
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    ContentRootPath = desktop ? AppContext.BaseDirectory : Directory.GetCurrentDirectory()
});
if (desktop) builder.WebHost.UseUrls("http://127.0.0.1:5180");
builder.Services.AddRazorComponents().AddInteractiveServerComponents();
var app = builder.Build();
app.UseStaticFiles();
app.UseAntiforgery();
app.MapRazorComponents<App>().AddInteractiveServerRenderMode();
if (desktop)
{
    Console.WriteLine("Elecciones municipales: mantené esta ventana abierta mientras usás la aplicación.");
    Console.WriteLine("Si el navegador no se abre, ingresá a http://127.0.0.1:5180. Para salir, cerrá esta ventana.");
    if (!args.Contains("--smoke-test"))
        app.Lifetime.ApplicationStarted.Register(() =>
        {
            try { Process.Start(new ProcessStartInfo("http://127.0.0.1:5180") { UseShellExecute = true }); }
            catch (Exception) { Console.WriteLine("Abrí tu navegador en http://127.0.0.1:5180."); }
        });
}
app.Run();
