using AutoMapper.Internal;
using System.Linq.Expressions;

namespace hair_hamony.Business.Commons
{
    public static class SearchHelper
    {
        public static IQueryable<TEntity> GetWithSearch<TEntity>(this IQueryable<TEntity> query, object searchModel) where TEntity : class
        {
            foreach (var prop in searchModel.GetType().GetProperties())
            {
                var value = prop.GetValue(searchModel, null);
                if (value is string)
                {
                    if ((string)value! is { Length: > 0 })
                    {
                        // Build expression tree
                        //--entity
                        var param = Expression.Parameter(typeof(TEntity), "entity");
                        //--entity.{PropertyName}
                        var entityProp = Expression.Property(param, prop.Name);
                        //--searchValue
                        var searchValue = Expression.Constant(value);
                        //--entity.{PropertyName}.Contains(searchValue)
                        var body = Expression.Call(entityProp, "Contains", null, searchValue);
                        //--entity => entity.{PropertyName}.Contains(searchValue)
                        var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                        //entity.{PropertyName}.Contains(searchValue)
                        query = query.Where(exp);
                    }
                }

                if (value != null && value is int)
                {
                    // Build expression tree
                    //--entity
                    var param = Expression.Parameter(typeof(TEntity), "entity");
                    //--entity.{PropertyName}

                    var entityProp = Expression.Property(param, prop.Name);
                    var convert = Expression.Convert(entityProp, typeof(int));
                    //--searchValue
                    var searchValue = Expression.Constant(value);
                    var searchValueNonNull = Expression.Convert(searchValue, typeof(int));

                    //--entity.{PropertyName}.Contains(searchValue)
                    var body = Expression.Equal(convert, searchValueNonNull);
                    //--entity => entity.{PropertyName}.Contains(searchValue)
                    var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                    //entity.{PropertyName}.Contains(searchValue)
                    query = query.Where(exp);
                }

                if (value != null && value is double)
                {
                    // Build expression tree
                    //--entity
                    var param = Expression.Parameter(typeof(TEntity), "entity");
                    //--entity.{PropertyName}

                    var entityProp = Expression.Property(param, prop.Name);
                    var convert = Expression.Convert(entityProp, typeof(double));
                    //--searchValue
                    var searchValue = Expression.Constant(value);
                    var searchValueNonNull = Expression.Convert(searchValue, typeof(double));

                    //--entity.{PropertyName}.Contains(searchValue)
                    var body = Expression.Equal(convert, searchValueNonNull);
                    //--entity => entity.{PropertyName}.Contains(searchValue)
                    var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                    //entity.{PropertyName}.Contains(searchValue)
                    query = query.Where(exp);
                }

                if (value != null && value is bool)
                {
                    // Build expression tree
                    //--entity
                    var param = Expression.Parameter(typeof(TEntity), "entity");
                    //--entity.{PropertyName}

                    var entityProp = Expression.Property(param, prop.Name);
                    var convert = Expression.Convert(entityProp, typeof(bool));
                    //--searchValue
                    var searchValue = Expression.Constant(value);
                    var searchValueNonNull = Expression.Convert(searchValue, typeof(bool));

                    //--entity.{PropertyName}.Contains(searchValue)
                    var body = Expression.Equal(convert, searchValueNonNull);
                    //--entity => entity.{PropertyName}.Contains(searchValue)
                    var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                    //entity.{PropertyName}.Contains(searchValue)
                    query = query.Where(exp);
                }

                if (value != null && value is Guid)
                {
                    // Build expression tree
                    //--entity
                    var param = Expression.Parameter(typeof(TEntity), "entity");
                    //--entity.{PropertyName}

                    var entityProp = Expression.Property(param, prop.Name);
                    var convert = Expression.Convert(entityProp, typeof(Guid));
                    //--searchValue
                    var searchValue = Expression.Constant(value);
                    var searchValueNonNull = Expression.Convert(searchValue, typeof(Guid));

                    //--entity.{PropertyName}.Contains(searchValue)
                    var body = Expression.Equal(convert, searchValueNonNull);
                    //--entity => entity.{PropertyName}.Contains(searchValue)
                    var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                    //entity.{PropertyName}.Contains(searchValue)
                    query = query.Where(exp);
                }

                if (value != null && value is DateTime)
                {
                    // Build expression tree
                    //--entity
                    var param = Expression.Parameter(typeof(TEntity), "entity");
                    //--entity.{PropertyName}

                    var entityProp = Expression.Property(param, prop.Name);
                    var convert = Expression.Convert(entityProp, typeof(DateTime));
                    //--searchValue
                    var searchValue = Expression.Constant(value);
                    var searchValueNonNull = Expression.Convert(searchValue, typeof(DateTime));

                    //--entity.{PropertyName}.Contains(searchValue)
                    var body = Expression.Equal(convert, searchValueNonNull);
                    //--entity => entity.{PropertyName}.Contains(searchValue)
                    var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                    //entity.{PropertyName}.Contains(searchValue)
                    query = query.Where(exp);
                }

                if (value != null && value is DateOnly)
                {
                    // Build expression tree
                    //--entity
                    var param = Expression.Parameter(typeof(TEntity), "entity");
                    //--entity.{PropertyName}

                    var entityProp = Expression.Property(param, prop.Name);
                    var convert = Expression.Convert(entityProp, typeof(DateOnly));
                    //--searchValue
                    var searchValue = Expression.Constant(value);
                    var searchValueNonNull = Expression.Convert(searchValue, typeof(DateOnly));

                    //--entity.{PropertyName}.Contains(searchValue)
                    var body = Expression.Equal(convert, searchValueNonNull);
                    //--entity => entity.{PropertyName}.Contains(searchValue)
                    var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                    //entity.{PropertyName}.Contains(searchValue)
                    query = query.Where(exp);
                }

                if (value != null && value is TimeOnly)
                {
                    // Build expression tree
                    //--entity
                    var param = Expression.Parameter(typeof(TEntity), "entity");
                    //--entity.{PropertyName}

                    var entityProp = Expression.Property(param, prop.Name);
                    var convert = Expression.Convert(entityProp, typeof(TimeOnly));
                    //--searchValue
                    var searchValue = Expression.Constant(value);
                    var searchValueNonNull = Expression.Convert(searchValue, typeof(TimeOnly));

                    //--entity.{PropertyName}.Contains(searchValue)
                    var body = Expression.Equal(convert, searchValueNonNull);
                    //--entity => entity.{PropertyName}.Contains(searchValue)
                    var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                    //entity.{PropertyName}.Contains(searchValue)
                    query = query.Where(exp);
                }

                if (value != null && value is byte)
                {
                    // Build expression tree
                    //--entity
                    var param = Expression.Parameter(typeof(TEntity), "entity");
                    //--entity.{PropertyName}
                    var entityProp = Expression.Property(param, prop.Name);
                    //--searchValue
                    var searchValue = Expression.Constant((byte?)value);

                    var searchValueE = Expression.Convert(searchValue, typeof(byte?));

                    //--entity.{PropertyName}.Contains(searchValue)
                    var body = Expression.Equal(entityProp, value.GetType().IsNullableType() ? searchValueE : searchValue);
                    //--entity => entity.{PropertyName}.Contains(searchValue)
                    var exp = Expression.Lambda<Func<TEntity, bool>>(body, param);
                    //entity.{PropertyName}.Contains(searchValue)
                    query = query.Where(exp);
                }
            }

            return query;
        }
    }
}