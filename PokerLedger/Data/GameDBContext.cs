using System;
using Microsoft.EntityFrameworkCore;
namespace PokerLedger.Data
{
	internal sealed class GameDBContext : DbContext
	{

		public DbSet<Game> Games { get; set; }
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite("Data Source=./Data/GameDB.db");

        
    }
}

