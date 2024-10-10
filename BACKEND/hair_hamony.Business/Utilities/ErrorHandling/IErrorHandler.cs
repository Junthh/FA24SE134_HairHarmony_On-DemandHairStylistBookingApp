using hair_hamony.Business.ViewModels;

namespace hair_hamony.Business.Utilities.ErrorHandling
{
    public interface IErrorHandler
    {
        ErrorResponse? HandlerError(Exception exception);
        ErrorResponse? UnhandlerError(Exception exception);
    }
}
