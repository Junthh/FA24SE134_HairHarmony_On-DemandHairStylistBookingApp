namespace hair_hamony.Business.Utilities.ErrorHandling
{
    public class CException : Exception
    {
        public string? ErrorMessage { get; set; }
        public int StatusCode { get; set; }
    }
}
