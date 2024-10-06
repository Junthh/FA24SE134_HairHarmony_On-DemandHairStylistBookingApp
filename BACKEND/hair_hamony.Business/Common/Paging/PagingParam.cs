using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Converters;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace hair_hamony.Business.Commons.Paging
{
    public class PagingParam<T> where T : System.Enum
    {
        private int _pageIndex = PagingConstant.FixedPagingConstant.DefaultPageIndex;

        [FromQuery(Name = "pageIndex")]
        public int PageIndex
        {
            get => _pageIndex;
            set => _pageIndex = value;
        }

        [FromQuery(Name = "pageSize")]
        [DefaultValue(PagingConstant.FixedPagingConstant.DefaultPageSize)]
        public int? PageSize { get; set; }

        [FromQuery(Name = "sortKey")]
        public T? SortKey { get; set; }

        [FromQuery(Name = "sortOrder")]
        [EnumDataType(typeof(PagingConstant.OrderCriteria))]
        [JsonConverter(typeof(StringEnumConverter))]
        public PagingConstant.OrderCriteria SortOrder { get; set; }
    }
}
