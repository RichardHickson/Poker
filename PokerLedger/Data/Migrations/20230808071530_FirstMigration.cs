using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PokerLedger.Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    GameID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GameTitle = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    GameInfo = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.GameID);
                });

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "GameID", "GameInfo", "GameTitle" },
                values: new object[,]
                {
                    { 1, "Person 0 played in this one", "Poker Game 0" },
                    { 2, "Person 1 played in this one", "Poker Game 1" },
                    { 3, "Person 2 played in this one", "Poker Game 2" },
                    { 4, "Person 3 played in this one", "Poker Game 3" },
                    { 5, "Person 4 played in this one", "Poker Game 4" },
                    { 6, "Person 5 played in this one", "Poker Game 5" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
