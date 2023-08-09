using System;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

namespace PokerLedger.Data
{
    internal static class UserRepository
    {
        internal async static Task<List<User>> GetUsers()
        {
            using (var db = new UserDBContext())
            {
                return await db.Users.ToListAsync();
            }
        }

        internal async static Task<bool> CreateUser(User userToCreate)
        {
            using (var db = new UserDBContext())
            {
                try
                {
                    if (await db.Users
                    .FirstOrDefaultAsync(user => user.Username == userToCreate.Username) != null)
                    {
                        throw new Exception();
                    }

                    await db.Users.AddAsync(userToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<User> GetUserByUsername(string username)
        {
            using (var db = new UserDBContext())
            {
                return await db.Users
                    .FirstOrDefaultAsync(user => user.Username == username);
            }
        }
    }
}

