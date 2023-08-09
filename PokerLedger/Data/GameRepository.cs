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

        internal async static Task<Game> GetGameById(int gameId)
        {
            using (var db = new GameDBContext())
            {
                return await db.Games
                    .FirstOrDefaultAsync(game => game.GameID == gameId);
            }
        }

        internal async static Task<bool> DeleteGame(int gameId)
        {
            using (var db = new GameDBContext())
            {
                try
                {
                    Game gameToDelete = await GetGameById(gameId);

                    db.Remove(gameToDelete);

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

