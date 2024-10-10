namespace hair_hamony.Business.Utilities
{
    public class UtilitiesHelper
    {
        public static string FormatCurrency(double currency)
        {
            string formatCurrency = currency.ToString("C", System.Globalization.CultureInfo.GetCultureInfo("vi-VN"));
            string[] splitCurrency = formatCurrency.Split(" ");
            return splitCurrency[0];
        }
    }
}
