using Asp.Versioning;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace hair_hamony.API.Configurations;
public static class SwaggerConfig
{
    public static void RegisterSwaggerModule(this IServiceCollection services)
    {
        services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1, 0);
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ReportApiVersions = true;
        }).AddApiExplorer(options =>
        {
            options.GroupNameFormat = "'v'VVV";
            options.SubstituteApiVersionInUrl = true;
        });

        services.AddSwaggerGen(c =>
        {
            // Set Description Swagger
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "HairHamony.API",
                Version = "v1",
                Description = "HairHamony.API Endpoints",
            });

            c.DescribeAllParametersInCamelCase();
            // Set the comments path for the Swagger JSON and UI.
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);

            // Set Authorize box to swagger
            var jwtSecuriyScheme = new OpenApiSecurityScheme
            {
                Scheme = "bearer",
                BearerFormat = "JWT",
                Name = "JWT Authentication",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Description = "Put **_ONLY_** your token on textbox below!",
                Reference = new OpenApiReference
                {
                    Id = JwtBearerDefaults.AuthenticationScheme,
                    Type = ReferenceType.SecurityScheme
                }
            };
            c.AddSecurityDefinition(jwtSecuriyScheme.Reference.Id, jwtSecuriyScheme);
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {jwtSecuriyScheme, Array.Empty<string>()}
            });

            c.MapType<DateOnly>(() => new OpenApiSchema { Type = "string", Format = "date" });
            c.MapType<TimeOnly>(() => new OpenApiSchema { Type = "string", Format = "date-time" });
        });

        services.AddEndpointsApiExplorer();

        services.AddSwaggerGenNewtonsoftSupport();
    }

    public static IApplicationBuilder UseApplicationSwagger(this IApplicationBuilder app)
    {
        app.UseSwagger(c =>
        {
            c.RouteTemplate = "{documentName}/api-docs";
        });
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/v1/api-docs", "HairHamony.API v1");
            c.RoutePrefix = string.Empty;
        });

        return app;
    }
}