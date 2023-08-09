using System;
using System.ComponentModel.DataAnnotations;

namespace PokerLedger.Data
{
    internal sealed class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        [MaxLength(20)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Password { get; set; } = string.Empty;
    }
}

