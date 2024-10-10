namespace hair_hamony.Business.Commons.Paging
{
    public static class PagingHelper
    {

        public static IEnumerable<TObject> GetWithPaging<TObject>(this IEnumerable<TObject> source, int pageIndex, int? pageSize)
            where TObject : class
        {
            if (source == null)
            {
                return Enumerable.Empty<TObject>();
            }
            if(pageSize == null)
            {
                return source;
            }

            pageSize = pageSize < 1 ? 1 : pageSize;
            pageIndex = pageIndex < 1 ? 1 : pageIndex;

            source = source
                .Skip((int)(pageIndex == 1 ? 0 : pageSize * (pageIndex - 1))) // Paging
                .Take((int)pageSize); // Take only a number of items

            return source;
        }
    }
}
