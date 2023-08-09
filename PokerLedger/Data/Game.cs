using System;
using System.ComponentModel.DataAnnotations;

namespace PokerLedger.Data
{
	internal sealed class Game
	{
		[Key]
		public int GameID { get; set; }

		[Required]
		[MaxLength(100)]
		public string GameTitle { get; set; } = string.Empty;

		[Required]
		[MaxLength(100)]
		public string GameInfo { get; set; } = string.Empty;
    }
}

