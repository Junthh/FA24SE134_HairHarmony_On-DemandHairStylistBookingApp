using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace hair_hamony.API.Middleware.ErrorHandling
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ErrorHandler _errorHandler = new();

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            ErrorResponse? errorResponse = exception is CException
                ? _errorHandler.HandlerError(exception)
                : _errorHandler.UnhandlerError(exception);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = errorResponse == null ? 500 : errorResponse.StatusCode;

            await context.Response.WriteAsync(JsonConvert.SerializeObject(errorResponse, new JsonSerializerSettings()
            {
                NullValueHandling = NullValueHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
            }));
        }
    }
}
