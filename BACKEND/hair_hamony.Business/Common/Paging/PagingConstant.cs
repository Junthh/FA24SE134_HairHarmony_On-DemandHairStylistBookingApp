namespace hair_hamony.Business.Commons.Paging
{
    public static class PagingConstant
    {
        public static class FixedPagingConstant
        {
            public const int DefaultPageIndex = 1;
            public const int DefaultPageSize = 50;
        }

        public enum OrderCriteria
        {
            DESC,
            ASC,
        }
    }
}
