using Avaliacao.Models;
using Microsoft.EntityFrameworkCore;

namespace Avaliacao.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<Produto> Produtos { get; set; }
    }
}
