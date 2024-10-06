using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace hair_hamony.Data.Repositories;

/// <summary>
/// Generic repository.
/// </summary>
/// <typeparam name="TEntity">entity class.</typeparam>
public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
{
    private readonly DbSet<TEntity> _dbset;

    /// <summary>
    /// Initializes a new instance of the <see cref="BaseRepository{T}"/> class.
    /// </summary>
    /// <param name="context">Object context.</param>
    public BaseRepository(DbContext context)
    {
        CurrentContext = context;
        _dbset = CurrentContext.Set<TEntity>();
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="BaseRepository{T}"/> class.
    /// </summary>
    /// <param name="context">Object context.</param>
    /// <param name="dbsetExist">dbSet.</param>
    public BaseRepository(DbContext context, DbSet<TEntity> dbsetExist)
    {
        CurrentContext = context;
        _dbset = dbsetExist;
    }

    /// <summary>
    /// Gets or sets current context.
    /// </summary>
    public DbContext CurrentContext { get; set; }

    /// <inheritdoc/>
    public IQueryable<TEntity> Table => _dbset;

    /// <inheritdoc/>
    public EntityEntry<TEntity> EntityE(TEntity entity) => CurrentContext.Entry<TEntity>(entity);

    /// <inheritdoc/>
    public virtual IQueryable<TEntity> GetAll()
    {
        return _dbset.AsQueryable();
    }

    /// <inheritdoc/>
    public virtual TEntity GetById(object id, Expression<Func<TEntity, object>>[] includeProperties = null)
    {
        DbSet<TEntity> query = _dbset;

        if (includeProperties != null)
        {
            query = includeProperties.Aggregate(query, (current, include) => (DbSet<TEntity>)current.Include(include));
        }

        return query.Find(id);
    }

    /// <inheritdoc/>
    public virtual async Task<TEntity> GetByIdAsync(object id,
        Expression<Func<TEntity, object>>[] includeProperties = null)
    {
        DbSet<TEntity> query = _dbset;

        if (includeProperties != null)
        {
            query = includeProperties.Aggregate(query, (current, include) => (DbSet<TEntity>)current.Include(include));
        }

        return await query.FindAsync(id);
    }

    /// <inheritdoc/>
    public virtual IQueryable<TEntity> Get(
        Expression<Func<TEntity, bool>> filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
        Expression<Func<TEntity, object>>[] includeProperties = null)
    {
        IQueryable<TEntity> query = _dbset;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (includeProperties != null)
        {
            query = includeProperties.Aggregate(query, (current, include) => current.Include(include));
        }

        if (orderBy != null)
        {
            return orderBy(query).AsQueryable();
        }
        else
        {
            return query;
        }
    }

    /// <inheritdoc/>
    public virtual TEntity GetFirstOrDefault(
        Expression<Func<TEntity, bool>> filter = null,
        Expression<Func<TEntity, object>>[] includeProperties = null)
    {
        IQueryable<TEntity> query = _dbset;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (includeProperties != null)
        {
            query = includeProperties.Aggregate(query, (current, include) => current.Include(include));
        }

        return query.FirstOrDefault();
    }

    /// <inheritdoc/>
    public virtual async Task<TEntity> GetFirstOrDefaultAsync(
        Expression<Func<TEntity, bool>> filter = null,
        Expression<Func<TEntity, object>>[] includeProperties = null)
    {
        IQueryable<TEntity> query = _dbset;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (includeProperties != null)
        {
            query = includeProperties.Aggregate(query, (current, include) => current.Include(include));
        }

        var a = await query.FirstOrDefaultAsync();
        return await query.FirstOrDefaultAsync();
    }

    /// <inheritdoc/>
    public virtual void Insert(TEntity entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        _dbset.Add(entity);
    }

    /// <inheritdoc/>
    public virtual async Task InsertAsync(TEntity entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        await _dbset.AddAsync(entity);
    }

    /// <inheritdoc/>
    public virtual void Insert(IEnumerable<TEntity> entities)
    {
        if (entities == null)
        {
            throw new ArgumentNullException(nameof(entities));
        }

        _dbset.AddRange(entities);
    }

    /// <inheritdoc/>
    public virtual async Task InsertAsync(IEnumerable<TEntity> entities)
    {
        if (entities == null)
        {
            throw new ArgumentNullException(nameof(entities));
        }

        await _dbset.AddRangeAsync(entities);
    }

    /// <inheritdoc/>
    public virtual void Update(TEntity entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        _dbset.Attach(entity);
        CurrentContext.Update<TEntity>(entity);
    }

    /// <inheritdoc/>
    public virtual void Update(IEnumerable<TEntity> entities)
    {
        if (entities == null)
        {
            throw new ArgumentNullException(nameof(entities));
        }

        var enumerable = entities as TEntity[] ?? entities.ToArray();
        _dbset.AttachRange(enumerable);
        CurrentContext.UpdateRange(enumerable);
    }

    /// <inheritdoc/>
    public virtual void Delete(TEntity entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        if (CurrentContext.Entry(entity).State == EntityState.Detached)
        {
            _dbset.Attach(entity);
        }

        _dbset.Remove(entity);
    }

    /// <inheritdoc/>
    public virtual void Delete(IEnumerable<TEntity> entities)
    {
        if (entities == null)
        {
            throw new ArgumentNullException(nameof(entities));
        }

        foreach (var entity in entities)
        {
            if (CurrentContext.Entry(entity).State == EntityState.Detached)
            {
                _dbset.Attach(entity);
            }
        }

        _dbset.RemoveRange(entities);
    }

    public virtual async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
    {
        return await CurrentContext.SaveChangesAsync(cancellationToken);
    }
}