using API.Data;
using API.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddIdentityServices(builder.Configuration);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var serverVersion = new MySqlServerVersion(new Version(8, 0, 30));

builder.Services.AddAplicationServices(builder.Configuration);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();




var app = builder.Build();

//seeding test data into database
// SeedDatabase();

// void SeedDatabase()
// {
//    using (var scope = app.Services.CreateScope())
//        try
//        {
//            var scopedContext = scope.ServiceProvider.GetRequiredService<DataContext>();
//            Seeder.Initialize(scopedContext);
//        }
//        catch
//        {
//            throw;
//        }
// }


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(
    policy => policy.AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins("https://localhost:4200")
        .WithOrigins("https://localhost:5001"));
}else{
    app.UseCors(
    policy => policy.AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins("https://localhost:4200")
        .WithOrigins("https://localhost:5001"));
}

app.UseExceptionMiddlewareExtensions(app.Logger, app.Environment);



app.UseHttpsRedirection();

// app.UseCors(
//     policy => policy.AllowAnyHeader()
//     .AllowAnyMethod()
//     .WithOrigins("https://localhost:4200")
//     .WithOrigins("https://localhost:5001"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");
app.UseStaticFiles();
//if (!app.Environment.IsDevelopment())
//{
//    app.UseSpaStaticFiles();
//}

//app.UseSpa(spa =>
//{
//    // To learn more about options for serving an Angular SPA from ASP.NET Core,
//    // see https://go.microsoft.com/fwlink/?linkid=864501

//    spa.Options.SourcePath = "ClientApp";

//    if (app.Environment.IsDevelopment())
//    {
//        spa.UseAngularCliServer(npmScript: "start");
//         spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
//    }
//});

app.Run();

