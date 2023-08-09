using System;
using Microsoft.EntityFrameworkCore;
namespace PokerLedger.Data
{
    internal sealed class UserDBContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite("Data Source=./Data/UserDB.db");


    }
}

