using System;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

namespace PokerLedger.Data
{
    internal static class GamesRepository
    {
        internal async static Task<List<Game>> GetGames()
        {
            using (var db = new GameDBContext())
            {
                return await db.Games.ToListAsync();
            }
        }

        internal async static Task<bool> CreateGame(Game gameToCreate)
        {
            using (var db = new GameDBContext())
            {
                try
                {
                    await db.Games.AddAsync(gameToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}

